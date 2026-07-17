// ─────────────────────────────────────────────────────────────────────────────
// AlgoMind — Mock Data
// ─────────────────────────────────────────────────────────────────────────────

// ─── PROBLEMS ────────────────────────────────────────────────────────────────

export const problems = [
  // ── 1. Two Sum ──────────────────────────────────────────────────────────────
  {
    id: 1,
    title: "Two Sum",
    slug: "two-sum",
    difficulty: "Easy",
    tags: ["Array", "Hash Table"],
    companies: ["Google", "Amazon", "Microsoft", "Meta", "Apple", "Adobe"],
    acceptance: 49.1,
    frequency: 98,
    isPremium: false,
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
      },
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists.",
    ],
    hints: [
      "A brute-force solution iterates over every pair — O(n²). Can you do better?",
      "Think about using a hash map to store complements you have already seen.",
      "For each number, check if (target - num) exists in the map before inserting.",
    ],
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    editorial:
      "Iterate through the array once. For each element x, check whether (target − x) already exists in a hash map. If it does, return the stored index and the current index. Otherwise, store x → currentIndex in the map. This single pass yields O(n) time and O(n) space.",
  },

  // ── 2. Valid Parentheses ────────────────────────────────────────────────────
  {
    id: 2,
    title: "Valid Parentheses",
    slug: "valid-parentheses",
    difficulty: "Easy",
    tags: ["Stack", "String"],
    companies: ["Google", "Amazon", "Meta", "Bloomberg", "Microsoft"],
    acceptance: 40.7,
    frequency: 91,
    isPremium: false,
    description:
      "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if open brackets are closed by the same type of brackets and in the correct order. Every close bracket has a corresponding open bracket of the same type.",
    examples: [
      {
        input: 's = "()[]{}"',
        output: "true",
        explanation:
          "Every opening bracket is closed by its matching counterpart in the correct order.",
      },
      {
        input: 's = "(]"',
        output: "false",
        explanation:
          "The opening '(' is closed by ']' which is a different bracket type.",
      },
    ],
    constraints: [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only '()[]{}'.",
    ],
    hints: [
      "Use a stack to track opening brackets.",
      "When you see a closing bracket, check if the top of the stack is its matching opener.",
      "At the end, the stack should be empty for the string to be valid.",
    ],
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    editorial:
      "Maintain a stack. For every opening bracket push it. For every closing bracket pop the stack and verify it matches; if not, return false. After processing all characters, the string is valid only if the stack is empty.",
  },

  // ── 3. Merge Two Sorted Lists ───────────────────────────────────────────────
  {
    id: 3,
    title: "Merge Two Sorted Lists",
    slug: "merge-two-sorted-lists",
    difficulty: "Easy",
    tags: ["Linked List", "Recursion"],
    companies: ["Amazon", "Microsoft", "Apple", "Adobe", "Bloomberg"],
    acceptance: 62.3,
    frequency: 88,
    isPremium: false,
    description:
      "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list built by splicing together the nodes of the first two lists. Return the head of the merged linked list.",
    examples: [
      {
        input: "list1 = [1,2,4], list2 = [1,3,4]",
        output: "[1,1,2,3,4,4]",
        explanation:
          "Interleaving the two sorted lists produces a single sorted list.",
      },
      {
        input: "list1 = [], list2 = [0]",
        output: "[0]",
        explanation: "Merging an empty list with [0] returns [0].",
      },
    ],
    constraints: [
      "The number of nodes in both lists is in the range [0, 50].",
      "-100 <= Node.val <= 100",
      "Both list1 and list2 are sorted in non-decreasing order.",
    ],
    hints: [
      "Use a dummy head node to simplify edge cases.",
      "Compare the heads of both lists and advance the smaller one.",
      "A recursive approach elegantly mirrors the problem's substructure.",
    ],
    timeComplexity: "O(m + n)",
    spaceComplexity: "O(1)",
    editorial:
      "Use a dummy sentinel node and a current pointer. At each step compare the front nodes of both lists, attach the smaller one to current, and advance that list's pointer. When one list is exhausted, append the remainder of the other. Return dummy.next.",
  },

  // ── 4. Best Time to Buy and Sell Stock ─────────────────────────────────────
  {
    id: 4,
    title: "Best Time to Buy and Sell Stock",
    slug: "best-time-to-buy-and-sell-stock",
    difficulty: "Easy",
    tags: ["Array", "Dynamic Programming", "Greedy"],
    companies: ["Amazon", "Goldman Sachs", "Microsoft", "Bloomberg", "Uber"],
    acceptance: 54.2,
    frequency: 93,
    isPremium: false,
    description:
      "You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and a different day in the future to sell it. Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.",
    examples: [
      {
        input: "prices = [7,1,5,3,6,4]",
        output: "5",
        explanation:
          "Buy on day 2 (price=1) and sell on day 5 (price=6), profit = 6 - 1 = 5.",
      },
      {
        input: "prices = [7,6,4,3,1]",
        output: "0",
        explanation:
          "Prices only decrease, so no transaction is profitable and we return 0.",
      },
    ],
    constraints: [
      "1 <= prices.length <= 10^5",
      "0 <= prices[i] <= 10^4",
    ],
    hints: [
      "Track the minimum price seen so far as you scan left to right.",
      "At each price, compute profit = currentPrice - minSoFar and update the global max.",
      "One pass is sufficient — no need for nested loops.",
    ],
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    editorial:
      "Scan prices left-to-right while tracking the running minimum (cheapest buy day). For each day compute the potential profit against that minimum and update the global maximum profit. Return the global max at the end.",
  },

  // ── 5. Valid Palindrome ─────────────────────────────────────────────────────
  {
    id: 5,
    title: "Valid Palindrome",
    slug: "valid-palindrome",
    difficulty: "Easy",
    tags: ["String", "Two Pointers"],
    companies: ["Microsoft", "Meta", "Bloomberg", "Apple", "Uber"],
    acceptance: 45.8,
    frequency: 82,
    isPremium: false,
    description:
      "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers. Given a string s, return true if it is a palindrome, or false otherwise.",
    examples: [
      {
        input: 's = "A man, a plan, a canal: Panama"',
        output: "true",
        explanation:
          '"amanaplanacanalpanama" is a palindrome after cleaning.',
      },
      {
        input: 's = "race a car"',
        output: "false",
        explanation: '"raceacar" is not a palindrome.',
      },
    ],
    constraints: [
      "1 <= s.length <= 2 * 10^5",
      "s consists only of printable ASCII characters.",
    ],
    hints: [
      "Use two pointers: one at the start and one at the end.",
      "Skip non-alphanumeric characters before comparing.",
      "Compare characters case-insensitively.",
    ],
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    editorial:
      "Place a left pointer at the beginning and a right pointer at the end. Skip non-alphanumeric characters on both sides, then compare lowercase versions of the characters. If any pair differs, return false. Continue until pointers meet.",
  },

  // ── 6. Binary Search ────────────────────────────────────────────────────────
  {
    id: 6,
    title: "Binary Search",
    slug: "binary-search",
    difficulty: "Easy",
    tags: ["Array", "Binary Search"],
    companies: ["Google", "Amazon", "Microsoft", "Apple"],
    acceptance: 57.4,
    frequency: 79,
    isPremium: false,
    description:
      "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1. You must write an algorithm with O(log n) runtime complexity.",
    examples: [
      {
        input: "nums = [-1,0,3,5,9,12], target = 9",
        output: "4",
        explanation: "9 exists in nums and its index is 4.",
      },
      {
        input: "nums = [-1,0,3,5,9,12], target = 2",
        output: "-1",
        explanation: "2 does not exist in nums so return -1.",
      },
    ],
    constraints: [
      "1 <= nums.length <= 10^4",
      "-10^4 < nums[i], target < 10^4",
      "All the integers in nums are unique.",
      "nums is sorted in ascending order.",
    ],
    hints: [
      "Set left = 0 and right = nums.length - 1.",
      "Calculate mid = Math.floor((left + right) / 2).",
      "Eliminate half the search space each iteration based on the mid comparison.",
    ],
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    editorial:
      "Classic binary search: maintain [left, right] bounds. Compute mid and compare nums[mid] with target. If equal return mid; if target is smaller narrow right to mid-1; otherwise expand left to mid+1. Return -1 if bounds cross.",
  },

  // ── 7. Climbing Stairs ──────────────────────────────────────────────────────
  {
    id: 7,
    title: "Climbing Stairs",
    slug: "climbing-stairs",
    difficulty: "Easy",
    tags: ["Math", "Dynamic Programming", "Recursion"],
    companies: ["Amazon", "Apple", "Adobe", "Bloomberg"],
    acceptance: 51.9,
    frequency: 85,
    isPremium: false,
    description:
      "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    examples: [
      {
        input: "n = 2",
        output: "2",
        explanation:
          "There are two ways to climb to the top: (1 step + 1 step) or (2 steps).",
      },
      {
        input: "n = 3",
        output: "3",
        explanation: "Three ways: (1+1+1), (1+2), or (2+1).",
      },
    ],
    constraints: ["1 <= n <= 45"],
    hints: [
      "Notice the recurrence: ways(n) = ways(n-1) + ways(n-2).",
      "This is essentially the Fibonacci sequence.",
      "Use two variables instead of an array to save space.",
    ],
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    editorial:
      "The number of ways to reach step n equals ways(n-1) + ways(n-2) because the last step is either 1 or 2. Base cases: ways(1)=1, ways(2)=2. Iteratively compute up to n using two rolling variables — identical to computing Fibonacci numbers.",
  },

  // ── 8. Reverse Linked List ──────────────────────────────────────────────────
  {
    id: 8,
    title: "Reverse Linked List",
    slug: "reverse-linked-list",
    difficulty: "Easy",
    tags: ["Linked List", "Recursion"],
    companies: ["Amazon", "Microsoft", "Google", "Adobe"],
    acceptance: 74.6,
    frequency: 86,
    isPremium: false,
    description:
      "Given the head of a singly linked list, reverse the list, and return the reversed list. You should implement both the iterative and recursive approaches.",
    examples: [
      {
        input: "head = [1,2,3,4,5]",
        output: "[5,4,3,2,1]",
        explanation:
          "The list is reversed in place by re-pointing next pointers.",
      },
      {
        input: "head = [1,2]",
        output: "[2,1]",
        explanation: "Simple two-node reversal.",
      },
    ],
    constraints: [
      "The number of nodes in the list is in the range [0, 5000].",
      "-5000 <= Node.val <= 5000",
    ],
    hints: [
      "For the iterative approach, maintain prev, curr, and next pointers.",
      "At each step, redirect curr.next to prev, then advance both pointers.",
      "Recursively, the base case is an empty or single-node list.",
    ],
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    editorial:
      "Iterative: start with prev=null, curr=head. Each iteration saves curr.next, points curr.next to prev, moves prev to curr and curr to saved next. After the loop, prev is the new head. Recursive variant delegates reversal to the tail and fixes the pointer back.",
  },

  // ── 9. Maximum Subarray ─────────────────────────────────────────────────────
  {
    id: 9,
    title: "Maximum Subarray",
    slug: "maximum-subarray",
    difficulty: "Medium",
    tags: ["Array", "Dynamic Programming", "Greedy"],
    companies: ["Amazon", "Microsoft", "Apple", "Bloomberg", "Google"],
    acceptance: 50.3,
    frequency: 94,
    isPremium: false,
    description:
      "Given an integer array nums, find the subarray with the largest sum, and return its sum. A subarray is a contiguous non-empty sequence of elements within an array.",
    examples: [
      {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
        explanation: "The subarray [4,-1,2,1] has the largest sum = 6.",
      },
      {
        input: "nums = [5,4,-1,7,8]",
        output: "23",
        explanation: "The whole array sums to 23.",
      },
    ],
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4",
    ],
    hints: [
      "Kadane's algorithm keeps a running sum and resets when it goes negative.",
      "At each index, decide: extend the current subarray or start fresh?",
      "Track the global maximum as you iterate.",
    ],
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    editorial:
      "Kadane's Algorithm: traverse the array maintaining currentSum = max(nums[i], currentSum + nums[i]). This decides whether to extend the existing subarray or start a new one at the current element. Update globalMax at each step.",
  },

  // ── 10. Container With Most Water ──────────────────────────────────────────
  {
    id: 10,
    title: "Container With Most Water",
    slug: "container-with-most-water",
    difficulty: "Medium",
    tags: ["Array", "Two Pointers", "Greedy"],
    companies: ["Google", "Amazon", "Bloomberg", "Uber", "Meta"],
    acceptance: 54.7,
    frequency: 89,
    isPremium: false,
    description:
      "You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container that contains the most water. Return the maximum amount of water a container can store.",
    examples: [
      {
        input: "height = [1,8,6,2,5,4,8,3,7]",
        output: "49",
        explanation:
          "Lines at indices 1 and 8 form a container of width 7 and height min(8,7)=7, area=49.",
      },
      {
        input: "height = [1,1]",
        output: "1",
        explanation: "Only one container of area 1 is possible.",
      },
    ],
    constraints: [
      "n == height.length",
      "2 <= n <= 10^5",
      "0 <= height[i] <= 10^4",
    ],
    hints: [
      "Start with the widest container possible (pointers at both ends).",
      "Move the pointer pointing to the shorter line inward.",
      "The area is always limited by the shorter line, so moving the taller one can only decrease area.",
    ],
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    editorial:
      "Two-pointer technique: start left=0, right=n-1. Compute area = min(height[l], height[r]) * (r-l). Move the pointer with the smaller height inward, since that is the only way to potentially increase the area. Track the maximum area found.",
  },

  // ── 11. 3Sum ────────────────────────────────────────────────────────────────
  {
    id: 11,
    title: "3Sum",
    slug: "3sum",
    difficulty: "Medium",
    tags: ["Array", "Two Pointers", "Sorting"],
    companies: ["Google", "Amazon", "Meta", "Microsoft", "Bloomberg"],
    acceptance: 32.9,
    frequency: 90,
    isPremium: false,
    description:
      "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, j != k, and nums[i] + nums[j] + nums[k] == 0. Notice that the solution set must not contain duplicate triplets.",
    examples: [
      {
        input: "nums = [-1,0,1,2,-1,-4]",
        output: "[[-1,-1,2],[-1,0,1]]",
        explanation:
          "The distinct triplets that sum to zero are [-1,-1,2] and [-1,0,1].",
      },
      {
        input: "nums = [0,1,1]",
        output: "[]",
        explanation: "No triplet sums to zero.",
      },
    ],
    constraints: [
      "3 <= nums.length <= 3000",
      "-10^5 <= nums[i] <= 10^5",
    ],
    hints: [
      "Sort the array first to handle duplicates easily.",
      "Fix one element and use two pointers on the remaining subarray.",
      "Skip duplicate values at each pointer position to avoid duplicate triplets.",
    ],
    timeComplexity: "O(n^2)",
    spaceComplexity: "O(n)",
    editorial:
      "Sort nums. For each index i, run two pointers (left=i+1, right=n-1) finding pairs that sum to -nums[i]. After finding a triplet, skip duplicate values on all three pointers. The sort enables efficient duplicate skipping and two-pointer convergence.",
  },

  // ── 12. Product of Array Except Self ───────────────────────────────────────
  {
    id: 12,
    title: "Product of Array Except Self",
    slug: "product-of-array-except-self",
    difficulty: "Medium",
    tags: ["Array", "Greedy"],
    companies: ["Amazon", "Microsoft", "Apple", "Meta", "Uber"],
    acceptance: 65.4,
    frequency: 87,
    isPremium: false,
    description:
      "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]. The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer. You must write an algorithm that runs in O(n) time and without using the division operation.",
    examples: [
      {
        input: "nums = [1,2,3,4]",
        output: "[24,12,8,6]",
        explanation:
          "answer[0]=2*3*4=24, answer[1]=1*3*4=12, answer[2]=1*2*4=8, answer[3]=1*2*3=6.",
      },
      {
        input: "nums = [-1,1,0,-3,3]",
        output: "[0,0,9,0,0]",
        explanation: "The zero makes most products zero.",
      },
    ],
    constraints: [
      "2 <= nums.length <= 10^5",
      "-30 <= nums[i] <= 30",
      "The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.",
    ],
    hints: [
      "Build a prefix-product array: prefix[i] = product of all elements before i.",
      "Build a suffix-product array: suffix[i] = product of all elements after i.",
      "answer[i] = prefix[i] * suffix[i]. Can you do it in O(1) extra space?",
    ],
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    editorial:
      "First pass: fill the answer array with prefix products. Second pass: maintain a running suffix product and multiply it into each answer[i] from right to left. This avoids division and uses only the output array as extra space.",
  },

  // ── 13. Longest Substring Without Repeating ────────────────────────────────
  {
    id: 13,
    title: "Longest Substring Without Repeating Characters",
    slug: "longest-substring-without-repeating-characters",
    difficulty: "Medium",
    tags: ["String", "Hash Table", "Sliding Window"],
    companies: ["Amazon", "Google", "Bloomberg", "Microsoft", "Adobe"],
    acceptance: 33.8,
    frequency: 95,
    isPremium: false,
    description:
      "Given a string s, find the length of the longest substring without repeating characters. A substring is a contiguous non-empty sequence of characters within a string.",
    examples: [
      {
        input: 's = "abcabcbb"',
        output: "3",
        explanation: 'The answer is "abc", with the length of 3.',
      },
      {
        input: 's = "pwwkew"',
        output: "3",
        explanation: 'The answer is "wke", with the length of 3.',
      },
    ],
    constraints: [
      "0 <= s.length <= 5 * 10^4",
      "s consists of English letters, digits, symbols and spaces.",
    ],
    hints: [
      "Use a sliding window [left, right] and expand right until a duplicate appears.",
      "On duplicate, advance left past the previous occurrence of that character.",
      "A hash map stores the most recent index of each character.",
    ],
    timeComplexity: "O(n)",
    spaceComplexity: "O(min(m, n))",
    editorial:
      "Sliding window with a character-to-index map. Expand the right boundary one character at a time. If s[right] was seen at index k >= left, move left to k+1 to drop the duplicate. The window [left, right] always contains unique characters — track its maximum length.",
  },

  // ── 14. Group Anagrams ──────────────────────────────────────────────────────
  {
    id: 14,
    title: "Group Anagrams",
    slug: "group-anagrams",
    difficulty: "Medium",
    tags: ["Array", "Hash Table", "String", "Sorting"],
    companies: ["Amazon", "Microsoft", "Bloomberg", "Uber", "Apple"],
    acceptance: 67.3,
    frequency: 83,
    isPremium: false,
    description:
      "Given an array of strings strs, group the anagrams together. You can return the answer in any order. An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.",
    examples: [
      {
        input: 'strs = ["eat","tea","tan","ate","nat","bat"]',
        output: '[["bat"],["nat","tan"],["ate","eat","tea"]]',
        explanation:
          "Strings that are anagrams of each other are grouped together.",
      },
      {
        input: 'strs = [""]',
        output: '[[""]]',
        explanation: "Single empty string forms one group.",
      },
    ],
    constraints: [
      "1 <= strs.length <= 10^4",
      "0 <= strs[i].length <= 100",
      "strs[i] consists of lowercase English letters.",
    ],
    hints: [
      "Sort each string to get its canonical anagram key.",
      "Use a hash map from sorted-string to list of original strings.",
      "All strings in the same bucket are anagrams.",
    ],
    timeComplexity: "O(n * k log k)",
    spaceComplexity: "O(n * k)",
    editorial:
      "For each string, sort its characters to form a canonical key. Insert the original string into a map keyed by this sorted version. At the end, return the map's values as the groups. Alternatively, use a 26-character frequency count as the key for O(n*k) time.",
  },

  // ── 15. Coin Change ─────────────────────────────────────────────────────────
  {
    id: 15,
    title: "Coin Change",
    slug: "coin-change",
    difficulty: "Medium",
    tags: ["Array", "Dynamic Programming", "BFS"],
    companies: ["Amazon", "Microsoft", "Goldman Sachs", "Google", "Bloomberg"],
    acceptance: 42.7,
    frequency: 86,
    isPremium: false,
    description:
      "You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1. You may assume that you have an infinite number of each kind of coin.",
    examples: [
      {
        input: "coins = [1,5,10,25], amount = 36",
        output: "3",
        explanation: "25 + 10 + 1 = 36 using 3 coins.",
      },
      {
        input: "coins = [2], amount = 3",
        output: "-1",
        explanation: "3 cannot be formed with only 2-denomination coins.",
      },
    ],
    constraints: [
      "1 <= coins.length <= 12",
      "1 <= coins[i] <= 2^31 - 1",
      "0 <= amount <= 10^4",
    ],
    hints: [
      "Define dp[i] = minimum coins to make amount i.",
      "Base case: dp[0] = 0; initialise all others to Infinity.",
      "For each amount i, try every coin c: dp[i] = min(dp[i], dp[i-c] + 1).",
    ],
    timeComplexity: "O(amount * coins.length)",
    spaceComplexity: "O(amount)",
    editorial:
      "Bottom-up DP: create a dp array of size amount+1 initialised to Infinity, with dp[0]=0. For each sub-amount from 1 to amount, iterate over all coins and update dp[i] = min(dp[i], dp[i-coin]+1) when i-coin >= 0. Return dp[amount] or -1 if still Infinity.",
  },

  // ── 16. Number of Islands ───────────────────────────────────────────────────
  {
    id: 16,
    title: "Number of Islands",
    slug: "number-of-islands",
    difficulty: "Medium",
    tags: ["Graph", "BFS", "DFS"],
    companies: ["Amazon", "Google", "Microsoft", "Bloomberg", "Uber"],
    acceptance: 57.8,
    frequency: 92,
    isPremium: false,
    description:
      "Given an m x n 2D binary grid where '1' represents land and '0' represents water, return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.",
    examples: [
      {
        input:
          'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]',
        output: "3",
        explanation: "Three connected components of 1s exist in the grid.",
      },
      {
        input: 'grid = [["1","1","1"],["0","1","0"],["1","1","1"]]',
        output: "1",
        explanation: "All land cells are connected forming one island.",
      },
    ],
    constraints: [
      "m == grid.length",
      "n == grid[i].length",
      "1 <= m, n <= 300",
      "grid[i][j] is '0' or '1'.",
    ],
    hints: [
      "Each time you encounter an unvisited '1', you have found a new island.",
      "Use DFS or BFS to mark all connected land cells as visited.",
      "Sink visited cells (set to '0') to avoid revisiting.",
    ],
    timeComplexity: "O(m * n)",
    spaceComplexity: "O(m * n)",
    editorial:
      "Iterate every cell. On finding an unvisited '1', increment the island count and run DFS/BFS to flood-fill all reachable land cells to '0'. Repeat until all cells are processed. Time is O(m*n) since each cell is visited at most once.",
  },

  // ── 17. Top K Frequent Elements ─────────────────────────────────────────────
  {
    id: 17,
    title: "Top K Frequent Elements",
    slug: "top-k-frequent-elements",
    difficulty: "Medium",
    tags: ["Array", "Hash Table", "Sorting", "Heap"],
    companies: ["Amazon", "Google", "Bloomberg", "Uber", "Meta"],
    acceptance: 64.2,
    frequency: 84,
    isPremium: false,
    description:
      "Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order. Your algorithm should have better than O(n log n) time complexity.",
    examples: [
      {
        input: "nums = [1,1,1,2,2,3], k = 2",
        output: "[1,2]",
        explanation:
          "1 appears 3 times and 2 appears 2 times — the top 2 frequent.",
      },
      {
        input: "nums = [1], k = 1",
        output: "[1]",
        explanation: "Only one element — it is the most frequent.",
      },
    ],
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4",
      "k is in the range [1, the number of unique elements in the array].",
    ],
    hints: [
      "Build a frequency map first.",
      "Use bucket sort: create n+1 buckets indexed by frequency.",
      "Collect elements from the highest-frequency buckets downward until k are gathered.",
    ],
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    editorial:
      "Bucket sort approach: count frequencies with a hash map, then place each unique number into a bucket at index equal to its frequency (array of n+1 lists). Iterate buckets from highest to lowest and collect elements until k are found — O(n) overall.",
  },

  // ── 18. Binary Tree Level Order Traversal ──────────────────────────────────
  {
    id: 18,
    title: "Binary Tree Level Order Traversal",
    slug: "binary-tree-level-order-traversal",
    difficulty: "Medium",
    tags: ["Tree", "BFS", "Queue"],
    companies: ["Amazon", "Microsoft", "Bloomberg", "Google", "Apple"],
    acceptance: 66.1,
    frequency: 81,
    isPremium: false,
    description:
      "Given the root of a binary tree, return the level order traversal of its nodes' values (i.e., from left to right, level by level). Each level's values should be grouped as a separate subarray in the output.",
    examples: [
      {
        input: "root = [3,9,20,null,null,15,7]",
        output: "[[3],[9,20],[15,7]]",
        explanation: "Level 0: [3], Level 1: [9,20], Level 2: [15,7].",
      },
      {
        input: "root = [1]",
        output: "[[1]]",
        explanation: "Single node tree has one level.",
      },
    ],
    constraints: [
      "The number of nodes in the tree is in the range [0, 2000].",
      "-1000 <= Node.val <= 1000",
    ],
    hints: [
      "Use a queue (FIFO) for BFS.",
      "At the start of each iteration, the queue size tells you how many nodes are in the current level.",
      "Process exactly that many nodes and enqueue their children before moving to the next level.",
    ],
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    editorial:
      "BFS with a queue: initialise with the root. Each iteration snapshot the queue's current length L (nodes in this level), dequeue L nodes collecting their values, enqueue their non-null children, and append the level's array to the result.",
  },

  // ── 19. Trapping Rain Water ─────────────────────────────────────────────────
  {
    id: 19,
    title: "Trapping Rain Water",
    slug: "trapping-rain-water",
    difficulty: "Hard",
    tags: ["Array", "Two Pointers", "Dynamic Programming", "Stack"],
    companies: ["Google", "Amazon", "Microsoft", "Bloomberg", "Goldman Sachs"],
    acceptance: 60.5,
    frequency: 88,
    isPremium: false,
    description:
      "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining. The water trapped at any position is determined by the minimum of the tallest bars to its left and right.",
    examples: [
      {
        input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
        output: "6",
        explanation:
          "The elevation map traps 6 units of rain water in the various valleys.",
      },
      {
        input: "height = [4,2,0,3,2,5]",
        output: "9",
        explanation: "9 units of water are trapped in the dips.",
      },
    ],
    constraints: [
      "n == height.length",
      "1 <= n <= 2 * 10^4",
      "0 <= height[i] <= 10^5",
    ],
    hints: [
      "For each index, water trapped = min(maxLeft, maxRight) - height[i].",
      "Precompute maxLeft and maxRight arrays in O(n) — this gives an O(n) time, O(n) space solution.",
      "Optimise to O(1) space using two pointers: process from whichever side has the shorter max.",
    ],
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    editorial:
      "Two-pointer solution: maintain leftMax, rightMax, left=0, right=n-1. If leftMax <= rightMax, water at left = leftMax - height[left]; advance left. Otherwise water at right = rightMax - height[right]; advance right. Update running maxes each step.",
  },

  // ── 20. Median of Two Sorted Arrays ────────────────────────────────────────
  {
    id: 20,
    title: "Median of Two Sorted Arrays",
    slug: "median-of-two-sorted-arrays",
    difficulty: "Hard",
    tags: ["Array", "Binary Search"],
    companies: ["Google", "Amazon", "Microsoft", "Apple", "Adobe"],
    acceptance: 38.1,
    frequency: 77,
    isPremium: true,
    description:
      "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log(m+n)). You may assume nums1 and nums2 cannot both be empty.",
    examples: [
      {
        input: "nums1 = [1,3], nums2 = [2]",
        output: "2.00000",
        explanation: "Merged array = [1,2,3] and median is 2.",
      },
      {
        input: "nums1 = [1,2], nums2 = [3,4]",
        output: "2.50000",
        explanation: "Merged array = [1,2,3,4] and median is (2+3)/2 = 2.5.",
      },
    ],
    constraints: [
      "nums1.length == m",
      "nums2.length == n",
      "0 <= m <= 1000",
      "0 <= n <= 1000",
      "1 <= m + n <= 2000",
      "-10^6 <= nums1[i], nums2[i] <= 10^6",
    ],
    hints: [
      "Think about binary searching for a partition point in the smaller array.",
      "A valid partition satisfies: all elements on the left are <= all elements on the right.",
      "The median is derived from the max of left halves and min of right halves.",
    ],
    timeComplexity: "O(log(min(m, n)))",
    spaceComplexity: "O(1)",
    editorial:
      "Binary search on the smaller array to find a partition i such that nums1[0..i] and nums2[0..j] form the left half of the merged array where j = (m+n+1)/2 - i. The partition is valid when nums1[i-1] <= nums2[j] and nums2[j-1] <= nums1[i]. Derive the median from the boundary values.",
  },
];

