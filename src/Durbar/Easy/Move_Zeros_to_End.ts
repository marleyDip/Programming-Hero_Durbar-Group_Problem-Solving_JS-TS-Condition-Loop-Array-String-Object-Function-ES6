/* Write a function moveZeros that takes an array of numbers and returns a new array with all 0s moved to the end while maintaining the relative order of all non-zero elements.

Examples:

    Input: nums = [0,1,0,3,12]
    Output: [1,3,12,0,0]
    Explanation: Moves the two zeros to the end while preserving the order of 1, 3, 12.

    Input: nums = [0,0,1]
    Output: [1,0,0]
    Explanation: Moves the two leading zeros to the end after 1.

Topics: arrays, two-pointers

Hints:

    Hint 1. Filter or collect all non-zero elements into a list first.

    Hint 2. Count how many zeros were present in the original array, and append that many zeros to the list.

*/

// Complexity analysis
// Let n be the array length.
// Time: O(n) - Two separate loops
// Space: O(n) - A new result array

// Using Two Pointers
function moveZeros(nums: number[]): number[] {
  // We create a copy of the original array. This ensures that our function returns a new array without modifying the input.
  const result = [...nums];

  let i = 0;

  for (let j = 0; j < result.length; j++) {
    if (result[j] !== 0) {
      result[i] = result[j]!;
      i++;
    }
  }

  // Fill remaining positions with zeros
  while (i < result.length) {
    result[i] = 0;
    i++;
  }

  return result;
}

/* result = [0, 1, 0, 3, 12]

i = 0;
j = 0;

Step-by-step execution:
j	result[j]	Action	i
0	0	Skip	0
1	1	Place at index 0	1
2	0	Skip	1
3	3	Place at index 1	2
4	12	Place at index 2	3

After the loop:
result = [1, 3, 12, 3, 12]
                   ↑  ↑
                   i

Now fill the remaining positions with zeros:
result = [1, 3, 12, 0, 0] */

// Using for loop
/* function moveZeros(nums: number[]): number[] {
  const result: number[] = [];
  let zeroCount = 0;

  // Step 1: Add all non-zero numbers
  //   for (let i = 0; i < nums.length; i++) {
  //     if (nums[i] !== 0) {
  //       result.push(nums[i]!);
  //     }
  //   }

  //   // Step 2: Add zeros at the end
  //   for (let i = 0; i < nums.length; i++) {
  //     if (nums[i] === 0) {
  //       result.push(0);
  //     }
  //   }

  for (const num of nums) {
    if (num === 0) {
      zeroCount++;
    } else {
      result.push(num);
    }
  }

  while (zeroCount > 0) {
    result.push(0);
    zeroCount--;
  }

  return result;
} */

console.log(moveZeros([0, 1, 0, 3, 12])); //  [1, 3, 12, 0, 0]
console.log(moveZeros([0, 0, 1])); //  [1, 0, 0]

console.log(moveZeros([0, 1, 0, 3, 12])); // [1, 3, 12, 0, 0]

console.log(moveZeros([0, 0, 1])); // [1, 0, 0]

console.log(moveZeros([1, 2, 3])); // [1, 2, 3]

console.log(moveZeros([0, 0, 0])); // [0, 0, 0]

console.log(moveZeros([])); // []

console.log(moveZeros([4, 0, -1, 0, 5])); // [4, -1, 5, 0, 0]
