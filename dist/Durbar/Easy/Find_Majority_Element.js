"use strict";
/* Given an array of numbers, find the majority element. The majority element is defined as the element that appears more than n / 2 times, where n is the array's length. If no such element exists, return null.

Examples:
    Input: nums = [3,2,3]
    Output: 3

    Input: nums = [2,2,1,1,1,2,2]
    Output: 2

Topics: Arrays, Hash Map, Frequency Counter

You can solve this problem using a frequency counter (object) + for loop.

*/
Object.defineProperty(exports, "__esModule", { value: true });
// Complexity analysis
// - Time: O(n) — Two loops through the frequency data.
// - Space: O(n) — Frequency object stores distinct numbers.
// Using an object
function findMajorityElement(nums) {
    // Record<Keys, Type> Here property keys are Keys and property values are Type
    const frequency = {};
    // Step 1: Count occurrences of each number
    /* for (let i = 0; i < nums.length; i++) {
      const num = nums[i];
      if (num === undefined) continue;
  
      frequency[num] = (frequency[num] || 0) + 1;
    } */
    for (const num of nums) {
        frequency[num] = (frequency[num] ?? 0) + 1;
        // Check majority immediately after counting
        // if (frequency[num] > nums.length / 2) {
        //   return num;
        // }
    }
    // console.log(frequency);
    // Step 2: Find the majority element
    for (const key in frequency) {
        if ((frequency[key] ?? 0) > nums.length / 2) {
            return Number(key);
        }
    }
    return null;
}
// Using new Map()
/* function findMajorityElement(nums: number[]): number | null {
  const frequency = new Map<number, number>();
  const threshold = nums.length / 2;

  for (const num of nums) {
    const count = (frequency.get(num) ?? 0) + 1;
    frequency.set(num, count);

    if (count > threshold) {
      return num;
    }
  }

  return null;
} */
// Complexity analysis
// - Time: O(n)
// - Extra Space: O(1)
// Using Boyer-Moore Voting Algorithm
/* function findMajorityElement(nums: number[]): number | null {
  let candidate: number | null = null;
  let count = 0;

  // Step 1: Find a possible majority candidate
  // [2, 2, 1, 1, 1, 2, 2]
  for (let i = 0; i < nums.length; i++) {
    if (count === 0) {
      candidate = nums[i] ?? null;
    }

    //    Number	Candidate	Count	Explanation
    //     2	2	1	First candidate
    //     2	2	2	Same number, +1
    //     1	2	1	Different number, -1
    //     1	2	0	Different number, -1
    //     1	1	1	Count was 0, new candidate
    //     2	1	0	Different number, -1
    //     2	2	1	Count was 0, new candidate

    //     Final candidate: 2.

    if (nums[i] === candidate) {
      count++;
    } else {
      count--;
    }
  }

  // Step 2: Verify the candidate
  let frequency = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === candidate) {
      frequency++;
    }
  }

  if (frequency > nums.length / 2) {
    return candidate;
  }

  return null;
} */
/* function findMajorityElement(nums: number[]): number | null {
  let candidate: number | null = null;
  let count = 0;

  // Pass 1: find a possible majority candidate
  for (const num of nums) {
    if (count === 0) {
      candidate = num;
    }

    count += num === candidate ? 1 : -1;
  }

  // Pass 2: verify it, since a candidate isn't guaranteed to be a majority
  if (candidate === null) return null;

  let occurrences = 0;
  for (const num of nums) {
    if (num === candidate) occurrences++;
  }

  return occurrences > nums.length / 2 ? candidate : null;
} */
console.log(findMajorityElement([3, 2, 3])); // 3
console.log(findMajorityElement([2, 2, 1, 1, 1, 2, 2])); // 2
console.log(findMajorityElement([2, 2, 1, 2, 3, 2, 2])); // 2
console.log(findMajorityElement([3, 3, 4, 2, 3, 3, 3])); // 3
console.log(findMajorityElement([1, 2, 3, 4])); // null
console.log(findMajorityElement([1, 1, 2, 2])); // null
console.log(findMajorityElement([5])); // 5
console.log(findMajorityElement([])); // null
//# sourceMappingURL=Find_Majority_Element.js.map