// ─── ROADMAPS ─────────────────────────────────────────────────────────────────

export const roadmaps = [
  {
    id: 1,
    title: "DSA Fundamentals",
    level: "Beginner",
    description:
      "Build a solid foundation in data structures and algorithms. Master arrays, strings, and basic math before diving into more complex topics.",
    problems: 45,
    duration: "6 weeks",
    icon: "🧱",
    tags: ["Arrays", "Strings", "Math"],
    completedProblems: 0,
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: 2,
    title: "Binary Search Mastery",
    level: "Intermediate",
    description:
      "Go beyond the basics of binary search. Learn variants like finding boundaries, rotated arrays, and search-space reduction techniques.",
    problems: 30,
    duration: "4 weeks",
    icon: "🔍",
    tags: ["Binary Search", "Array", "Math"],
    completedProblems: 0,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 3,
    title: "Dynamic Programming",
    level: "Advanced",
    description:
      "Master the art of breaking problems into overlapping subproblems. Covers memoization, tabulation, knapsack, LCS, and more.",
    problems: 60,
    duration: "10 weeks",
    icon: "⚡",
    tags: ["Dynamic Programming", "Recursion", "Greedy"],
    completedProblems: 0,
    color: "from-violet-500 to-purple-500",
  },
  {
    id: 4,
    title: "Graph Algorithms",
    level: "Advanced",
    description:
      "Explore BFS, DFS, shortest paths, topological sort, union-find, and minimum spanning trees through carefully curated problems.",
    problems: 40,
    duration: "8 weeks",
    icon: "🕸️",
    tags: ["Graph", "BFS", "DFS"],
    completedProblems: 0,
    color: "from-orange-500 to-red-500",
  },
  {
    id: 5,
    title: "Tree & Binary Tree",
    level: "Intermediate",
    description:
      "Become proficient in tree traversals, BST operations, lowest common ancestors, and segment trees through progressive problem sets.",
    problems: 35,
    duration: "5 weeks",
    icon: "🌳",
    tags: ["Tree", "BFS", "DFS", "Recursion"],
    completedProblems: 0,
    color: "from-green-500 to-lime-500",
  },
  {
    id: 6,
    title: "Two Pointers & Sliding Window",
    level: "Intermediate",
    description:
      "Learn the elegant two-pointer and sliding window patterns that reduce O(n²) brute-force solutions to O(n) linear time.",
    problems: 25,
    duration: "3 weeks",
    icon: "🪟",
    tags: ["Two Pointers", "Sliding Window", "Array", "String"],
    completedProblems: 0,
    color: "from-pink-500 to-rose-500",
  },
  {
    id: 7,
    title: "Stack & Queue",
    level: "Beginner",
    description:
      "Understand the power of LIFO and FIFO data structures. Solve classic problems involving monotonic stacks, queues, and deques.",
    problems: 20,
    duration: "2 weeks",
    icon: "📚",
    tags: ["Stack", "Queue", "String"],
    completedProblems: 0,
    color: "from-yellow-500 to-amber-500",
  },
  {
    id: 8,
    title: "FAANG Interview Prep",
    level: "Advanced",
    description:
      "A comprehensive interview preparation track covering every topic asked at top tech companies. Includes system design hints and behavioural tips.",
    problems: 100,
    duration: "16 weeks",
    icon: "🚀",
    tags: ["All Topics", "System Design", "Behavioural"],
    completedProblems: 0,
    color: "from-purple-500 to-cyan-500",
  },
];

