/* Given an array arr and a positive integer size, split the array into consecutive subarrays (chunks) where each subarray has a length of at most size.

The final chunk may contain fewer elements than size if the array cannot be split evenly. Return all chunks in a new array.

*/

function chunkArray<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];

  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }

  return result;

  // Using While
  let i = 0;

  while (i < arr.length) {
    result.push(arr.slice(i, i + size));
    i = i + size;
  }

  return result;
}

console.log(chunkArray([1, 2, 3, 4, 5], 2)); // [[1, 2], [3, 4], [5]]

console.log(chunkArray([1, 2, 3, 4, 5, 6], 3)); // [[1, 2, 3], [4, 5, 6]]

console.log(chunkArray(["a", "b", "c", "d"], 2)); // [["a", "b"], ["c", "d"]]

console.log(chunkArray([1], 1)); // [[1]]

console.log(chunkArray([], 2)); // []

console.log(chunkArray([1, 2, 3], 5)); // [[1, 2, 3]]
