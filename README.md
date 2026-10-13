# Complexity Analysis

Big O notation describes **how an algorithm's work grows as the input gets bigger**. It helps us compare algorithms without relying on a particular computer or exact running time.

## Table of Contents

- [1. Complexity Ranking](#1-complexity-ranking)
- [2. Simple Examples](#2-simple-examples)
- [3. Time vs. Space Complexity](#3-time-vs-space-complexity)
- [4. Analyze a Loop](#4-analyze-a-loop)
- [5. Your Merge Sorted Arrays Example](#5-your-merge-sorted-arrays-example)
- [6. Quick Rules](#6-quick-rules)

## 1. Complexity Ranking

From slower-growing to faster-growing work, for large input sizes:

| Big O | Name | Simple meaning | Example |
| --- | --- | --- | --- |
| `O(1)` | Constant | Work stays about the same | Read `arr[0]` |
| `O(log n)` | Logarithmic | Work grows slowly; each step cuts the search space | Binary search |
| `O(√n)` | Square root | Work grows roughly with the square root of input size | Trial division up to `√n` |
| `O(n)` | Linear | Work grows in proportion to input size | Find an item in a list |
| `O(n log n)` | Linearithmic | A little more work than linear | Merge sort |
| `O(n²)` | Quadratic | Work grows roughly with input size squared | Compare every pair |
| `O(n³)` | Cubic | Work grows roughly with input size cubed | Three nested loops |
| `O(2ⁿ)` | Exponential | Each added item can nearly double the work | Generate all subsets |
| `O(n!)` | Factorial | Work grows like all possible orderings | Generate all permutations |

**Remember:** This is a common simplified ranking. The exact complexity depends on the algorithm and its assumptions. Big O usually describes an upper bound on growth; it does not give an exact time in seconds.

## 2. Simple Examples

The examples below use TypeScript.

### `O(1)` — Constant

```ts
function getFirst(numbers: number[]): number | undefined {
  return numbers[0];
}
```

**Meaning:** The function reads one position. It does not need to inspect every item.

### `O(log n)` — Logarithmic

```ts
function binarySearch(numbers: number[], target: number): number {
  let left = 0;
  let right = numbers.length - 1;

  while (left <= right) {
    const middle = Math.floor((left + right) / 2);
    const value = numbers[middle];

    if (value === undefined) return -1;
    if (value === target) return middle;

    if (value < target) left = middle + 1;
    else right = middle - 1;
  }

  return -1;
}
```

**Meaning:** Each step removes about half of the remaining search area. The array must already be sorted.

### `O(n)` — Linear

```ts
function findNumber(numbers: number[], target: number): boolean {
  for (const number of numbers) {
    if (number === target) return true;
  }

  return false;
}
```

**Meaning:** In the worst case, the function checks every item. Twice as many items can mean about twice as much work.

### `O(n log n)` — Linearithmic

```ts
const sorted = [...numbers].sort((a, b) => a - b);
```

**Meaning:** Efficient comparison sorts commonly take `O(n log n)` time. JavaScript does not specify one universal sorting complexity for every engine, so this is a typical example rather than a language guarantee.

### `O(n²)` — Quadratic

```ts
function printEveryPair(numbers: number[]): void {
  for (const first of numbers) {
    for (const second of numbers) {
      console.log(first, second);
    }
  }
}
```

**Meaning:** Each item is paired with every item. With `n` items, there are `n × n = n²` pairs.

### `O(2ⁿ)` — Exponential

A simple example is generating every possible subset of a set. Each item has two choices: included or not included. For `n` items, there are `2ⁿ` subsets.

**Meaning:** Adding one item doubles the number of subsets.

### `O(n!)` — Factorial

Generating every possible ordering of `n` distinct items produces `n!` permutations.

**Meaning:** Even a modest increase in the number of items can make the work grow dramatically.

## 3. Time vs. Space Complexity

- **Time complexity:** How the amount of work grows with input size.
- **Space complexity:** How the extra memory used by an algorithm grows with input size.

For example, creating a new array containing all `n` input items generally uses `O(n)` extra space. Reading `numbers[0]` uses `O(1)` extra space.

Be clear whether you are discussing **auxiliary space** (extra working memory) or total space including the input and output.

## 4. Analyze a Loop

```ts
for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i]);
}
```

If the array has `n` items, the loop runs `n` times, so its time complexity is **`O(n)`**.

```ts
for (let i = 0; i < numbers.length; i++) {
  for (let j = 0; j < numbers.length; j++) {
    console.log(numbers[i], numbers[j]);
  }
}
```

The inner loop runs `n` times for each of the `n` outer-loop iterations. Total work is `n × n`, so its time complexity is **`O(n²)`**.

## 5. Your Merge Sorted Arrays Example

When merging two already-sorted arrays of lengths `n` and `m`:

```ts
function mergeSortedArrays(arr1: number[], arr2: number[]): number[] {
  const result: number[] = [];
  let i = 0;
  let j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] <= arr2[j]) {
      result.push(arr1[i]);
      i++;
    } else {
      result.push(arr2[j]);
      j++;
    }
  }

  while (i < arr1.length) {
    result.push(arr1[i]);
    i++;
  }

  while (j < arr2.length) {
    result.push(arr2[j]);
    j++;
  }

  return result;
}
```

- **Time:** `O(n + m)` — each item from both arrays is added once.
- **Extra space:** `O(n + m)` — the result stores all items.
- **Why not `O(n × m)`?** The function advances one of the two pointers on each step; it does not compare every item in one array with every item in the other.

> If your TypeScript project enables `noUncheckedIndexedAccess`, indexed values may be typed as possibly `undefined`. You may need explicit checks or a different type-safe approach; don't add a fallback such as `?? 0` unless `0` is genuinely the intended fallback.

## 6. Quick Rules

1. A fixed number of operations is usually `O(1)`.
2. One pass through `n` items is usually `O(n)`.
3. Repeatedly halving the search space is often `O(log n)`.
4. Two full nested loops often mean `O(n²)`.
5. Consecutive loops add: `O(n) + O(n)` simplifies to `O(n)`.
6. Keep the fastest-growing term: `O(n² + n)` simplifies to `O(n²)`.
7. Big O ignores constant factors: `O(2n)` simplifies to `O(n)`.

### Final takeaway

For large inputs, `O(1)` and `O(log n)` usually scale very well; `O(n)` and `O(n log n)` are often practical; and `O(n²)`, `O(2ⁿ)`, or `O(n!)` can become expensive as input size grows.

Big O is about **growth**, not an exact runtime promise.
