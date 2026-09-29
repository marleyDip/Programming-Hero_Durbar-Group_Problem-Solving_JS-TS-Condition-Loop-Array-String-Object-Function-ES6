"use strict";
/* Given a password string, classify its strength as "Weak", "Medium", or "Strong" based on the following rules:

Strong: The password has a length of 8 or more characters and contains at least one uppercase letter, one lowercase letter, one digit, and one special character (from !@#$%^&*).

Medium: The password has a length of 6 or more characters and satisfies at least two of the four character-type conditions (uppercase, lowercase, digit, special character).

Weak: Any password that does not meet the criteria for "Strong" or "Medium".

Example 1
Input: password = "Password1!"
Output: "Strong"

Example 2
Input: password = "pass123"
Output: "Medium"

1. Uppercase → [A-Z]
2. Lowercase → [a-z]
3. Digit     → [0-9]
4. Special   → [!@#$%^&*]

The checks produce:

    hasUppercase → true
    hasLowercase → true
    hasDigit     → true
    hasSpecial   → true

We need to count how many are true.

JavaScript can convert:

    Number(true)  // 1
    Number(false) // 0


For example: "Pass12!"

    uppercase ✓
    lowercase ✓
    digit     ✓
    special   ✓

That's 4 types, but its length is only 7.

So: length >= 8 → false

Therefore it is not Strong.

But: length >= 6 && types >= 2 is true.

Therefore: "Medium"

That's why the logic should be:

    if Strong
        ↓
    if Medium
        ↓
    Weak


Finally Condition:

    2 → Medium
    3 → Medium
    4 → Strong (if length >= 8)


    Check 4 character types
            ↓
    Count how many exist
            ↓
        4 types?
        /     \
        Yes      No
        ↓        ↓
    length≥8?   length≥6 AND types≥2?
    /  \          /       \
    Yes   No       Yes       No
    ↓     ↓        ↓         ↓
    Strong Medium  Medium     Weak

*/
Object.defineProperty(exports, "__esModule", { value: true });
// function classifyPassword(password: string): "Strong" | "medium" | "Weak" {}
function classifyPassword(password) {
    // Test looks for a pattern match inside a string and returns a boolean value (true or false)
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasDigit = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*]/.test(password);
    // Character-by-character without regex
    /* let hasUppercase = false;
      let hasLowercase = false;
      let hasDigit = false;
      let hasSpecial = false;
      
      for (const char of password) {
        if (char >= "A" && char <= "Z") {
          hasUppercase = true;
        } else if (char >= "a" && char <= "z") {
          hasLowercase = true;
        }
        if (char >= "0" && char <= "9") {
          hasDigit = true;
        }
        if ("!@#$%^&".includes(char)) {
          hasSpecial = true;
        }
      } */
    const typeCount = Number(hasUppercase) +
        Number(hasLowercase) +
        Number(hasDigit) +
        Number(hasSpecial);
    /* let typeCount = 0;
      if (hasUppercase) {
        return typeCount++;
      }
      if (hasLowercase) typeCount++;
      if (hasDigit) typeCount++;
      if (hasSpecial) typeCount++; */
    // Using an array
    /* const condition = [
        /[A-Z]/.test(password),
        /[a-z]/.test(password),
        /[0-9]/.test(password),
        /[!@#$%^&]/.test(password),
      ];
  
      // Here, keeps only the true values.
      const typeCount = condition.filter(Boolean).length;
      
      // Using reduce method
      const typeCount = condition.reduce(
        (count, condition) => count + Number(condition),
        0,
      ); */
    //   const strongRegex =
    //     /^(?=.{8,}$)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])/;
    //   if (strongRegex.test(password)) return "Strong";
    if (password.length >= 8 && typeCount === 4) {
        return "Strong";
    }
    if (password.length >= 6 && typeCount >= 2) {
        return "medium";
    }
    return "Weak";
    // using ternary operator
    /* const typeCount =
      Number(/[A-Z]/.test(password)) +
      Number(/[a-z]/.test(password)) +
      Number(/[0-9]/.test(password)) +
      Number(/[!@#$%^&*]/.test(password)); */
    /* let typeCount = 0;
  
    if (/[A-Z]/.test(password)) typeCount++;
    if (/[a-z]/.test(password)) typeCount++;
    if (/[0-9]/.test(password)) typeCount++;
    if (/[!@#$%^&*]/.test(password)) typeCount++; */
    return password.length >= 8 && typeCount === 4
        ? "Strong"
        : password.length >= 6 && typeCount >= 2
            ? "medium"
            : "Weak";
}
console.log(classifyPassword("Password123!")); // "Strong"
console.log(classifyPassword("Password")); // "Medium"
console.log(classifyPassword("pass12@")); // "Medium"
console.log(classifyPassword("hello")); // "Weak"
//# sourceMappingURL=Classify_Password_Strength.js.map