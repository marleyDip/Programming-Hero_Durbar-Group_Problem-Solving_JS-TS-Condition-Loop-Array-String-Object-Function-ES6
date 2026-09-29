"use strict";
/* Given three integers a, b, and c, return (a * b) % c.

Input Format
a, b: Integers to multiply
c: Modulus (positive integer)

Output Format
Return (a * b) % c.

Example
Input:  a = 5, b = 3, c = 7
Output: 1

5 × 3 = 15, 15 % 7 = 1.

*/
Object.defineProperty(exports, "__esModule", { value: true });
// function multiplyMod(a, b, c) {}
function multiplyModulo(a, b, c) {
    return (a * b) % c;
    const product = a * b;
    // const reminder = product % c;
    // return reminder;
    // const quotient = Math.trunc(product / c);
    // return product - quotient * c;
    // If it instead expects a mathematical modulo that is always between 0 and c - 1, you'd use: it will work for negative integer
    // return (((a * b) % c) + c) % c;
}
console.log(multiplyModulo(5, 3, 7)); // 1
console.log(multiplyModulo(-5, 3, 7)); // 1
//# sourceMappingURL=6.A_multiply_B_mod_C.js.map