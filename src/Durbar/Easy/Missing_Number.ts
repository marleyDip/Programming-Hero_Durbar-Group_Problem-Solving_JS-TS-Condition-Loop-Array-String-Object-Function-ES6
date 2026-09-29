/* Given an array nums containing n distinct numbers taken from the range [0, n], return the only number in the range that is missing from the array.

Input: nums = [3,0,1]

Output: 2

Explanation: n = 3 since there are 3 numbers. The range is [0, 3]. 2 is missing.

    Hint 1. The sum of integers from 0 to n can be computed using the formula n * (n + 1) / 2.
    
    Hint 2. Compare the expected sum of all numbers from 0 to n with the actual sum of elements in the array.

Solution: 

    if [3, 0, 1] => n (length of array) = 3

    Expected: 0 + 1 + 2 + 3 = 6
    Actual: 3 + 0 + 1 = 4
    Missing: 6 - 4 = 2

Complexity
Time: O(n) — we loop through the array once.
Space: O(1) — we only use a few variables.

This is generally preferable to sorting or creating another array because it keeps the solution linear time and constant space.

const nums = [3, 0, 1]

let unique = 0;
for (let num of nums) {
  unique = unique ^ num;
  // Start: unique = 0
  // Loop 1 (num = 3): 0 ^ 3 -> 3 (Anything XORed with 0 is itself)
  // Loop 2 (num = 0): 3 ^ 0 -> 3
  // Loop 3 (num = 1): 3 ^ 1 -> 2 (Binary: 11 ^ 01 = 10)
}

return unique;
// Conceptually: 3 ^ 0 ^ 1 => 2

===
XOR

Bit manipulation means working directly with the binary bits (0s and 1s) of a number.

In JavaScript, bitwise operators treat numbers as 32-bit signed integers.

  Key Properties of XOR
  XOR has specific algebraic properties that make it incredibly useful for logic and algorithms:

    => XOR with 0 (X ^ 0 = X)
    => XOR with self (X ^ X = 0)
    => Commutative & Associative (A ^ B ^ C is the same as C ^ B ^ A)
    => A ^ B ^ A = B

XOR stands for Exclusive OR. A bit results in 1 only if one operand has a 1 and the other has a 0.

Example: 5 ^ 3

Under the hood (in binary): Same bits → 0 & Different bits → 1

  5 in binary:  0 0 0 0 0 1 0 1 
  3 in binary:  0 0 0 0 0 0 1 1
  -----------------------------
  5 ^ 3 (XOR):  0 0 0 0 0 1 1 0  => Which is 6 in decimal


Bit Toggling: X ^ 1 flips a bit (0 becomes 1, and 1 becomes 0)
=> 0 ^ 1 = 1, 1 ^ 1 = 0

=========
new Set()

In JavaScript, new Set() creates a Set object, which is a collection of unique values.
  => set.add(value), set.has(value), set.delete(value), set.clear(), set.size 
*/

// Sum Formula - Using a for loop to calculate the expected sum of 0 through n, then subtract the actual sum.
/* function missingNumber(nums: number[]): number {
  const num = nums.length;

   // Calculate expected sum of numbers from 0 to n
  const expectedSum = (num * (num + 1)) / 2; 

  let actualSum = 0;

  for (let i = 0; i < nums.length; i++) {
    actualSum += nums[i] ?? 0;
  }

  // Calculate the actual sum of the elements in the array
  // const actualSum = nums.reduce((sum, currentNumber) = => sum + currentNumber, 0);

  // Here, [3, 0, 1] -> num = 3
  // Expected: 0 + 1 + 2 + 3 = 6; (3 * (3 + 1)) / 2 => 6
  // Actual: 3 + 0 + 1 = 4; index 0 to index 2 -> 0 + 3, 3 + 0, 3 + 1 => 4
  // Missing: 6 - 4 = 2

  // Complexity
  // Time: O(n) -> loop through the array once (linear time).
  // Space: O(1) -> Only uses a few variables for tracking sums (constant space).

  // The difference is the missing number
  return expectedSum - actualSum;
} */

