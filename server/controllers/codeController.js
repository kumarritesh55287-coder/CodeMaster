import { getJudge0LanguageId } from '../config/languages.js';
import { executeWithJudge0 } from '../services/judge0Service.js';
import { preprocessCode } from '../execution/codePreprocessor.js';
import ProblemModel from '../models/Problem.js';
import SubmissionModel from '../models/Submission.js';
import { sqlDb } from '../config/db.js';
import { v4 as uuidv4 } from 'uuid';

/**
 * Handle POST /api/code/run — Custom Input Code Execution via Judge0 & Language Harnesses
 */
export async function runCode(req, res) {
  try {
    const { language, languageId, sourceCode, stdin } = req.body;

    if (!sourceCode || typeof sourceCode !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'sourceCode parameter is required.'
      });
    }

    if (sourceCode.length > 65536) {
      return res.status(400).json({
        success: false,
        error: 'Source code size exceeds maximum limit of 64KB.'
      });
    }

    if (stdin && stdin.length > 65536) {
      return res.status(400).json({
        success: false,
        error: 'Custom input size exceeds maximum limit of 64KB.'
      });
    }

    const langKey = language || languageId || 'cpp';
    const jId = getJudge0LanguageId(langKey);

    // Preprocess source code to inject missing standard headers, namespaces & driver harnesses
    const processedCode = preprocessCode(langKey, sourceCode, stdin || '');

    console.log(`[CODE RUN] Language: ${langKey} (Judge0 ID: ${jId})`);
    const result = await executeWithJudge0(jId, processedCode, stdin || '');

    console.log(`[EXECUTION RESULT] Status: ${result.status?.description || 'Accepted'} | Time: ${result.time} | Memory: ${result.memory}`);

    return res.json({
      success: true,
      stdout: result.stdout || '',
      stderr: result.stderr || '',
      compile_output: result.compile_output || '',
      status: result.status?.description || 'Accepted',
      statusId: result.status?.id || 3,
      time: result.time || '0.01 s',
      memory: result.memory || '4.0 MB'
    });
  } catch (error) {
    console.error('Run Code Controller Error:', error);
    return res.status(400).json({
      success: false,
      error: error.message || 'Code execution service unavailable.'
    });
  }
}

/**
 * Handle POST /api/code/submit — Test Case Evaluation via Judge0
 */
export async function submitCode(req, res) {
  try {
    const { problemId, problemSlug, language, languageId, sourceCode } = req.body;
    const targetSlug = problemSlug || problemId;

    if (!targetSlug || (!language && !languageId) || !sourceCode) {
      return res.status(400).json({
        success: false,
        error: 'problemSlug, language/languageId, and sourceCode are required.'
      });
    }

    const langKey = language || languageId || 'cpp';
    const jId = getJudge0LanguageId(langKey);

    // Fetch problem test cases from MongoDB or SQLite
    let testCases = [];
    try {
      const mongoProb = await ProblemModel.findOne({ slug: targetSlug }).lean();
      if (mongoProb && mongoProb.testCases && mongoProb.testCases.length > 0) {
        testCases = mongoProb.testCases;
      }
    } catch (e) {
      // Fallback
    }

    if (!testCases || testCases.length === 0) {
      testCases = [
        { input: '2 7 11 15\n9', expected: '[0, 1]' },
        { input: '3 2 4\n6', expected: '[1, 2]' },
        { input: '3 3\n6', expected: '[0, 1]' }
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

      const processedCode = preprocessCode(langKey, sourceCode, stdinString);
      const execResult = await executeWithJudge0(jId, processedCode, stdinString);

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
        actual: actualTrimmed || execResult.stderr || execResult.compile_output || 'No output',
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
    const langString = String(language || 'cpp');

    try {
      await SubmissionModel.create({
        problemSlug: targetSlug,
        language: langString,
        code: sourceCode,
        status: overallStatus,
        runtime: maxTime,
        memory: maxMemory
      });
    } catch (e) {
      // SQLite fallback
    }

    try {
      sqlDb.run(
        `INSERT INTO submissions (id, problemSlug, language, code, status, runtime, memory)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [subId, targetSlug, langString, sourceCode, overallStatus, maxTime, maxMemory]
      );
    } catch (e) {
      // Ignore if table missing
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
