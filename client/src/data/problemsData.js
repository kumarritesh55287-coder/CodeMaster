export const MOCK_PROBLEMS = [
  {
    id: 1,
    slug: 'two-sum',
    title: '1. Two Sum',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    acceptance: '51.8%',
    frequency: '98%',
    status: 'Solved',
    tags: ['Array', 'Hash Table'],
    companies: ['Google', 'Amazon', 'Meta', 'Apple', 'Microsoft'],
    description: `Given an array of integers \`nums\` and an integer \`target\`, return *indices of the two numbers such that they add up to \`target\`*.

You may assume that each input would have ***exactly one solution***, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]',
        explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].'
      },
      {
        input: 'nums = [3,3], target = 6',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 6, we return [0, 1].'
      }
    ],
    constraints: [
      '2 <= nums.length <= 10⁴',
      '-10⁹ <= nums[i] <= 10⁹',
      '-10⁹ <= target <= 10⁹',
      'Only one valid answer exists.'
    ],
    starterCode: {
      c: `#include <stdio.h>

int main() {
    printf("[0, 1]\\n");
    return 0;
}`,
      cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> mp;
        for (int i = 0; i < nums.size(); i++) {
            int comp = target - nums[i];
            if (mp.count(comp)) return {mp[comp], i};
            mp[nums[i]] = i;
        }
        return {};
    }
};

int main() {
    cout << "[0, 1]" << endl;
    return 0;
}`,
      java: `public class Main {
    public static void main(String[] args) {
        System.out.println("[0, 1]");
    }
}`,
      javascript: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}
console.log(JSON.stringify(twoSum([2, 7, 11, 15], 9)));`,
      python: `def twoSum(nums: list[int], target: int) -> list[int]:
    seen = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in seen:
            return [seen[diff], i]
        seen[num] = i
    return []

print(twoSum([2, 7, 11, 15], 9))`
    },
    testCases: [
      { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1] },
      { input: { nums: [3, 2, 4], target: 6 }, expected: [1, 2] },
      { input: { nums: [3, 3], target: 6 }, expected: [0, 1] }
    ],
    hints: [
      'A brute force approach would inspect all pairs of elements O(n²).',
      'Try using a Hash Map to look up complement values in O(1) time.'
    ],
    solutionExplanation: `### Optimal Solution: Hash Table

We can reduce the time complexity from **O(N²)** to **O(N)** by using a hash table to keep track of the numbers seen so far and their indices.

#### Algorithm:
1. Initialize an empty hash map \`seen\`.
2. Iterate through \`nums\` with index \`i\` and value \`num\`.
3. Compute the complement \`target - num\`.
4. If the complement exists in \`seen\`, return \`[seen[complement], i]\`.
5. Otherwise, store \`seen[num] = i\`.

#### Complexity:
- **Time Complexity:** O(N) — Single pass through the array.
- **Space Complexity:** O(N) — Storing up to N elements in the Hash Map.`
  },
  {
    id: 2,
    slug: 'add-two-numbers',
    title: '2. Add Two Numbers',
    difficulty: 'Medium',
    category: 'Linked List',
    acceptance: '42.5%',
    frequency: '92%',
    status: 'Attempted',
    tags: ['Linked List', 'Math', 'Recursion'],
    companies: ['Amazon', 'Microsoft', 'Google'],
    description: `You are given two **non-empty** linked lists representing two non-negative integers. The digits are stored in **reverse order**, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.`,
    examples: [
      {
        input: 'l1 = [2,4,3], l2 = [5,6,4]',
        output: '[7,0,8]',
        explanation: '342 + 465 = 807.'
      },
      {
        input: 'l1 = [0], l2 = [0]',
        output: '[0]'
      }
    ],
    constraints: [
      'The number of nodes in each linked list is in the range [1, 100].',
      '0 <= Node.val <= 9',
      'It is guaranteed that the list represents a number that does not have leading zeros.'
    ],
    starterCode: {
      javascript: `function addTwoNumbers(l1, l2) {
  let dummy = new ListNode(0);
  let curr = dummy;
  let carry = 0;
  
  while (l1 !== null || l2 !== null || carry !== 0) {
    let sum = carry;
    if (l1) { sum += l1.val; l1 = l1.next; }
    if (l2) { sum += l2.val; l2 = l2.next; }
    carry = Math.floor(sum / 10);
    curr.next = new ListNode(sum % 10);
    curr = curr.next;
  }
  return dummy.next;
}`,
      python: `def addTwoNumbers(l1, l2):
    dummy = ListNode(0)
    curr = dummy
    carry = 0
    while l1 or l2 or carry:
        v1 = l1.val if l1 else 0
        v2 = l2.val if l2 else 0
        val = v1 + v2 + carry
        carry = val // 10
        val = val % 10
        curr.next = ListNode(val)
        curr = curr.next
        l1 = l1.next if l1 else None
        l2 = l2.next if l2 else None
    return dummy.next`
    },
    testCases: [
      { input: { l1: [2, 4, 3], l2: [5, 6, 4] }, expected: [7, 0, 8] },
      { input: { l1: [0], l2: [0] }, expected: [0] }
    ],
    hints: [
      'Simulate the addition digit by digit, keeping track of the carry values.',
      'Remember to check if carry > 0 after processing both lists.'
    ],
    solutionExplanation: `### Standard Addition Simulation

We iterate through both linked lists simultaneously, calculating sum = node1.val + node2.val + carry.`
  },
  {
    id: 3,
    slug: 'longest-substring-without-repeating-characters',
    title: '3. Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    category: 'Sliding Window',
    acceptance: '35.1%',
    frequency: '96%',
    status: 'Todo',
    tags: ['Hash Table', 'String', 'Sliding Window'],
    companies: ['Meta', 'Amazon', 'Google', 'Apple'],
    description: `Given a string \`s\`, find the length of the **longest substring** without repeating characters.`,
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
      },
      {
        input: 's = "pwwkew"',
        output: '3',
        explanation: 'The answer is "wke", with the length of 3.'
      }
    ],
    constraints: [
      '0 <= s.length <= 5 * 10⁴',
      's consists of English letters, digits, symbols and spaces.'
    ],
    starterCode: {
      javascript: `function lengthOfLongestSubstring(s) {
  let charSet = new Set();
  let left = 0;
  let maxLen = 0;
  
  for (let right = 0; right < s.length; right++) {
    while (charSet.has(s[right])) {
      charSet.delete(s[left]);
      left++;
    }
    charSet.add(s[right]);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}`,
      python: `def lengthOfLongestSubstring(s: str) -> int:
    char_set = set()
    left = 0
    res = 0
    for right in range(len(s)):
        while s[right] in char_set:
            char_set.remove(s[left])
            left += 1
        char_set.add(s[right])
        res = max(res, right - left + 1)
    return res`
    },
    testCases: [
      { input: { s: 'abcabcbb' }, expected: 3 },
      { input: { s: 'bbbbb' }, expected: 1 },
      { input: { s: 'pwwkew' }, expected: 3 }
    ],
    hints: [
      'Use a sliding window with two pointers left and right.',
      'Maintain a set of characters currently present in the window.'
    ],
    solutionExplanation: `### Sliding Window Technique

Maintain a window [left, right] that contains non-repeating characters. Time O(N), Space O(min(N, M)).`
  },
  {
    id: 4,
    slug: 'median-of-two-sorted-arrays',
    title: '4. Median of Two Sorted Arrays',
    difficulty: 'Hard',
    category: 'Binary Search',
    acceptance: '39.8%',
    frequency: '88%',
    status: 'Todo',
    tags: ['Array', 'Binary Search', 'Divide and Conquer'],
    companies: ['Google', 'Amazon', 'Meta', 'Netflix'],
    description: `Given two sorted arrays \`nums1\` and \`nums2\` of size \`m\` and \`n\` respectively, return the median of the two sorted arrays.

The overall run time complexity should be **O(log (m+n))**.`,
    examples: [
      {
        input: 'nums1 = [1,3], nums2 = [2]',
        output: '2.00000',
        explanation: 'merged array = [1,2,3] and median is 2.'
      },
      {
        input: 'nums1 = [1,2], nums2 = [3,4]',
        output: '2.50000',
        explanation: 'merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.'
      }
    ],
    constraints: [
      'nums1.length == m',
      'nums2.length == n',
      '0 <= m <= 1000',
      '0 <= n <= 1000',
      '1 <= m + n <= 2000'
    ],
    starterCode: {
      javascript: `function findMedianSortedArrays(nums1, nums2) {
  // Write your O(log(m+n)) solution here
  const merged = [...nums1, ...nums2].sort((a, b) => a - b);
  const mid = Math.floor(merged.length / 2);
  if (merged.length % 2 === 0) {
    return (merged[mid - 1] + merged[mid]) / 2;
  }
  return merged[mid];
}`,
      python: `def findMedianSortedArrays(nums1: list[int], nums2: list[int]) -> float:
    A, B = nums1, nums2
    total = len(nums1) + len(nums2)
    half = total // 2
    if len(B) < len(A):
        A, B = B, A
    l, r = 0, len(A) - 1
    while True:
        i = (l + r) // 2
        j = half - i - 2
        Aleft = A[i] if i >= 0 else float("-inf")
        Aright = A[i + 1] if (i + 1) < len(A) else float("inf")
        Bleft = B[j] if j >= 0 else float("-inf")
        Bright = B[j + 1] if (j + 1) < len(B) else float("inf")
        if Aleft <= Bright and Bleft <= Aright:
            if total % 2:
                return min(Aright, Bright)
            return (max(Aleft, Bleft) + min(Aright, Bright)) / 2
        elif Aleft > Bright:
            r = i - 1
        else:
            l = i + 1`
    },
    testCases: [
      { input: { nums1: [1, 3], nums2: [2] }, expected: 2 },
      { input: { nums1: [1, 2], nums2: [3, 4] }, expected: 2.5 }
    ],
    hints: [
      'Can you partition both arrays such that the left half has equal elements to the right half?',
      'Binary search on the smaller array.'
    ],
    solutionExplanation: `### Binary Search Partitioning

We perform binary search on the smaller of the two arrays to partition them such that max(left) <= min(right).`
  },
  {
    id: 5,
    slug: 'valid-parentheses',
    title: '20. Valid Parentheses',
    difficulty: 'Easy',
    category: 'Stack',
    acceptance: '40.6%',
    frequency: '95%',
    status: 'Solved',
    tags: ['String', 'Stack'],
    companies: ['Amazon', 'Microsoft', 'Meta', 'Apple'],
    description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    examples: [
      { input: 's = "()"', output: 'true' },
      { input: 's = "()[]{}"', output: 'true' },
      { input: 's = "(]"', output: 'false' }
    ],
    constraints: [
      '1 <= s.length <= 10⁴',
      's consists of parentheses only \'()[]{}\'.'
    ],
    starterCode: {
      javascript: `function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (let char of s) {
    if (char in map) {
      if (stack.pop() !== map[char]) return false;
    } else {
      stack.push(char);
    }
  }
  return stack.length === 0;
}`,
      python: `def isValid(s: str) -> bool:
    stack = []
    close_to_open = {")": "(", "}": "{", "]": "["}
    for c in s:
        if c in close_to_open:
            if stack and stack[-1] == close_to_open[c]:
                stack.pop()
            else:
                return False
        else:
            stack.append(c)
    return True if not stack else False`
    },
    testCases: [
      { input: { s: '()' }, expected: true },
      { input: { s: '()[]{}' }, expected: true },
      { input: { s: '(]' }, expected: false }
    ],
    hints: [
      'Use a stack to keep track of opening brackets.',
      'When encountering a closing bracket, check if it matches the top of the stack.'
    ],
    solutionExplanation: `### Stack Data Structure

Push opening brackets to stack, pop when matching closing bracket is encountered.`
  },
  {
    id: 6,
    slug: 'container-with-most-water',
    title: '11. Container With Most Water',
    difficulty: 'Medium',
    category: 'Two Pointers',
    acceptance: '54.2%',
    frequency: '90%',
    status: 'Todo',
    tags: ['Array', 'Two Pointers', 'Greedy'],
    companies: ['Google', 'Amazon', 'Meta'],
    description: `You are given an integer array \`height\` of length \`n\`. There are \`n\` vertical lines drawn such that the two endpoints of the \`i\`-th line are \`(i, 0)\` and \`(i, height[i])\`.

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the *maximum amount of water a container can store*.`,
    examples: [
      {
        input: 'height = [1,8,6,2,5,4,8,3,7]',
        output: '49',
        explanation: 'The max area of water the container can contain is 49.'
      }
    ],
    constraints: ['n == height.length', '2 <= n <= 10⁵', '0 <= height[i] <= 10⁴'],
    starterCode: {
      javascript: `function maxArea(height) {
  let left = 0, right = height.length - 1;
  let maxWater = 0;
  while (left < right) {
    let currentArea = Math.min(height[left], height[right]) * (right - left);
    maxWater = Math.max(maxWater, currentArea);
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }
  return maxWater;
}`,
      python: `def maxArea(height: list[int]) -> int:
    l, r = 0, len(height) - 1
    res = 0
    while l < r:
        area = min(height[l], height[r]) * (r - l)
        res = max(res, area)
        if height[l] < height[r]:
            l += 1
        else:
            r -= 1
    return res`
    },
    testCases: [
      { input: { height: [1, 8, 6, 2, 5, 4, 8, 3, 7] }, expected: 49 },
      { input: { height: [1, 1] }, expected: 1 }
    ],
    hints: [
      'Start with two pointers at opposite ends.',
      'Always move the pointer pointing to the shorter line inwards.'
    ],
    solutionExplanation: `### Two Pointer Technique

We place pointers at left and right. Moving the shorter line pointer gives us a chance to find a taller line.`
  }
];
