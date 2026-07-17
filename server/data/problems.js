const problems = [
  {
    id: '1',
    title: 'Two Sum',
    difficulty: 'Easy',
    short: 'Find indices of the two numbers that add up to the target.',
    summary: 'Return the indices of the two numbers whose sum matches target.',
    description:
      'Given an array of integers and a target value, return the indices of the two numbers that add up to the target. The problem is ideal for practicing hash-maps and two-pointer strategies.',
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'nums[0] + nums[1] = 2 + 7 = 9'
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]',
        explanation: 'nums[1] + nums[2] = 2 + 4 = 6'
      }
    ],
    constraints: [
      '2 ≤ nums.length ≤ 10^4',
      '-10^9 ≤ nums[i] ≤ 10^9',
      '-10^9 ≤ target ≤ 10^9'
    ],
    topic: 'Array / Hashing'
  },
  {
    id: '2',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    short: 'Compute the maximum substring length without duplicate characters.',
    summary: 'Use sliding window or hashing techniques to track unique substrings.',
    description:
      'Given a string, find the length of the longest substring without repeating characters. The best solutions use a sliding window and direct lookup for each character.',
    examples: [
      {
        input: 's = "abcabcbb"',
        output: '3',
        explanation: 'The answer is "abc", with the length of 3.'
      },
      {
        input: 's = "bbbbb"',
        output: '1',
        explanation: 'The answer is "b", with the length of 1.'
      }
    ],
    constraints: [
      '0 ≤ s.length ≤ 5 * 10^4',
      's consists of English letters, digits, symbols and spaces.'
    ],
    topic: 'String / Sliding Window'
  },
  {
    id: '3',
    title: 'Merge Intervals',
    difficulty: 'Medium',
    short: 'Merge overlapping intervals into a minimal set.',
    summary: 'Sort intervals and merge neighbors when they overlap.',
    description:
      'Given a collection of intervals, merge all overlapping intervals and return an array of the non-overlapping intervals that cover all the intervals in the input.',
    examples: [
      {
        input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]',
        output: '[[1,6],[8,10],[15,18]]',
        explanation: 'Since intervals [1,3] and [2,6] overlap, merge them into [1,6].'
      }
    ],
    constraints: [
      '1 ≤ intervals.length ≤ 10^4',
      'intervals[i].length == 2',
      '0 ≤ start_i ≤ end_i ≤ 10^4'
    ],
    topic: 'Array / Sorting'
  }
];

export default problems;
