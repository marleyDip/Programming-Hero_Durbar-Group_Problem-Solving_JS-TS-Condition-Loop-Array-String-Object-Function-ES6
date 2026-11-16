"use strict";
/* Given an unsorted array of integers, group consecutive numbers into ranges. The output should be an array of strings, where each string represents a range. If a range consists of a single number, the string should just be that number. If it consists of multiple numbers, the string should be in the format 'start-end'.

Examples:

    Input: numbers = [1,2,3,7,8]
    Output: ["1-3","7-8"]

    Input: numbers = [10,1,2,5,6,7]
    Output: ["1-2","5-7","10"]

Topics: array, sorting, ranges, easy

*/
Object.defineProperty(exports, "__esModule", { value: true });
/* Important concepts to understand:

    1. start remembers where the current range begins.
    2. end remembers the last consecutive number.
    3. current === end + 1 means the range continues.
    4. Otherwise, save the previous range and start a new one.
*/
// Complexity analysis
// - Time: O(n log n) — Sorting takes O(n log n), and iterating takes O(n).
// - Space: O(n) — The sorted copy and result array require additional space.
function groupConsecutiveRanges(numbers) {
    // Remove duplicates and sort numerically (a copy, so the input isn't mutated)
    const sorted = [...new Set(numbers)].sort((a, b) => a - b);
    // console.log(sorted);
    const result = [];
    let start = null;
    let prev = null;
    const formatRange = (from, to) => from === to ? `${from}` : `${from}-${to}`;
    for (const num of sorted) {
        if (start === null || prev === null) {
            // First number: open the first range
            start = num;
            prev = num;
        }
        else if (num === prev + 1) {
            // Still consecutive: extend the current range
            prev = num;
        }
        else {
            // Gap found: close the current range and open a new one
            result.push(formatRange(start, prev));
            start = num;
            prev = num;
        }
    }
    // Close the last open range (nothing to close for an empty array)
    if (start !== null && prev !== null) {
        result.push(formatRange(start, prev));
    }
    return result;
}
/* Trace with [5, 1, 2, 3, 10, 10, 11, 7]

Sorted and deduplicated: [1, 2, 3, 5, 7, 10, 11]

num	Action	start	prev	result
1	open range	1	1	[]
2	consecutive	1	2	[]
3	consecutive	1	3	[]
5	gap, push "1-3"	5	5	["1-3"]
7	gap, push "5"	7	7	["1-3", "5"]
10	gap, push "7"	10	10	["1-3", "5", "7"]
11	consecutive	10	11	same
end	flush "10-11"			["1-3", "5", "7", "10-11"] */
/* function groupConsecutiveRanges(numbers: number[]): string[] {
  if (numbers.length === 0) {
    return [];
  }

  // Step 1: Sort numbers in ascending order
  const sorted = [...numbers].sort((a, b) => a - b);
  // console.log(sorted); // [ 1, 2, 5, 6, 7, 10 ]

  const result: string[] = [];

  let start = sorted[0]!;
  // console.log(start); // 1

  let end = sorted[0]!;
  // console.log(end); // 1

  // Step 2: Check each number
  for (let i = 1; i < sorted.length; i++) {
    const current = sorted[i]!;

    // Check if the current number is consecutive
    if (current === end + 1) {
      end = current;
    } else if (current === end) {
      // Ignore duplicate numbers
      continue;
    } else {
      // Save the previous range
      result.push(start === end ? `${start}` : `${start}-${end}`);

      // Start a new range
      start = current;
      end = current;
    }
  }

  // Step 3: Save the last range
  result.push(start === end ? `${start}` : `${start}-${end}`);

  return result;
} */
/* Input: [5, 1, 3, 2, 8, 7, 10, 10]

After sorting: [1, 2, 3, 5, 7, 8, 10, 10]

Current	Condition	Start	End	Result
1 -	Initial -	1 -	1 -	[]
2	Consecutive	1	2	[]
3	Consecutive	1	3	[]
5	Break	5	5	["1-3"]
7	Break	7	7	["1-3", "5"]
8	Consecutive	7	8	["1-3", "5"]
10	Break	10	10	["1-3", "5", "7-8"]
10	Duplicate	10	10	["1-3", "5", "7-8"]

Final output: ["1-3", "5", "7-8", "10"] */
console.log(groupConsecutiveRanges([1, 2, 3, 7, 8])); // ["1-3", "7-8"]
console.log(groupConsecutiveRanges([10, 1, 2, 5, 6, 7])); // ["1-2", "5-7", "10"]
console.log(groupConsecutiveRanges([5, 1, 3, 2, 8, 7, 10, 10])); // ["1-3", "5", "7-8", "10"]
console.log(groupConsecutiveRanges([1])); // ["1"]
console.log(groupConsecutiveRanges([1, 2, 3, 4])); // ["1-4"]
console.log(groupConsecutiveRanges([1, 3, 5, 7])); // ["1", "3", "5", "7"]
console.log(groupConsecutiveRanges([10, 9, 8, 2, 1])); // ["1-2", "8-10"]
console.log(groupConsecutiveRanges([1, 1, 2, 2, 3])); // ["1-3"]
console.log(groupConsecutiveRanges([5, 1, 2, 3, 10, 11, 7])); // ["1-3", "5", "7", "10-11"]
console.log(groupConsecutiveRanges([4, 2, 1, 3])); // ["1-4"]
console.log(groupConsecutiveRanges([8])); // ["8"]
console.log(groupConsecutiveRanges([1, 1, 2, 2, 3])); // ["1-3"]
console.log(groupConsecutiveRanges([])); // []
//# sourceMappingURL=Group_Consecutive_Numbers_into_Ranges.js.map