"use strict";
/* Write a function mergeSortedArrays that takes two arrays of numbers, each already sorted in ascending order, and merges them into a single sorted array.

Your solution should take advantage of the fact that both input arrays are already sorted.

*/
Object.defineProperty(exports, "__esModule", { value: true });
// Using Two-Pointer Technique
/* function mergeSortedArrays(arr1: number[], arr2: number[]): number[] {
  const result: number[] = [];
  let i = 0;
  let j = 0;

  while (i < arr1.length && j < arr2.length) {
    // non-null assertion operator (!)
    // if (arr1[i]! <= arr2[j]!) {
    //   result.push(arr1[i]!);
    //   i++;
    // } else {
    //   result.push(arr2[j]!);
    //   j++;
    // }

    // Using Nullish Coalescing Operator (??)
    // if ((arr1[i] ?? 0) <= (arr2[j] ?? 0)) {
    //   result.push(arr1[i] ?? 0);
    //   i++;
    // } else {
    //   result.push(arr2[j] ?? 0);
    //   j++;
    // }

    // Use local variables (Clean and Safe)
    const num1 = arr1[i];
    const num2 = arr2[j];

    if (num1 !== undefined && num2 !== undefined) {
      if (num1 <= num2) {
        result.push(num1);
        i++; // It returns the current value of i first, then increments it by one.
      } else {
        result.push(num2);
        j++;
      }
    }
  }

  // Add remaining elements from arr1
  while (i < arr1.length) {
    // result.push(arr1[i]!);
    // result.push(arr1[i] ?? 0);

    const num = arr1[i];
    if (num !== undefined) result.push(num);
    i++;
  }

  // Add remaining elements from arr2
  while (j < arr2.length) {
    // result.push(arr2[j]!);
    // result.push(arr2[j] ?? 0);

    const num = arr2[j];
    if (num !== undefined) result.push(num);
    j++;
  }

  // return result.concat(arr1.slice(i), arr2.slice(j));

  return result;

  // Complexity
  // Time complexity: O(n + m) — each element is processed once, where n and m are the lengths of the two arrays.
  // Space complexity: O(n + m) — the result array stores all elements.
} */
// Using concat() or spread operator + sort()
function mergeSortedArrays(arr1, arr2) {
    // JavaScript's default sort() compares values as strings.
    return arr1.concat(arr2).sort((a, b) => a - b);
    // return [...arr1, ...arr2].sort((a, b) => b - a);
    // Complexity
    // Time complexity: O((n + m)log(n + m))
    // Space complexity: O(n + m)
}
console.log(mergeSortedArrays([1, 3, 5], [2, 4, 6])); // [1, 2, 3, 4, 5, 6]
console.log(mergeSortedArrays([1, 2, 3], [4, 5, 6])); // [1, 2, 3, 4, 5, 6]
console.log(mergeSortedArrays([], [1, 2, 3])); // [1, 2, 3]
console.log(mergeSortedArrays([1, 2, 3], [])); // [1, 2, 3]
console.log(mergeSortedArrays([], [])); // []
console.log(mergeSortedArrays([1, 1, 3], [1, 2, 2])); // [1, 1, 1, 2, 2, 3]
console.log(mergeSortedArrays([-5, -2, 0], [-3, 1, 4])); // [-5, -3, -2, 0, 1, 4]
//# sourceMappingURL=Merge_Two_Sorted_Arrays.js.map