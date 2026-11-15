/* Write a function isAlmostPalindrome that takes a string s and returns true if s can be made into a palindrome by deleting at most one character, and false otherwise.

A palindrome is a string that reads the same backward as forward.

Examples:

    Input: s = "abca"
    Output: true
    Explanation: Deleting 'c' gives 'aba' which is a palindrome.

    Input: s = "abc"
    Output: false
    Explanation: Deleting any single character does not form a palindrome.

Topics: strings, two-pointers

Hints:

    Hint 1. Use two pointers starting from the left and right ends of the string.

    Hint 2. When characters at the pointers do not match, check if the remaining substring is a palindrome after skipping either the left or right character.

Important concept

When you encounter a mismatch, you don't need to try deleting every character.

You only need to check two possibilities:
    - Skip the left character.
    - Skip the right character.

If either remaining substring is a palindrome, the original string is an almost palindrome.

*/

// Complexity analysis
// Let n be the length of the string.
// - Time: O(n) — At most two palindrome checks, each taking O(n).
// - Space: O(1) — Only pointers and variables are used.

function isAlmostPalindrome(s: string): boolean {
  // left starts at the beginning and right starts at the end.
  let left = 0;
  let right = s.length - 1;

  // Compare both characters.
  // If they match, move inward.
  // If they don't match, try skipping either character.
  while (left < right) {
    if (s[left] !== s[right]) {
      // Try deleting either the left or right character
      // left + 1 → Skip the left character.
      // right - 1 → Skip the right character.
      // || → If either option works, return true.
      // We allow only ONE deletion. That's why we immediately check the remaining substring after the first mismatch.
      return (
        isPalindrome(s, left + 1, right) || isPalindrome(s, left, right - 1)
      );
    }

    left++;
    right--;
  }

  return true;
}

// deeee = 1 < 4; 2 < 3; 3 < 2
// deeee = 0 < 3 => d !== e => false
const isPalindrome = (s: string, left: number, right: number): boolean => {
  while (left < right) {
    if (s[left] !== s[right]) {
      return false;
    }

    left++;
    right--;
  }

  return true;
};

// Complexity
// - Time: O(n) — At most two additional comparisons after the first mismatch.
// - Space: O(1) — No extra arrays or strings.

// Without Helper Function
/* function isAlmostPalindrome(s: string): boolean {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    if (s[left] !== s[right]) {
      // Option 1: Skip the left character
      let i = left + 1;
      let j = right;

      // deeee
      while (i < j && s[i] === s[j]) {
        i++;
        j--;
      }

      // i >= j → Palindrome → true
      // i < j → Unmatched characters remain → false

      if (i >= j) return true;

      // Option 2: Skip the right character
      i = left;
      j = right - 1;

      while (i < j && s[i] === s[j]) {
        i++;
        j--;
      }

      return i >= j;
    }

    left++;
    right--;
  }

  return true;
} */

console.log(isAlmostPalindrome("abca")); // true
console.log(isAlmostPalindrome("abc")); // false

console.log(isAlmostPalindrome("racecar")); // true
console.log(isAlmostPalindrome("deeee")); // true
console.log(isAlmostPalindrome("ab")); // true
console.log(isAlmostPalindrome("")); // true
console.log(isAlmostPalindrome("a")); // true
console.log(isAlmostPalindrome("abcdef")); // false
