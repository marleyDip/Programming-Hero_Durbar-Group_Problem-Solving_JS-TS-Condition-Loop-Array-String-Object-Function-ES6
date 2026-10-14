/* Given an array of numbers, return the length of the longest contiguous streak in which each number is strictly greater than the previous number.

If the input array is empty, return 0.

    Hint 1. Keep track of the current streak length and the maximum streak length seen so far.
    
    Hint 2. When iterating from index 1 to the end, compare `nums[i]` to `nums[i - 1]`. If it is strictly greater, increment the current streak count.
    
    Hint 3. If it is not greater, reset the current streak count back to 1.
*/

// Important: The numbers must be strictly increasing. If two adjacent numbers are equal, the streak resets to 1.

// Using for...of
/* function longestIncreasingStreak(nums: number[]): number {
  if (nums.length === 0) return 0;

  let current = 1;
  let longest = 1;
  let previous = nums[0]!;

  for (const num of nums.slice(1)) {
    if (num > previous) {
      current++;
    } else {
      current = 1;
    }

    longest = Math.max(longest, current);
    previous = num;
  }

  return longest;

  // Complexity analysis
  // Time complexity: O(n) — each element is visited once.
  // Auxiliary space: O(1) — only a few variables are used.
} */

// Using traditional for
function longestIncreasingStreak(nums: number[]): number {
  if (nums.length === 0) return 0;

  let currentStreak = 1;
  let longestStreak = 1;

  for (let i = 1; i < nums.length; i++) {
    // if (nums[i]! > nums[i - 1]!) {
    //   currentStreak++;
    // } else {
    //   currentStreak = 1;
    // }

    const current = nums[i];
    const previous = nums[i - 1];

    if (current === undefined || previous === undefined) {
      continue;
    }

    if (current > previous) {
      currentStreak++;
    } else {
      currentStreak = 1;
    }

    if (currentStreak > longestStreak) {
      longestStreak = currentStreak;
    }
  }

  return longestStreak;

  // Complexity analysis
  // Time complexity: O(n) — each element is visited once.
  // Auxiliary space: O(1) — only a few variables are used.
}

console.log(longestIncreasingStreak([1, 2, 3, 1, 2])); // => 3 (streak [1, 2, 3])

console.log(longestIncreasingStreak([5, 4, 3, 2, 1])); // => 1 (no adjacent element is strictly greater)

console.log(longestIncreasingStreak([])); // 0, Empty Array

console.log(longestIncreasingStreak([7])); // 1, One element

console.log(longestIncreasingStreak([1, 2, 3, 4])); // 4, Entire array increases

console.log(longestIncreasingStreak([4, 3, 2, 1])); // 1, No increasing adjacent pair

console.log(longestIncreasingStreak([1, 2, 2, 3])); // 2, Equal values break the streak

console.log(longestIncreasingStreak([1, 3, 2, 4, 5, 6])); // 4, [2, 4, 5, 6]
