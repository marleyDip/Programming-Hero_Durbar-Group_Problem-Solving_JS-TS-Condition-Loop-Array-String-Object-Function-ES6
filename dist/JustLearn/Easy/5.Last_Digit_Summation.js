"use strict";
/* Given two non-negative integers a and b, return the sum of their last digits.

Input Format
a: Non-negative integer
b: Non-negative integer

Output Format
Return Sum of Last digits of a, b.

Example
Input:  a = 123, b = 456
Output: 9

Last digit of 123 is 3, last digit of 456 is 6. Sum = 9.

*/
Object.defineProperty(exports, "__esModule", { value: true });
// function lastDigitSum(a: number, b: number): number {}
function sumLastDigits(a, b) {
    // The remainder after dividing by 10 is always the last digit.
    // return (a % 10) + (b % 10);
    // const lastDigitA = a % 10;
    // const lastDigitB = b % 10;
    // const lastDigitA = Number(String(a).slice(-1));
    // const lastDigitB = Number(String(b).slice(-1));
    // const lastDigitA = Number(String(a).charAt(String(a).length - 1));
    // const lastDigitB = Number(String(b).charAt(String(a).length - 1));
    // old way,array indexing
    // const lastDigitA = Number(String(a)[String(a).length - 1]);
    // const lastDigitB = Number(String(b)[String(a).length - 1]);
    // at() new feature ES2022
    // const lastDigitA = Number(String(a).at(-1));
    // const lastDigitB = Number(String(b).at(-1));
    // const lastDigitA = a - Math.floor(a / 10) * 10;
    // const lastDigitB = b - Math.floor(b / 10) * 10;
    const lastDigitA = a - Math.trunc(a / 10) * 10;
    const lastDigitB = b - Math.trunc(b / 10) * 10;
    return lastDigitA + lastDigitB;
}
console.log("Me".slice(-1)); // e
console.log(sumLastDigits(123, 456)); // 9
console.log(sumLastDigits(3, 6)); // 9
console.log(sumLastDigits(100, 200)); // 0
console.log(sumLastDigits(120, 256)); // 6
//# sourceMappingURL=5.Last_Digit_Summation.js.map