export function formatDifficulty(level) {
  const map = {
    Easy: 'success',
    Medium: 'accent',
    Hard: 'danger'
  };
  return map[level] || 'muted';
}

export function getLanguageOptions() {
  return [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'cpp', label: 'C++' }
  ];
}
