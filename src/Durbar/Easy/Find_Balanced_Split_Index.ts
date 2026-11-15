/* Given an array of numbers nums, find the first 0-based index i (where 0 <= i < nums.length - 1) such that the sum of elements from index 0 to i (inclusive) equals the sum of elements from index i + 1 to the end of the array.

If such an index exists, return i. If no valid split exists, return -1. Both halves must contain at least one element.

Examples:

    Input: nums = [1,5,2,4]
    Output: 1
    Explanation: At index 1, left sum is 1+5=6 and right sum is 2+4=6.

    Input: nums = [1,2,3,6]
    Output: 2
    Explanation: At index 2, left sum is 1+2+3=6 and right sum is 6.

    Input: nums = [1, 2, 3, 3]
    Output: -1
    Explanation: totalSum = 1 + 2 + 3 + 3 =>  9

    Compare left and right sums
    Index	Current Element	Left Sum	Right Sum	Balanced?
    0	1	1	8	No
    1	2	3	6	No
    2	3	6	3	No

Topics: array, prefix-sum

Hints:
    
    Hint 1. Calculate the total sum of the array first.
    
    Hint 2. Iterate through the array maintaining a running left sum and calculate the right sum as totalSum - leftSum.
    
    Hint 3. Make sure the split leaves at least one element on the right side.

Important concept to understand

The key formula is:
    Right Sum = Total Sum - Left Sum

Instead of calculating the right-side sum repeatedly, we calculate it using subtraction.
This avoids nested loops and gives you an efficient O(n) solution.

*/

// Complexity analysis
// - Time: O(n) — Two loops, each traversing the array.
// - Space: O(1) — Only two variables are used.

function findBalancedSplit(nums: number[]): number {
  // let totalSum = 0;

  // Step 1: Calculate the sum of all elements

  // Using for Loop
  /* for (let i = 0; i < nums.length; i++) {
    console.log("The number is", nums[i]);

    const previous = totalSum;

    // non-null assertion, if you're sure the index is valid
    totalSum += nums[i]!;
    console.log(`The total => ${nums[i]} + ${previous} = ${totalSum}`);
  } */

  // Using for...of Loop
  /* for (const num of nums) {
    const previous = totalSum;

    totalSum = totalSum + num;
    console.log(
      `Previous Total + Current Number = Total => ${previous} + ${num} = ${totalSum}`,
    );
  } */

  // Using entries()
  /* for (const [i, num] of nums.entries()) {
    console.log("The index", i);
    console.log("The value", num);

    totalSum += num;
    console.log(totalSum);
  } */

  // Using reduce()
  const totalSum = nums.reduce((sum, num) => sum + num, 0);

  let leftSum = 0;

  // Step 2: Find the balanced split
  for (let i = 0; i < nums.length - 1; i++) {
    leftSum += nums[i]!;

    const rightSum = totalSum - leftSum;

    if (leftSum === rightSum) {
      return i;
    }
  }

  return -1;
}

console.log(findBalancedSplit([1, 5, 2, 4])); // index 1
console.log(findBalancedSplit([1, 2, 3, 6])); // index 2

console.log(findBalancedSplit([1, 2, 3, 3, 3])); // 2
console.log(findBalancedSplit([1, 2, 3, 4])); // -1
console.log(findBalancedSplit([2, 2, 2, 2])); // 1
console.log(findBalancedSplit([5, 5])); // 0
console.log(findBalancedSplit([10])); // -1
console.log(findBalancedSplit([])); // -1
console.log(findBalancedSplit([0, 0, 0])); // 0
