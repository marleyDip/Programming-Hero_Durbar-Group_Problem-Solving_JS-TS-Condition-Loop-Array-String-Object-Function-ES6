"use strict";
/**
 *
 * What is Array.from()?
 * Array.from() creates a new array from something that has a length.
 *
 * { length: b - a + 1}
 * -> a = 3, b = 8
 * -> 8 - 3 + 1 = 6
 * -> the range is: 3, 4, 5, 6, 7, 8 = six numbers
 *
 * Array.from({ length: 6 })
 * - creates an array with 6 positions.
 * - index:  0    1    2    3    4    5
 *
 *
 * What is (_, index) => a + index?
 * - This is the mapping function.
 * - Array.from() gives the callback two important values: (value, index)
 *
 * Array.from(
 *   { length: 5 },
 *   (value, index) => ...
 * );
 *
 * The parameters are:
 * value → current value
 * index → current index
 *
 * We don't need the value, so we write:"_"
 * The underscore _ conventionally means: "I receive this parameter, but I don't need it.
 *
 * So: (_, index) => a + index
 *
 * really means:
 * (value, index) => {
 *   return a + index;
 * }
 * but we don't use value.
 *
 * a + index
 * 3 + 0 = 3
 * 3 + 1 = 4
 * 3 + 2 = 5
 * 3 + 3 = 6
 * 3 + 4 = 7
 * 3 + 5 = 8
 *
 * index     calculation     result
 * ---------------------------------
 *   0        3 + 0             3
 *   1        3 + 1             4
 *   2        3 + 2             5
 *   3        3 + 3             6
 *   4        3 + 4             7
 *   5        3 + 5             8
 *
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
console.log(Array.from({ length: 5 })); // [ undefined, undefined, undefined, undefined, undefined ]
const a = 3;
const b = 8;
const numbers = Array.from({ length: b - a + 1 }, (_, index) => a + index); // 3 + 0 = 3; 3 + 1 = 4; ...
console.log(numbers); // [ 3, 4, 5, 6, 7, 8 ]
const even = numbers.filter((n) => n % 2 === 0);
console.log(even); // [ 4, 6, 8 ]
const odd = numbers.filter((n) => n % 2 !== 0);
console.log(odd);
const positive = numbers.filter((n) => n > 0);
console.log(positive); // [ 3, 4, 5, 6, 7, 8 ]
const negative = numbers.filter((n) => n < 0);
console.log(negative); // []
//# sourceMappingURL=Array.from.js.map