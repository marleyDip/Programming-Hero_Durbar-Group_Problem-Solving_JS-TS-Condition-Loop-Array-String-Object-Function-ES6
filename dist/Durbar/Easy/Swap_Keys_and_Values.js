"use strict";
/* Write a function that takes an object and returns a new object where the keys and values are swapped.

If multiple keys in the original object share the same value, the key that appears later in the object's property order should overwrite any previous ones ("later key wins").

Note: In JavaScript, object keys are always strings. Therefore, the values in the returned object (which were the keys of the input object) should be strings.


  Hint 1. Use `Object.entries(obj)` to iterate through the key-value pairs of the object.

  Hint 2. Remember that the keys of the returned object will be the values of the input object.

*/
Object.defineProperty(exports, "__esModule", { value: true });
// for...of, for...in, foreach()
/* function swapKeysAndValues(
  obj: Record<string, string | number>,
): Record<string, string> {
  const result: Record<string, string> = {};

  // console.log(Object.entries(obj)); // [ [ 'a', 'x' ], [ 'b', 'y' ] ]

  for (const [key, value] of Object.entries(obj)) {
    result[value] = key;
  }

  //   for (const key in obj) {
  //     const value = obj[key];

  //     if (value !== undefined) {
  //       result[value] = key;
  //     }
  //   }

  // Object.entries(obj).forEach(([key, value]) => {
  //   result[value] = key;
  // });

  // Object.keys(obj).forEach((key)=> {
  //   result[obj[key]] = key;
  // });

  return result;
} */
// Using Object.entries() and Object.keys() with reduce() method
/* function swapKeysAndValues(
  obj: Record<string, string | number>,
): Record<string, string> {
  return Object.entries(obj).reduce(
    (result, [key, value]) => {
      result[String(value)] = key;
      return result;
    },
    {} as Record<string, string>,
  );

  // return Object.keys(obj).reduce(
  //   (result, key) => {
  //     result[String(obj[key])] = key;
  //     return result;
  //   },
  //   {} as Record<string, string>,
  // );
} */
// Using Object.fromEntries() with map() method
function swapKeysAndValues(obj) {
    return Object.fromEntries(Object.entries(obj).map(([key, value]) => [value, key]));
}
console.log(swapKeysAndValues({ a: "x", b: "y" })); // Output: { x: 'a', y: 'b' }
console.log(swapKeysAndValues({ a: "x", b: "x" })); // Output: { x: 'b' } because the later key 'b' overwrites the earlier key 'a'
console.log(swapKeysAndValues({
    a: "apple",
    b: "banana",
    c: "apple",
})); // { apple: 'c', banana: 'b' } because the later key 'c' overwrites the earlier key 'a'
console.log(swapKeysAndValues({
    a: true,
    b: false,
    c: null,
}));
//# sourceMappingURL=Swap_Keys_and_Values.js.map