const API_URL = 'http://localhost:5000/api';

export async function submitCode(code, language, problemId) {
  try {
    const res = await fetch(`${API_URL}/submissions/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        code,
        language,
        problemId
      })
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error submitting code:', error);
    return { success: false, error: error.message };
  }
}

export async function getSubmissionHistory() {
  try {
    const res = await fetch(`${API_URL}/submissions/history`);
    const data = await res.json();
    return data.submissions || [];
  } catch (error) {
    console.error('Error fetching submission history:', error);
    return [];
  }
}