// XOR With Two Separate Loops - bit-manipulation
//  Rule => Same bits -> 0 (0 + 0 = 0), Different bits → 1 (0 + 1 = 1)
// Property => x ^ x === 0 and x ^ 0 === x and x ^ y ^ x === y
/* function missingNumber(nums: number[]): number {
  const n = nums.length;

  let expectedXor = 0;
  let actualXor = 0;

  // if nums = [0, 1]
  for (let i = 0; i <= n; i++) {
    expectedXor ^= i; // Shorthand for expectedXor = expectedXor ^ i

    // 0 ^ 0 = 0, 0 ^ 1 = 1, 1 ^ 2 = 3 (01 + 10 = 11)
  }

  for (let i = 0; i < nums.length; i++) {
    actualXor ^= nums[i] ?? 0;

    // 0 ^ 0 = 0, 0 ^ 1 = 1
  }
    
  for (let num of nums) {
    actualXor ^= num;

    // 0 ^ 0 = 0, 0 ^ 1 = 1
  }

  return expectedXor ^ actualXor;
  // 3 ^ 1 = 2 (11 + 01 = 10)
  // 0 ^ 1 ^ 2 ^ 0 ^ 1 => 2

  // Complexity
  // Time: O(n);
  // Space: O(1);
} */

function missingNumber(nums: number[]): number {
  // if nums = [3, 0, 1]

  let result = nums.length;

  for (let i = 0; i < nums.length; i++) {
    result ^= i; // 3 ^ 0 = 3, 0 ^ 1 = 1, 1 ^ 2 = 3 (01 + 10 = 11)
    result ^= nums[i] ?? 0; // 3 ^ 3 = 0, 1 ^ 0 = 1, 3 ^ 1 = 2 (11 + 01 = 10)
  }

  return result;
  // Conceptually: 3 ^ 0 ^ 3 ^ 1 ^ 0 ^ 2 ^ 1 => (0^0)^(1^1)^(3^3)^2 = 0^0^0^2 = 2

  const num = nums.length;
  let res = num;

  for (let i = 0; i < num; i++) {
    res = res ^ i ^ (nums[i] ?? 0); // XOR the index and the value
  }

  return res;
}

// Brute Force — Nested Loop
/* function missingNumber(nums: number[]) {
  const num = nums.length;

  // if [3, 0, 1]
  for (let i = 0; i <= num; i++) {
    let found = false;

    // i = 0, 3 !== 0, 0 === 0
    // i = 1, 3 !== 1, 0 !== 1, 1 === 1
    // i = 2, 3 !== 2, 0 !== 2, 1 !== 2
    // return 2
    for (let j = 0; j < nums.length; j++) {
      if (nums[j] === i) {
        found = true;
        break;
      }
    }

    if (!found) {
      return i;
    }
  }

  // Complexity
  // Time: O(n²) => loop through the array inside another array (Quadratic Time)
  // Space: O(1)
  // This is useful for understanding the problem, but not efficient for large arrays.
} */

// Alternative to Nested Loop - Using includes()
/* function missingNumber(nums: number[]) {
  const n = nums.length;

  for (let i = 0; i <= n; i++) {
    if (!nums.includes(i)) {
      return i;
    }
  }

  // Complexity
  // includes() takes O(n) in the worst case, and we call it n + 1 times.
  // Time: O(n²)
  // Space: O(1)
} */

// Using a Set - This is much faster than the nested-loop approach but uses additional memory.
/* function missingNumber(nums: number[]) {
  const set = new Set(nums);
  // console.log(set); // Set(3) { 3, 0, 1 }

  for (let i = 0; i <= nums.length; i++) {
    if (!set.has(i)) {
      return i;
    }
  }

  // Complexity:
  // Time: O(n)
  // Space: O(n)
} */

// Using an Object - manually create a lookup table. It is alternative to new Set()
/* function missingNumber(nums: number[]) {
  const lookup: Record<number, true> = {};

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];

    if (num !== undefined) {
      lookup[num] = true;
    }
  }

  // console.log(lookup); // { '0': true, '1': true, '3': true }

  for (let i = 0; i <= nums.length; i++) {
    if (!lookup[i]) {
      return i;
    }
  }

  // Complexity
  // Time: O(n)
  // Space: O(n)
} */

// Using an Array as a Lookup Table
/* function missingNumber(nums: number[]) {
  const seen: boolean[] = new Array(nums.length + 1).fill(false);
  // console.log(seen); // [ false, false, false, false ]

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];

    if (num !== undefined) {
      seen[num] = true;
    }
  }

  // console.log(seen); // [ true, true, false, true ]

  for (let i = 0; i <= nums.length; i++) {
    if (!seen[i]) {
      return i;
    }
  }

  // Complexity
  // Time: O(n)
  // Space: O(n)
} */

console.log(missingNumber([3, 0, 1])); // 2

console.log(missingNumber([0, 1])); // 2

console.log(missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1])); // 8

console.log(missingNumber([0])); // 1
