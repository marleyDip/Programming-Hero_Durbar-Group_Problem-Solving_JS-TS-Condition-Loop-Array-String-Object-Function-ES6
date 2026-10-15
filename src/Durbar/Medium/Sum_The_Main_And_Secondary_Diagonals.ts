/* Given a square 2D array matrix of numbers, write a function diagonalSums that returns an object containing two properties: main (the sum of elements on the main diagonal) and secondary (the sum of elements on the secondary diagonal).

    The main diagonal runs from the top-left corner to the bottom-right corner (matrix[i][i]). 
    
    The secondary diagonal runs from the top-right corner to the bottom-left corner (matrix[i][n - 1 - i]). 
    
    If the matrix has odd dimensions, the center element is part of both diagonals and should be included in both sums.

*/

// using for loop
function diagonalSums(matrix: number[][]): {
  main: number;
  secondary: number;
} {
  let main = 0;
  let secondary = 0;

  const n = matrix.length;
  // console.log(n);

  for (let i = 0; i < n; i++) {
    // main += matrix[i]![i]!;
    // secondary += matrix[i]![n - 1 - i]!;

    const row = matrix[i];
    // console.log(row);
    if (row === undefined) continue;

    const mainValue = row[i];
    // console.log(mainValue);

    const secondaryValue = row[n - 1 - i];
    // console.log(secondaryValue);

    if (mainValue !== undefined) {
      main += mainValue;
      // console.log(main);
    }

    if (secondaryValue !== undefined) {
      secondary += secondaryValue;
    }
  }

  return { main, secondary };

  // Complexity
  // Time: O(n), because we visit two elements per row.
  // Extra space: O(1), because we only use two sum variables and an index.
}

// using for...of loop
/* function diagonalSums(matrix: number[][]): {
  main: number;
  secondary: number;
} {
  let main = 0;
  let secondary = 0;
  const n = matrix.length;
  let i = 0;

  for (const row of matrix) {
    const mainValue = row[i];
    const secondaryValue = row[n - 1 - i];

    if (mainValue !== undefined) main += mainValue;
    if (secondaryValue !== undefined) secondary += secondaryValue;

    i++;
  }

  return { main, secondary };

  // Complexity
  // Time: O(n), because we visit two elements per row.
  // Extra space: O(1), because we only use two sum variables and an index.
} */

// Using reduce Method
/* function diagonalSums(matrix: number[][]): {
  main: number;
  secondary: number;
} {
  const n = matrix.length;

  return matrix.reduce(
    (sums, row, i) => ({
      main: sums.main + (row[i] ?? 0),
      secondary: sums.secondary + (row[n - 1 - i] ?? 0),
    }),
    { main: 0, secondary: 0 },
  );

  // Complexity
  // Time: O(n), because we visit two elements per row.
  // Extra space: O(1), because we only use two sum variables and an index.
} */

// Using reduce and map Method
/* function diagonalSums(matrix: number[][]): {
  main: number;
  secondary: number;
} {
  const n = matrix.length;

  const main = matrix
    .map((row, i) => row[i])
    .reduce<number>((sum, value) => sum + (value ?? 0), 0);

  const secondary = matrix
    .map((row, i) => row[n - 1 - i])
    .reduce<number>((sum, value) => sum + (value ?? 0), 0);

  return { main, secondary };

  // Complexity
  // Time: O(n)
  // Extra space: O(n)
} */

// Using While loop
/* function diagonalSums(matrix: number[][]): {
  main: number;
  secondary: number;
} {
  const n = matrix.length;
  let main = 0;
  let secondary = 0;
  let i = 0;

  while (i < n) {
    main += matrix[i]?.[i] ?? 0;
    secondary += matrix[i]?.[n - 1 - i] ?? 0;
    i++;
  }

  return { main, secondary };

  // Complexity
  // Time: O(n), because we visit two elements per row.
  // Extra space: O(1), because we only use two sum variables and an index.
} */

console.log(
  diagonalSums([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]),
); // { main: 15, secondary: 15 }

console.log(
  diagonalSums([
    [1, 2],
    [3, 4],
  ]),
); // { main: 5, secondary: 5 }

console.log(diagonalSums([[7]])); // { main: 7, secondary: 7 }

console.log(diagonalSums([])); // { main: 0, secondary: 0 }
