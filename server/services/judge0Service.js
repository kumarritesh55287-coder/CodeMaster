import dotenv from 'dotenv';
dotenv.config();

/**
 * Real Judge0 Code Execution Engine Service
 * Executes code in isolated sandbox via Judge0 API
 */

const JUDGE0_API_URL = process.env.JUDGE0_API_URL || 'https://ce.judge0.com';
const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY || '';

/**
 * Safe Base64 helper for UTF-8 strings
 */
function toBase64(str) {
  return Buffer.from(str || '', 'utf-8').toString('base64');
}

function fromBase64(b64Str) {
  if (!b64Str) return '';
  try {
    return Buffer.from(b64Str, 'base64').toString('utf-8');
  } catch (e) {
    return b64Str;
  }
}

/**
 * Execute code via Judge0 API with actual execution engine
 * @param {number} languageId Judge0 Language ID
 * @param {string} sourceCode Source code string
 * @param {string} stdin Input string
 * @returns {Promise<{stdout: string, stderr: string, compile_output: string, status: {id: number, description: string}, time: string, memory: string}>}
 */
export async function executeWithJudge0(languageId, sourceCode, stdin = '') {
  if (!sourceCode || typeof sourceCode !== 'string') {
    throw new Error('Source code is required');
  }

  const isRapidAPI = JUDGE0_API_URL.includes('rapidapi.com');
  const headers = {
    'Content-Type': 'application/json'
  };

  if (isRapidAPI) {
    headers['X-RapidAPI-Key'] = JUDGE0_API_KEY;
    headers['X-RapidAPI-Host'] = new URL(JUDGE0_API_URL).hostname;
  } else if (JUDGE0_API_KEY) {
    headers['X-Auth-Token'] = JUDGE0_API_KEY;
  }

  try {
    // Attempt 1: Raw submission with wait=true & base64_encoded=false
    const rawUrl = `${JUDGE0_API_URL}/submissions?base64_encoded=false&wait=true`;
    const rawRes = await fetch(rawUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        language_id: languageId,
        source_code: sourceCode,
        stdin: stdin
      })
    });

    if (rawRes.ok) {
      const result = await rawRes.json();
      if (result.status && result.status.id !== 1 && result.status.id !== 2) {
        return parseJudge0Response(result, false);
      }
      if (result.token) {
        return await pollSubmission(result.token, headers, false);
      }
    }

    // Attempt 2: Base64 submission with wait=true & base64_encoded=true
    const b64Url = `${JUDGE0_API_URL}/submissions?base64_encoded=true&wait=true`;
    const b64Res = await fetch(b64Url, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        language_id: languageId,
        source_code: toBase64(sourceCode),
        stdin: toBase64(stdin)
      })
    });

    if (b64Res.ok) {
      const result = await b64Res.json();
      if (result.status && result.status.id !== 1 && result.status.id !== 2) {
        return parseJudge0Response(result, true);
      }
      if (result.token) {
        return await pollSubmission(result.token, headers, true);
      }
    }

    throw new Error('No valid response received from Judge0 code execution service.');
  } catch (error) {
    console.error('Judge0 Service Error:', error.message);
    throw new Error(`Code execution failed: ${error.message}`);
  }
}

/**
 * Poll Judge0 submission by token until completion
 */
async function pollSubmission(token, headers, isBase64 = true) {
  let attempts = 0;
  const maxAttempts = 15;
  const pollInterval = 600;

  while (attempts < maxAttempts) {
    await new Promise((res) => setTimeout(res, pollInterval));
    attempts++;

    const pollRes = await fetch(`${JUDGE0_API_URL}/submissions/${token}?base64_encoded=${isBase64}`, {
      method: 'GET',
      headers
    });

    if (!pollRes.ok) continue;

    const result = await pollRes.json();
    const statusId = result.status?.id;

    if (statusId === 1 || statusId === 2) {
      continue;
    }

    return parseJudge0Response(result, isBase64);
  }

  return {
    stdout: '',
    stderr: 'Execution timed out waiting for code execution service.',
    compile_output: '',
    status: { id: 5, description: 'Time Limit Exceeded' },
    time: '> 5.0 s',
    memory: 'N/A'
  };
}

/**
 * Parse & decode Judge0 response object
 */
function parseJudge0Response(result, isBase64 = true) {
  const stdout = isBase64 ? fromBase64(result.stdout) : (result.stdout || '');
  const stderr = isBase64 ? fromBase64(result.stderr) : (result.stderr || '');
  const compile_output = isBase64 ? fromBase64(result.compile_output) : (result.compile_output || '');

  let formattedTime = '0.01 s';
  if (result.time) {
    formattedTime = `${parseFloat(result.time).toFixed(3)} s`;
  }

  let formattedMemory = '4.0 MB';
  if (result.memory) {
    formattedMemory = `${(result.memory / 1024).toFixed(1)} MB`;
  }

  return {
    stdout: stdout || '',
    stderr: stderr || '',
    compile_output: compile_output || '',
    status: result.status || { id: 3, description: 'Accepted' },
    time: formattedTime,
    memory: formattedMemory
  };
}