// ─── LEADERBOARD USERS ────────────────────────────────────────────────────────

export const users = [
  {
    rank: 1,
    username: "neal_wu",
    avatar: "NW",
    rating: 3812,
    solved: 2847,
    streak: 365,
    country: "US",
    badge: "🏆 Grandmaster",
  },
  {
    rank: 2,
    username: "tourist",
    avatar: "TU",
    rating: 3756,
    solved: 2634,
    streak: 280,
    country: "BY",
    badge: "🥇 Grandmaster",
  },
  {
    rank: 3,
    username: "jiangly",
    avatar: "JL",
    rating: 3698,
    solved: 2511,
    streak: 199,
    country: "CN",
    badge: "🥇 Grandmaster",
  },
  {
    rank: 4,
    username: "ksun48",
    avatar: "KS",
    rating: 3543,
    solved: 2390,
    streak: 143,
    country: "US",
    badge: "⭐ Master",
  },
  {
    rank: 5,
    username: "alex_codes",
    avatar: "AC",
    rating: 3412,
    solved: 2187,
    streak: 112,
    country: "IN",
    badge: "⭐ Master",
  },
  {
    rank: 6,
    username: "priya_dsa",
    avatar: "PD",
    rating: 3278,
    solved: 1945,
    streak: 87,
    country: "IN",
    badge: "💎 Expert",
  },
  {
    rank: 7,
    username: "leet_lord",
    avatar: "LL",
    rating: 3101,
    solved: 1821,
    streak: 64,
    country: "DE",
    badge: "💎 Expert",
  },
  {
    rank: 8,
    username: "byte_baron",
    avatar: "BB",
    rating: 2987,
    solved: 1703,
    streak: 55,
    country: "BR",
    badge: "🔵 Knight",
  },
  {
    rank: 9,
    username: "algo_anna",
    avatar: "AA",
    rating: 2854,
    solved: 1598,
    streak: 48,
    country: "CA",
    badge: "🔵 Knight",
  },
  {
    rank: 10,
    username: "stack_sam",
    avatar: "SS",
    rating: 2731,
    solved: 1472,
    streak: 33,
    country: "UK",
    badge: "🟢 Guardian",
  },
];

