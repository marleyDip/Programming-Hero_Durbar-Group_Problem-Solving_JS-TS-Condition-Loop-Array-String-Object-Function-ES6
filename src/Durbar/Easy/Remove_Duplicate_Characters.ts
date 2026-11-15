/* Given a string, return a new string with all duplicate characters removed. The order of the characters in the original string must be preserved, and only the first occurrence of each character should be kept.

Examples:

    Input: str = "hello"
    Output: "helo"
    Explanation: The character 'l' appears twice, 'o' appears twice. The first 'h', 'e', 'l', 'o' are kept.

    Input: str = "programming"
    Output: "progamin"
    Explanation: The character 'r' appears twice, 'g' appears twice, 'm' appears twice. The first 'p', 'r', 'o', 'g', 'a', 'm', 'i', 'n' are kept.

Topics: string, set, array, easy

Hints:
    Hint 1. Consider using a data structure to efficiently keep track of characters you've already encountered.

We can solve this problem using a Set + for loop.

The idea is simple:
    - Keep track of characters we have already seen.
    - If a character is new, add it to the result.
    - If it already exists, skip it.

*/

// Complexity analysis
// Let n be the length of the string.
// Time: O(n)
// Space: O(n)

// Using Set
function removeDuplicateCharacters(str: string): string {
  const seen = new Set<string>();
  let result = "";

  for (let i = 0; i < str.length; i++) {
    // const char = s[i];
    const char = str.charAt(i);

    // Checks whether character exists
    if (!seen.has(char)) {
      seen.add(char); // Adds character to Set
      result += char; // Adds character to result string
    }
  }

  return result;
}

// Complexity analysis
// Let n be the length of the string.
// Time: O(n²) - includes() searches the array each time
// Space: O(n) - Stores unique characters
// includes() may check every existing character for each new character

// Using an array & includes()
/* function removeDuplicateCharacters(str: string): string {
  let seen: string[] = [];
  let result = "";

  for (let i = 0; i < str.length; i++) {
    // const char = s[i];
    const char = str.charAt(i);

    // checks whether the character already exists in the array.
    if (!seen.includes(char)) {
      seen.push(char); // adds a new character.
      result += char; // preserves the original character order.
    }
  }

  return result;
} */

// Complexity analysis
// - Time: O(n²) — Nested loops.
// - Space: O(n) — Result string.

// Nested for Loops (for loop with an inner for loop) without Set or includes()
/* function removeDuplicateCharacters(str: string): string {
  let result = "";

  for (let i = 0; i < str.length; i++) {
    // At the beginning of every outer loop iteration, we assume the character is unique.
    let isDuplicate = false;

    // Check whether the character already exists in result
    for (let j = 0; j < result.length; j++) {
      // Once we find a duplicate, there is no reason to continue checking. So break stops the inner loop.
      if (str[i] === result[j]) {
        isDuplicate = true;
        break;
      }
    }

    // Add only if the character is not a duplicate
    if (!isDuplicate) {
      result += str[i]; // If the character is not a duplicate, add it to the result.
    }
  }

  return result;
} */

console.log(removeDuplicateCharacters("hello")); // "helo"
console.log(removeDuplicateCharacters("programming")); // "progamin"

console.log(removeDuplicateCharacters("aaaa")); // "a"
console.log(removeDuplicateCharacters("abc")); // "abc"
console.log(removeDuplicateCharacters("")); // ""
console.log(removeDuplicateCharacters("banana")); // "ban"
console.log(removeDuplicateCharacters("aabbcc")); // "abc"
