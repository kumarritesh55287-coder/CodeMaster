const problems = [
  {
    id: '1',
    title: 'Two Sum',
    difficulty: 'Easy',
    short: 'Find indices of the two numbers that add up to the target.',
    summary: 'Return the indices of the two numbers whose sum matches target.',
    description:
      'Given an array of integers and a target value, return the indices of the two numbers that add up to the target. The problem is ideal for practicing hash-maps and two-pointer strategies.'
  },
  {
    id: '2',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    short: 'Compute the maximum substring length without duplicate characters.',
    summary: 'Use sliding window or hashing techniques to track unique substrings.',
    description:
      'Given a string, find the length of the longest substring without repeating characters. The best solutions use a sliding window and direct lookup for each character.'
  },
  {
    id: '3',
    title: 'Merge Intervals',
    difficulty: 'Medium',
    short: 'Merge overlapping intervals into a minimal set.',
    summary: 'Sort intervals and merge neighbors when they overlap.',
    description:
      'Given a collection of intervals, merge all overlapping intervals and return an array of the non-overlapping intervals that cover all the intervals in the input.'
  }
];

export function getMockProblems() {
  return problems;
}

export function getProblemById(id) {
  return problems.find((item) => item.id === id);
}
