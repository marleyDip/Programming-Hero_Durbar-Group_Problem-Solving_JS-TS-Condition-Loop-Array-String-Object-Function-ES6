/* Given two integers a and b, return the integer quotient of a / b (truncate towards zero).

Input Format
a: Dividend (integer)
b: Divisor (non-zero integer)

Output Format
Return Math.trunc(a / b).

Example
Input:  a = 7, b = 2
Output: 3

Input:  a = -7, b = 2
Output: -3
*/

// Positive numbers
Math.trunc(4.9); // 4
Math.trunc(4.1); // 4

// Negative numbers
Math.trunc(-4.9); // -4
Math.trunc(-4.1); // -4

// Integers remain unchanged
Math.trunc(5); // 5

// Non-Numeric Inputs
// Numeric strings are converted to numbers and truncated. Non-numeric strings return NaN.
const example1: number = Math.trunc("420.56" as unknown as number); // 420
const example2: number = Math.trunc("apple" as unknown as number); // NaN
const example3: number = Math.trunc(null as unknown as number); // 0
const example4: number = Math.trunc(false as unknown as number); // 0
const example5: number = Math.trunc(true as unknown as number); // 1
const example6: number = Math.trunc(undefined as unknown as number); // NaN

console.log(example1, example2, example3, example4, example5, example6);

// function integerDivide(a: number, b: number) {}

function integerQuotient(a: number, b: number): number {
  // return Math.trunc(a / b);
  // return parseInt(String(a / b));

  // Bitwise OR (|) Operator
  // JavaScript converts both operands to 32-bit signed integers before doing the bitwise operation.
  // return (a / b) | 0;

  const result = a / b;
  // return result;

  if (result < 0) {
    return Math.ceil(result);
  }

  return Math.floor(result);
}

console.log(integerQuotient(7, 2)); // 3

console.log(integerQuotient(-7, 2)); // -3

console.log(integerQuotient(7, -2)); // -3

console.log(integerQuotient(-7, -2)); // 3

console.log(integerQuotient(0, 5)); // 0

console.log(5 | 3); // 7
