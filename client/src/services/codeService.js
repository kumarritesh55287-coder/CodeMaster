/**
 * Client Service for Code Execution (Judge0 API via Backend)
 */

const API_BASE = 'http://localhost:5000/api/code';

/**
 * Execute custom code with optional stdin via POST /api/code/run
 */
export async function runCodeApi(language, sourceCode, stdin = '') {
  try {
    const res = await fetch(`${API_BASE}/run`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ language, sourceCode, stdin })
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Failed to execute code.');
    }

    return data;
  } catch (err) {
    console.error('runCodeApi Error:', err);
    throw err;
  }
}

/**
 * Submit code for test case evaluation via POST /api/code/submit
 */
export async function submitCodeApi(problemSlug, language, sourceCode) {
  try {
    const res = await fetch(`${API_BASE}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ problemSlug, language, sourceCode })
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Failed to submit code solution.');
    }

    return data;
  } catch (err) {
    console.error('submitCodeApi Error:', err);
    throw err;
  }
}
