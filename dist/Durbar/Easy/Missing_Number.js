"use strict";
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

*/
Object.defineProperty(exports, "__esModule", { value: true });
function missingNumber(nums) {
    const num = nums.length;
    const expectedSum = (num * (num + 1)) / 2;
    let actualSum = 0;
    for (let i = 0; i < nums.length; i++) {
        actualSum += nums[i] ?? 0;
    }
    // Here, [3, 0, 1] -> num = 3
    // Expected: 0 + 1 + 2 + 3 = 6; (3 * (3 + 1)) / 2 => 6
    // Actual: 3 + 0 + 1 = 4; index 0 to index 2 -> 0 + 3, 3 + 0, 3 + 1 => 4
    // Missing: 6 - 4 = 2
    // Complexity
    // Time: O(n) -> loop through the array once (linear time).
    // Space: O(1) -> only use a few variables (constant space).
    return expectedSum - actualSum;
}
console.log(missingNumber([3, 0, 1])); // 2
console.log(missingNumber([0, 1])); // 2
console.log(missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1])); // 8
console.log(missingNumber([0])); // 1
//# sourceMappingURL=Missing_Number.js.map