const API_URL = 'http://localhost:5000/api';

export async function fetchProblems() {
  try {
    const res = await fetch(`${API_URL}/problems`);
    const data = await res.json();
    return data.problems || [];
  } catch (error) {
    console.error('Error fetching problems:', error);
    return [];
  }
}

export async function fetchProblemById(id) {
  try {
    const res = await fetch(`${API_URL}/problems/${id}`);
    const data = await res.json();
    return data.problem || null;
  } catch (error) {
    console.error('Error fetching problem:', error);
    return null;
  }
}

export async function searchProblems(query) {
  try {
    const res = await fetch(`${API_URL}/problems/search/query?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    return data.problems || [];
  } catch (error) {
    console.error('Error searching problems:', error);
    return [];
  }
}
