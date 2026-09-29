/* Given a positive integer n, return the sum of all integers from 1 to n.

Use the formula: n * (n + 1) / 2.

Input Format
n: Positive integer

Output Format
Return sum of 1 + 2 + ... + n.

Example
Input:  n = 5
Output: 15
1+2+3+4+5 = 15.

1 + 2 + 3 + ... + n
          ↓
      n(n + 1)
          ↓
          2

// Recursive
5 + sumToN(4)
    ↓
5 + 4 + sumToN(3)
    ↓
5 + 4 + 3 + sumToN(2)
    ↓
5 + 4 + 3 + 2 + sumToN(1)
    ↓
5 + 4 + 3 + 2 + 1
    ↓
15

*/

function sumOneToN(n: number): number {
  // return (n * (n + 1)) / 2;
  // return n * n + 1 / 2;
  // const sum = (n * (n + 1)) / 2;
  // return sum;
  /* let sum = 0;

  for (let i = 1; i <= n; i++) {
    sum += i;
  }

  return sum; */

  // const sum = Array.from({ length: n }, (_, index) => index + 1);
  // return sum.reduce((total, number) => total + number, 0);

  // Recursive
  if (n === 1) {
    return 1;
  }

  return n + sumOneToN(n - 1);
}

console.log(sumOneToN(5));
console.log(sumOneToN(10));
