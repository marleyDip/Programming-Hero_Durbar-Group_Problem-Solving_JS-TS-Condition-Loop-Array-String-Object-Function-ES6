/* Compare two version strings version1 and version2 and return -1, 0, or 1.

A version string consists of one or more revisions separated by a dot .. Each revision contains digits and can have leading zeros. Revisions are compared numerically from left to right.

If one version string has fewer revisions than the other, treat the missing revisions as 0.

    Return 1 if version1 > version2
    Return -1 if version1 < version2
    Return 0 if version1 === version2

Example:

    Input: version1 = "1.10", version2 = "1.2"
    Output: 1
    Explanation: 10 is greater than 2 at the second revision level.

    Input: version1 = "1.0.1", version2 = "1"
    Output: 1
    Explanation: "1" is equivalent to "1.0.0". Revision 1 is greater than revision 0 at the third level.

Hint: 

    Hint 1. Split each string by '.' to convert revision sections into arrays of numbers.
    
    Hint 2. Loop through up to the maximum array length, filling missing elements with 0.
    
    Hint 3. Compare corresponding numbers sequentially from left to right.

    Remember: Never compare version revisions as strings. For example, "10" < "2" is true in string comparison, but numerically 10 > 2.

*/

// Complexity analysis
// Let n and m be the number of revisions in each version string.
// - Time Complexity: O(n + m) — splitting and comparing revisions.
// - Space Complexity: O(n + m) — storing the split revision arrays.

// Using for Loop
function compareVersions(version1: string, version2: string): number {
  const v1 = version1.split(".");
  // console.log(v1); // "1.10" => [ '1', '10' ]

  const v2 = version2.split(".");
  // console.log(v2); // "1.2" => [ '1', '2' ]

  const maxLength = Math.max(v1.length, v2.length);
  // console.log(maxLength); // 2

  for (let i = 0; i < maxLength; i++) {
    // Missing revisions are treated as 0
    const num1 = Number(v1[i] ?? 0);
    // console.log(num1); // [ '1', '10' ] => 1 10

    const num2 = Number(v2[i] ?? 0);
    // console.log(num2); // ['1'] => 1 0 0

    if (num1 > num2) return 1;
    if (num1 < num2) return -1;
  }

  return 0;
}

// Using while Loop
/* function compareVersions(version1: string, version2: string): number {
  const v1 = version1.split(".");
  const v2 = version2.split(".");

  let i = 0;

  while (i < v1.length || i < v2.length) {
    const num1 = Number(v1[i] || 0);
    const num2 = Number(v2[i] || 0);

    if (num1 > num2) return 1;
    if (num1 < num2) return -1;

    i++;
  }

  return 0;
} */

console.log(compareVersions("1.10", "1.2")); // 1

console.log(compareVersions("1.0.1", "1")); // 1

console.log(compareVersions("1.2", "1.10")); // -1

console.log(compareVersions("1.01", "1.001")); // 0

console.log(compareVersions("1.0", "1.0.0")); // 0

console.log(compareVersions("2.0", "1.9.9")); // 1

console.log(compareVersions("1.2.3", "1.2.4")); // -1

console.log(compareVersions("1.2.0", "1.2")); // 0

console.log(compareVersions("1.0.10", "1.0.2")); // 1