// ─── COMPANIES ────────────────────────────────────────────────────────────────

export const companies = [
  { name: "Google",        logo: "G", problems: 847, color: "from-blue-500 to-green-500"    },
  { name: "Amazon",        logo: "A", problems: 784, color: "from-orange-500 to-yellow-500" },
  { name: "Microsoft",     logo: "M", problems: 631, color: "from-blue-600 to-cyan-500"     },
  { name: "Meta",          logo: "M", problems: 592, color: "from-blue-400 to-indigo-500"   },
  { name: "Apple",         logo: "A", problems: 412, color: "from-gray-400 to-gray-600"     },
  { name: "Adobe",         logo: "A", problems: 387, color: "from-red-500 to-pink-500"      },
  { name: "Uber",          logo: "U", problems: 356, color: "from-gray-700 to-gray-900"     },
  { name: "Netflix",       logo: "N", problems: 234, color: "from-red-600 to-red-800"       },
  { name: "Bloomberg",     logo: "B", problems: 298, color: "from-purple-500 to-violet-600" },
  { name: "Goldman Sachs", logo: "G", problems: 211, color: "from-blue-700 to-indigo-700"   },
  { name: "Twitter",       logo: "T", problems: 178, color: "from-sky-400 to-cyan-500"      },
  { name: "LinkedIn",      logo: "L", problems: 163, color: "from-blue-500 to-blue-700"     },
  { name: "Airbnb",        logo: "A", problems: 142, color: "from-rose-500 to-pink-600"     },
  { name: "Stripe",        logo: "S", problems: 127, color: "from-violet-500 to-purple-700" },
  { name: "Snowflake",     logo: "S", problems: 109, color: "from-cyan-400 to-blue-500"     },
];
