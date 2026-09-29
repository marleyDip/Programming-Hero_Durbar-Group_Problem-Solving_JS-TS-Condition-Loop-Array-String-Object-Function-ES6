"use strict";
/* Return true if the union of arrays a and b contains every integer from 1 to n.

Input Format
a, b: Arrays of integers
n: Upper bound

Output Format
true or false.

Example
Input:  a=[1,3,5], b=[2,4], n=5
Output: true

Input:  a=[1,2], b=[4,5], n=5
Output: false  (3 is missing)


Combine the values from a and b, then check whether every number from 1 to n exists at least once.

*/
Object.defineProperty(exports, "__esModule", { value: true });
// function coverOneToN(a, b, n) {}
function containsAllNumbers(a, b, n) {
    // const numbers = [...a, ...b];
    //   return Array.from({ length: n }, (_, i) => i + 1).every((number) =>
    //     numbers.includes(number),
    //   );
    /* for (let i = 1; i <= n; i++) {
      if (!numbers.includes(i)) {
        return false;
      }
    }
  
    return true; */
    const numbers = new Set([...a, ...b]);
    /* const hasMissingNumber = Array.from({ length: n }, (_, i) => i + 1).some(
      (num) => !numbers.has(num),
    );
  
    return !hasMissingNumber; */
    const requiredNumbers = Array.from({ length: n }, (_, i) => i + 1);
    for (const number of requiredNumbers) {
        if (!numbers.has(number)) {
            return false;
        }
    }
    return true;
}
console.log(containsAllNumbers([1, 3], [2, 4], 4)); // true
console.log(containsAllNumbers([1, 2], [5, 4], 4)); // false
console.log(containsAllNumbers([1, 1, 2], [2, 3], 3)); // true
console.log(containsAllNumbers([1, 2, 3, 100], [4], 4)); // true
console.log(containsAllNumbers([1], [], 1)); // true
console.log([], [], 5); // false
//# sourceMappingURL=7.Cover_1_to_N.js.map