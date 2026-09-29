"use strict";
/* Given a range [a, b] (where a <= b), return an array of all even numbers in that range in ascending order.

Input Format
    a: Start of range
    b: End of range

Output Format
    Array of even numbers.

Example
    Input:  a = 3, b = 8
    Output: [4, 6, 8]


=> This is a straightforward range + even-number filtering problem. An even number is divisible by 2, so number % 2 === 0 is the check.

=> Use the for loop to output even numbers from 2 to 10.

*/
Object.defineProperty(exports, "__esModule", { value: true });
// function printEvens(a, b) {}
function getEvenNumbers(a, b) {
    // const evenNumbers = [];
    const evenNumbers = [];
    // Here, always b is large number and a small number, so do not handle a > b
    // for (let i = a; i <= b; i++) {
    //   if (i % 2 === 0) {
    //     evenNumbers.push(i);
    //   }
    // }
    /* let i = a;
  
    while (i <= b) {
      if (i % 2 === 0) {
        evenNumbers.push(i);
      }
  
      i++;
    } */
    // More efficient loop
    // Instead of checking every number, find the first even number and then increase by 2.
    let start = a;
    // if (start % 2 !== 0) {
    // Here, 1 === -1 -> false. It gives wrong logic with negative number.
    // if (start % 2 === 1) {
    // if (Math.abs(start) % 2 === 1) {
    // Bitwise Operations
    // Even numbers always end in 0 in binary. 0 & 1 equals 0 (falsy).
    // Positive or Negative odd numbers always end in 1 in binary. 1 & 1 equals 1 (truthy).
    // 3 -> 101 - 001 => 001
    // if (start + 1 !== 0) {
    if (start + 1) {
        start++;
    }
    for (let i = start; i <= b; i = i + 2) {
        evenNumbers.push(i);
    }
    //   while (start <= b) {
    //     evenNumbers.push(start);
    //     start += 2;
    //   }
    return evenNumbers;
    //   const numbers = Array.from({ length: b - a + 1 }, (_, index) => a + index);
    //   return numbers.filter((number) => number % 2 === 0);
}
console.log(getEvenNumbers(3, 8)); // [4, 6, 8]
console.log(getEvenNumbers(4, 4)); // [4]
console.log(getEvenNumbers(5, 5)); // []
console.log(getEvenNumbers(-5, 5)); // [ -4, -2, 0, 2, 4 ]
console.log(getEvenNumbers(9, 1)); // []
//# sourceMappingURL=1.Print_Even_Numbers.js.map