/* Given two integers a, b and a character operator op. If op is "+", return a + b. If op is "-", return a - b.

Input Format
a: An integer
b: An integer
op: A string "+" or "-"

Output Format
Result of calculation.

Example
Input:  a = 10, b = 3, op = "-"
Output: 7

*/

// function calculate(a: number, b: number, op: string): number {

function addOrSubtract(a: number, b: number, op: string): number {
  //   if (op === "+") {
  //     return a + b;
  //   } else {
  //     return a - b;
  //   }

  //   if (op === "-") {
  //     return a - b;
  //   }

  //   return a + b;

  // return op === "+" ? a + b : a - b;

  // Using an object to map a key to a function.
  // operator → function
  // Every value in this object must be a function that takes two numbers and returns a number.
  const operations: {
    // Here, allows any string as a key.
    [key: string]: (a: number, b: number) => number;

    // "+": (a: number, b: number) => number;
    //"-": (a: number, b: number) => number;
  } = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
  };

  // This is bracket notation for accessing an object property dynamically and (a, b) calls the function
  return operations[op]!(a, b);

  //   const operation = operations[op];
  //   if (!operation) {
  //     throw new Error(`Unsupported operator: ${op}`);
  //   }

  //   return operation(a, b);

  // Using boolean logic
  // It has problems when the addition result is 0, because JavaScript treats 0 as falsy.
  // return (op === "+" && a + b) || a - b;
}

console.log(addOrSubtract(5, -5, "+"));
console.log(addOrSubtract(0, 0, "+"));

console.log(addOrSubtract(10, 3, "+"));
console.log(addOrSubtract(10, 3, "-"));

console.log(addOrSubtract(-10, 3, "+"));
console.log(addOrSubtract(-10, -3, "-"));
