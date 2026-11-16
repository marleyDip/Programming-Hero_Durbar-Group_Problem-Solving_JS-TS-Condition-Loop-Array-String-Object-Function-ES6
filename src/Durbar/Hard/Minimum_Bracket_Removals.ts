/* Given a string containing only opening ( and closing ) brackets, return the minimum number of brackets that must be removed to make the string balanced.

A string is considered balanced if:

    Every opening bracket has a corresponding closing bracket.

    Every closing bracket has a corresponding opening bracket.
    
    The brackets are properly nested (e.g., () is balanced, )( is not).

Examples:

    Input: s = "()()"
    Output: 0
    Explanation: The string is already balanced, so 0 removals are needed.

    Input: s = "())("
    Output: 2
    Explanation: Removing the second ')' and the last '(' results in '()', which is balanced. Minimum 2 removals.

Topics: String, Stack, Hard

Hints:

    Hint 1. Consider iterating through the string and keeping track of open brackets.

    Hint 2. A counter can be used to represent the balance of open vs. closed brackets.

*/

// Complexity analysis
// - Time Complexity: O(n) — We visit each character exactly once.
// - Space Complexity: O(1) — We only use two counters.

function minRemovalsToBalance(s: string): number {
  let open = 0; // unmatched "(" seen so far
  let removals = 0; // unmatched ")" that can never be matched

  //   for (const ch of s) {
  //     if (ch === "(") {
  //       open++;
  //     } else if (ch === ")") {
  //       if (open > 0) {
  //         open--; // match this ")" with an earlier "("
  //       } else {
  //         removals++; // nothing to match, so this ")" must go
  //       }
  //     }
  //   }

  for (let i = 0; i < s.length; i++) {
    const bracket = s[i];

    if (bracket === "(") {
      open++;
    } else {
      if (open > 0) {
        open--;
      } else {
        // No opening bracket available for this closing bracket
        removals++;
      }
    }
  }

  // Any remaining opening brackets "(" must also be removed
  return removals + open;
}

/* minRemovalsToBalance("())(");

Dry run:

Character	Action	open	removals
(	Increase open	1	0
)	Match opening bracket	0	0
)	No opening available, remove it	0	1
(	Increase open	1	1

At the end:
- removals = 1 (one unmatched closing bracket)
- open = 1 (one unmatched opening bracket)

Therefore: return 1 + 1; // 2 */

console.log(minRemovalsToBalance("()()")); // 0
console.log(minRemovalsToBalance("())(")); // 0

console.log(minRemovalsToBalance("())")); // 1
console.log(minRemovalsToBalance("(((")); // 3
console.log(minRemovalsToBalance(")(")); // 2
console.log(minRemovalsToBalance("(()))(")); // 2
console.log(minRemovalsToBalance("")); // 0

console.log(minRemovalsToBalance("()")); // 0
console.log(minRemovalsToBalance("(()")); // 1
console.log(minRemovalsToBalance("())")); // 1
console.log(minRemovalsToBalance(")(")); // 2
console.log(minRemovalsToBalance("((()))")); // 0
console.log(minRemovalsToBalance("()))((")); // 4
console.log(minRemovalsToBalance("")); // 0

/* Practice question: Why can't we simply count the total number of ( and ) and return their absolute difference?

Because counting the total number of opening and closing brackets doesn't tell us whether they are properly ordered.

Let's look at an example.

Example 1: Balanced string

    s = "()"

    - Opening brackets = 1
    - Closing brackets = 1
    - Absolute difference = |1 - 1| = 0
    Correct answer: 0 ✅

Example 2: Unbalanced string

    s = ")("

    - Opening brackets = 1
    - Closing brackets = 1
    - Absolute difference = |1 - 1| = 0
    But the string ")(" is NOT balanced!

Why? Because the closing bracket appears before the opening bracket. We need to remove both brackets.

Correct answer: 2 ❌ (not 0).


Example 3: Another unbalanced string

    s = "())("

    - Opening brackets = 2
    - Closing brackets = 2
    - Absolute difference = |2 - 2| = 0

But it is not balanced. We must remove the extra closing bracket and the remaining unmatched opening bracket.

Correct answer: 2.

The main difference
Method	What does it check?
Absolute difference	Only the total number of brackets
Counter approach	Both the number and the correct order

Remember: A balanced parentheses string must satisfy two conditions:
    1. Total opening brackets must equal total closing brackets.
    2. At every position, closing brackets must never exceed opening brackets encountered so far.

    That's why we use the open counter while traversing the string from left to right.

*/
