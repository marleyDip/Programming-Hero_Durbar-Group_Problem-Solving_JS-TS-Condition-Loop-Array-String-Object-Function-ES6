"use strict";
/* Given an array of daily rainfall measurements, find all the "peak" days.

A day is considered a peak if its rainfall is strictly higher than both its immediate left (previous day) and right (next day) neighbors.

Because the first and last days do not have both neighbors, they can never be peaks.

Return an array of the 1-based day numbers (i.e., the first day is day 1, the second is day 2, etc.) that are peaks, in chronological order.

findRainfallPeaks([2, 5, 3, 3, 7, 4, 4, 6]) should return [2, 5] because:

    => Day 2 (value 5) is strictly greater than Day 1 (2) and Day 3 (3).
    
    => Day 5 (value 7) is strictly greater than Day 4 (3) and Day 6 (4).
    
    => Day 8 (value 6) only has a left neighbor, so it cannot be a peak.

    Hint 1. Remember that the array indices in JavaScript are 0-based, but the problem asks for 1-based day numbers. You can convert an index `i` to a day number by adding 1.
    
    Hint 2. Since the first and last elements cannot be peaks, your loop can start at index `1` and end at `rainfall.length - 2`.
    
    Hint 3. Use a strict inequality (`>`) to compare the current day's rainfall with both neighbors.

*/
Object.defineProperty(exports, "__esModule", { value: true });
// function findPeakDays(rainfall) {}
// Basic For loop
function findRainfallPeaks(rainfall) {
    const peaks = [];
    for (let i = 1; i < rainfall.length - 1; i++) {
        const current = rainfall[i];
        const previous = rainfall[i - 1];
        const next = rainfall[i + 1];
        if (current !== undefined &&
            previous !== undefined &&
            next !== undefined &&
            current > previous &&
            current > next) {
            peaks.push(i + 1); // Convert 0-based index to 1-based day
        }
    }
    return peaks;
    // Complexity
    // Time: O(n) — each relevant day is checked once.
    // Space: O(k) — where k is the number of peak days returned.
    // Extra working space: O(1) apart from the output array.
}
// using forEach() and for...of
/* function findRainfallPeaks(rainfall: number[]): number[] {
  const peaks: number[] = [];

  // Looping with destructuring
  // for (const [index, value] of rainfall.entries()){}

  // using forEach()
  rainfall.forEach((value, index) => {
    if (
      index > 0 &&
      index < rainfall.length - 1 &&
      value > rainfall[index - 1]! &&
      value > rainfall[index + 1]!
    ) {
      peaks.push(index + 1);
    }
  });

  return peaks;
} */
// using reduce(), filter(), map()
/* function findRainfallPeaks(rainfall: number[]): number[] {
  // Using filter() and map()
  return rainfall
    .map((_, index) => index)
    .filter((index) => {
      if (index === 0 && index === rainfall.length - 1) {
        return false;
      }

      return (
        rainfall[index]! > rainfall[index - 1]! &&
        rainfall[index]! > rainfall[index + 1]!
      );
    })
    .map((index) => index + 1);

  // Using reduce()
  return rainfall.reduce((peaks, value, index) => {
    if (
      index > 0 &&
      index < rainfall.length - 1 &&
      value > rainfall[index + 1]! &&
      value > rainfall[index + 1]!
    ) {
      peaks.push(index + 1);
    }

    return peaks;
  }, [] as number[]);
} */
console.log(findRainfallPeaks([2, 5, 3, 3, 7, 4, 4, 6])); // [2, 5]
console.log(findRainfallPeaks([1, 2, 3, 2, 1])); // [3]
console.log(findRainfallPeaks([])); // []
console.log(findRainfallPeaks([10])); // []
console.log(findRainfallPeaks([10, 20])); // []
console.log(findRainfallPeaks([10, 30, 20])); // [2]
console.log(findRainfallPeaks([10, 20, 15, 25, 18, 30, 10])); // [2, 4, 6]
console.log(findRainfallPeaks([10, 20, 20, 10])); // []
//# sourceMappingURL=Rainfall_Peaks.js.map