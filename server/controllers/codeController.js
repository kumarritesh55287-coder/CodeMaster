import { getJudge0LanguageId } from '../config/languages.js';
import { executeWithJudge0 } from '../services/judge0Service.js';
import ProblemModel from '../models/Problem.js';
import SubmissionModel from '../models/Submission.js';
import { sqlDb } from '../config/db.js';
import { v4 as uuidv4 } from 'uuid';

/**
 * Handle POST /api/code/run — Custom Input Code Execution
 */
export async function runCode(req, res) {
  try {
    const { language, sourceCode, stdin } = req.body;

    if (!language || !sourceCode) {
      return res.status(400).json({
        success: false,
        error: 'Both language and sourceCode are required.'
      });
    }

    if (sourceCode.length > 65536) {
      return res.status(400).json({
        success: false,
        error: 'Source code size exceeds maximum limit of 64KB.'
      });
    }

    const judge0Id = getJudge0LanguageId(language);
    const result = await executeWithJudge0(judge0Id, sourceCode, stdin || '');

    return res.json({
      success: true,
      stdout: result.stdout || '',
      stderr: result.stderr || '',
      compile_output: result.compile_output || '',
      status: result.status?.description || 'Accepted',
      statusId: result.status?.id || 3,
      time: result.time || '0.05 s',
      memory: result.memory || '4.0 MB'
    });
  } catch (error) {
    console.error('Run Code Controller Error:', error);
    return res.status(400).json({
      success: false,
      error: error.message || 'Execution failed.'
    });
  }
}

/**
 * Handle POST /api/code/submit — Test Case Execution & Verdict Evaluation
 */
export async function submitCode(req, res) {
  try {
    const { problemSlug, language, sourceCode } = req.body;

    if (!problemSlug || !language || !sourceCode) {
      return res.status(400).json({
        success: false,
        error: 'problemSlug, language, and sourceCode are required.'
      });
    }

    const judge0Id = getJudge0LanguageId(language);

    // Fetch problem test cases from MongoDB or SQLite
    let testCases = [];
    try {
      const mongoProb = await ProblemModel.findOne({ slug: problemSlug }).lean();
      if (mongoProb && mongoProb.testCases && mongoProb.testCases.length > 0) {
        testCases = mongoProb.testCases;
      }
    } catch (e) {
      // Fallback
    }

    if (!testCases || testCases.length === 0) {
      // Default fallback test cases if problem has no DB record
      testCases = [
        { input: { arg: 'test1' }, expected: 'test1' },
        { input: { arg: 'test2' }, expected: 'test2' }
      ];
    }

    const testResults = [];
    let overallStatus = 'Accepted';
    let maxTime = '0.01 s';
    let maxMemory = '4.0 MB';

    for (let idx = 0; idx < testCases.length; idx++) {
      const tc = testCases[idx];
      const stdinString = typeof tc.input === 'object' ? JSON.stringify(tc.input) : String(tc.input);
      const expectedString = typeof tc.expected === 'object' ? JSON.stringify(tc.expected) : String(tc.expected);

      const execResult = await executeWithJudge0(judge0Id, sourceCode, stdinString);

      if (execResult.status && execResult.status.id !== 3) {
        overallStatus = execResult.status.description || 'Wrong Answer';
      }

      const actualTrimmed = (execResult.stdout || '').trim();
      const expectedTrimmed = expectedString.trim();
      const isPassed = execResult.status?.id === 3 && (actualTrimmed === expectedTrimmed || actualTrimmed.includes(expectedTrimmed));

      if (!isPassed && overallStatus === 'Accepted') {
        overallStatus = 'Wrong Answer';
      }

      testResults.push({
        caseNum: idx + 1,
        input: stdinString,
        expected: expectedString,
        actual: actualTrimmed || execResult.stderr || 'No output',
        passed: isPassed
      });

      if (execResult.time) maxTime = execResult.time;
      if (execResult.memory) maxMemory = execResult.memory;
    }

    const passedCount = testResults.filter((r) => r.passed).length;
    const totalCount = testResults.length;

    if (overallStatus === 'Accepted' && passedCount !== totalCount) {
      overallStatus = 'Wrong Answer';
    }

    // Save submission to database
    const subId = uuidv4();
    try {
      await SubmissionModel.create({
        problemSlug,
        language,
        code: sourceCode,
        status: overallStatus,
        runtime: maxTime,
        memory: maxMemory
      });

      sqlDb.run(
        `INSERT INTO submissions (id, problemSlug, language, code, status, runtime, memory)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [subId, problemSlug, language, sourceCode, overallStatus, maxTime, maxMemory]
      );
    } catch (e) {
      sqlDb.run(
        `INSERT INTO submissions (id, problemSlug, language, code, status, runtime, memory)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [subId, problemSlug, language, sourceCode, overallStatus, maxTime, maxMemory]
      );
    }

    return res.json({
      success: true,
      verdict: overallStatus,
      status: overallStatus,
      runtime: maxTime,
      memory: maxMemory,
      passedCount,
      totalCount,
      testResults
    });
  } catch (error) {
    console.error('Submit Code Controller Error:', error);
    return res.status(400).json({
      success: false,
      error: error.message || 'Submission evaluation failed.'
    });
  }
}
