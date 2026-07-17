export function analyzeCode(code, language) {
  const suggestions = [];
  const normalized = code.toLowerCase();

  if (normalized.includes('==') && !normalized.includes('===')) {
    suggestions.push({
      type: 'Style',
      message: 'Use strict equality checks in JavaScript to avoid type coercion.',
      detail: 'Prefer === over == for safer comparisons.',
      severity: 'medium'
    });
  }

  if (normalized.includes('console.log')) {
    suggestions.push({
      type: 'Debug',
      message: 'Remove debug printing before final submission.',
      detail: 'Console logs can slow execution and leak internal state.',
      severity: 'low'
    });
  }

  if (normalized.includes('.length') && normalized.includes('for (let i = 0; i <')) {
    suggestions.push({
      type: 'Optimization',
      message: 'Cache array length outside the loop to reduce repeated property access.',
      detail: 'This can improve performance in large loops.',
      severity: 'high'
    });
  }

  if (language === 'python' && normalized.includes('range(len(')) {
    suggestions.push({
      type: 'Pythonic',
      message: 'Use enumerate() for simpler loops when you need both index and value.',
      detail: 'Example: for i, value in enumerate(nums):',
      severity: 'medium'
    });
  }

  if (normalized.includes('for (let i = 0; i < nums.length; i++)') && normalized.includes('for (let j = i + 1; j < nums.length; j++)')) {
    suggestions.push({
      type: 'Scaling',
      message: 'This solution uses nested loops, which can be slow for large arrays.',
      detail: 'Try a hash-based solution if you want faster performance.',
      severity: 'high'
    });
  }

  const summary = suggestions.length
    ? 'The AI assistant found areas where your code can be improved.'
    : 'No obvious issues detected. Try adding a more complete solution.';

  return { suggestions, summary };
}
