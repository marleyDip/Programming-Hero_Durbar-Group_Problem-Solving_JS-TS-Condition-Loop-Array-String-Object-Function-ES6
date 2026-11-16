"use strict";
/* Write a function nextGreaterElement that takes an array of numbers nums and returns a new array where each element at index i is replaced by the first greater element appearing to its right in nums. If no element to the right is strictly greater than nums[i], use -1 instead.

Examples:

    Input: nums = [4,5,2,25]
    Output: [5,25,25,-1]
    Explanation: 4's next greater is 5; 5's is 25; 2's is 25; 25 has none, so -1.

    Input: nums = [13,7,6,12]
    Output: [-1,12,12,-1]
    Explanation: 13 has none (-1); 7 and 6 both have 12 as their next greater element; 12 has none (-1).

Topics: arrays, stack

Hints:

    Hint 1. You can solve this with a nested loop for an O(n^2) approach, or use a stack to process elements in linear O(n) time.
    
    Hint 2. When using a stack, keep track of indices whose next greater element has not yet been found.




Input - [4, 5, 2, 10, 8]

We check each element and search for the first greater element on its right.

    Current element	Elements to the right	First greater	Result
    4	5, 2, 10, 8	5	5
    5	2, 10, 8	10	10
    2	10, 8	10	10
    10	8	None	-1
    8	None	None	-1

Output - [5, 10, 10, -1, -1]

*/
Object.defineProperty(exports, "__esModule", { value: true });
// Complexity analysis
// Let n be the array length.
// Time - O(n²)
// Space - O(n)
// The nested loops can check multiple elements to the right for every element.
// Nested for loop
function nextGreaterElement(nums) {
    const result = [];
    for (let i = 0; i < nums.length; i++) {
        const current = nums[i];
        if (current === undefined)
            continue;
        // Initialize greater. We assume no greater element exists. If we find one, we update it.
        let greater = -1;
        // Start searching from the next index. (i + 1) we only need to search elements appearing to the right of the current element.
        for (let j = i + 1; j < nums.length; j++) {
            const candidate = nums[j];
            // Find the first greater element. > ensures the element is strictly greater. break stops searching immediately after finding the first greater element.
            if (candidate !== undefined && candidate > current) {
                greater = candidate;
                break;
            }
        }
        // for (let j = i + 1; j < nums.length; j++) {
        //   if (nums[j]! > nums[i]!) {
        //     greater = nums[j]!;
        //     break;
        //   }
        // }
        // Add the result
        result.push(greater);
    }
    return result;
}
// Using brute-force approach
/* function nextGreaterElement(nums: number[]): number[] {
  return nums.map((current, i) => {
    for (const candidate of nums.slice(i + 1)) {
      if (candidate > current) return candidate;
    }

    return -1;
  });
} */
/* Trace with [4, 5, 2, 25]
i	current	slice(i + 1)	What happens	Returned
0 -	4 -	[5, 2, 25] - 5 > 4, stop -	5
1	5	[2, 25]	2 > 5? no. 25 > 5? yes	25
2	2	[25]	25 > 2, stop	25
3	25	[]	loop never runs	-1 */
// A stack follows LIFO:
// - Last In
// - First Out
/* Remember these four steps
    1. Start from the right side of the array.
    2. Remove smaller or equal elements from the stack.
    3. The remaining stack's top is the next greater element.
    4. Push the current element into the stack. */
// Using Monotonic Stack
/* function nextGreaterElement(nums: number[]): number[] {
  const result: number[] = new Array(nums.length);
  // console.log(result); // [ <4 empty items> ] (length is 4)

  const stack: number[] = [];

  // [4, 5, 2, 25]
  for (let i = nums.length - 1; i >= 0; i--) {
    // Remove elements that are not greater, stack[stack.length - 1]; Read the top element
    // Remove stack top elements smaller than or equal to the current number
    // Remember: We remove elements that cannot possibly be the next greater element.

    // i = 3, 2, 1, 0
    // initially stack = []; [25]; [25, 2] -> after remove top element [25], [25, 5]
    // i = 2, 25 <= 2; i = 1, 2 <= 5; i = 0, 5 <= 4
    while (stack.length > 0 && stack[stack.length - 1]! <= nums[i]!) {
      stack.pop(); // Remove the top element
    }

    // Find the next greater element
    // result = [, , , -1]; [, , 25, -1], [, 25, 25, -1], [5, 25, 25, -1]
    result[i] = stack.length > 0 ? stack[stack.length - 1]! : -1;

    // Store current element for future comparisons
    // After finding the answer for the current element, we store it in the stack.
    // Because this current element might be the next greater element for another number to its left.

    // stack = [25], [25, 2] => remove 2 -> [25], [25, 5], [25, 5, 4]
    stack.push(nums[i]!); // Add an element
  }

  return result;
} */
// Complexity analysis
// Time: O(n) - Each element is pushed and popped at most once
// Space: O(n) - Stack and result array
// Using Monotonic Stack
/* function nextGreaterElement(nums: number[]): number[] {
  // Dynamic & Populated Arrays, Fill with a static value.
  //  Combine new Array(length) with .fill() to populate slots with a primitive value.
  const result: number[] = new Array(nums.length).fill(-1);
  // console.log(result); // [ -1, -1, -1, -1 ]

  const stack: { index: number; value: number }[] = [];

  // [4, 5, 2, 25]
  for (const [i, num] of nums.entries()) {
    //  A negative integer counts backward from the end of the collection. Passing -1 returns the last item, and -2 returns the second-to-last item.

    // 1st top = undefined; {index: 0, value: 4}, {index: 1, value: 5}, {index: 2, value: 2}
    let top = stack.at(-1);

    // Every smaller value waiting on the stack has just found its answer
    // i = 0, not enter; i = 1, 4 < 5; i = 2, 5 < 2, i = 3, 2 < 25 -> 5 < 25...finally top = undefined and exit loop
    while (top !== undefined && top.value < num) {
      // i = 1, [5, -1, -1, -1]; i = 3, [5, -1, 25, -1] -> [5, 25, 25, -1]
      result[top.index] = num;

      // [], [{index: 1, value: 5}], []
      stack.pop();

      // top = undefined, {index: 1, value: 5}, undefined
      top = stack.at(-1);
    }

    // 1st stack = [{index: 0, value: 4}]; [] -> [{index: 1, value: 5}]; [{index: 1, value: 5}, {index: 2, value: 2}]; [{index: 3, value: 25}]
    stack.push({ index: i, value: num });
  }

  return result;
} */
console.log(nextGreaterElement([4, 5, 2, 25])); // [5, 25, 25, -1]
console.log(nextGreaterElement([13, 7, 6, 12])); // [-1, 12, 12, -1]
console.log(nextGreaterElement([4, 5, 2, 10, 8])); // [5, 10, 10, -1, -1]
console.log(nextGreaterElement([1, 2, 3, 4])); // [2, 3, 4, -1]
console.log(nextGreaterElement([4, 3, 2, 1])); // [-1, -1, -1, -1]
console.log(nextGreaterElement([2, 2, 3])); // [3, 3, -1]
console.log(nextGreaterElement([])); // []
//# sourceMappingURL=Next_Greater_Element.js.map