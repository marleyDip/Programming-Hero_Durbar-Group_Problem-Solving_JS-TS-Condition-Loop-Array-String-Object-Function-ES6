"use strict";
/* Given a non-negative integer, repeatedly add all its digits until the result has only one digit.

Examples
repeatedDigitSum(9875)
Expected output: 2
Explanation: 9 + 8 + 7 + 5 = 29. Then, 2 + 9 = 11. Finally, 1 + 1 = 2.

repeatedDigitSum(123)
Expected output: 6
Explanation: 1 + 2 + 3 = 6.

Hint 1. You can convert the number to a string to easily access its individual digits.

Hint 2. A loop can be used to repeatedly sum the digits until the number becomes a single digit.

This is the classic digital root problem. It is excellent practice for loops, %, integer division, and arithmetic.


Inner loop:
sum = 0

9875 % 10 = 5
sum = 0 + 5 = 5
n = 987

987 % 10 = 7
sum = 5 + 7 = 12
n = 98

98 % 10 = 8
sum = 12 + 8 = 20
n = 9

9 % 10 = 9
sum = 20 + 9 = 29
n = 0

n = sum => n = 29

Outer loop runs again:
29
↓
2 + 9
↓
11

Again:
11
↓
1 + 1
↓
2

n = 2

Now: n >= 10 is false.

Result: 2

The key difference
sum = n % 10;   // gives the last digit and replace the old value
sum += n % 10;  // gives the last digit and add to the existing value

Math.floor() => removes the decimal part.

Inner loop => extracts every digit from the current number.
For 9875: 5 7 8 9 and adds them together.

Outer loop => Does the number still have more than one digit?
9875 → yes 29   → yes 11   → yes 2    → no

9875 >= 10 and inner 9875 > 0, then 9875 % 10 = 0 + 5 and Math.floor(9875 / 10) => 987 and current n = 987 and repeat.

            Number
            ↓
            extract last digit → % 10
            ↓
            remove last digit → Math.floor(/ 10)
            ↓
            add digits
            ↓
            repeat until one digit

*/
Object.defineProperty(exports, "__esModule", { value: true });
// In JavaScript, a while loop is used to repeat a block of code as long as a specific condition remains true.
// Use a while loop when you don't know how many times the loop will need to run in advance.
const addDigits = (num) => {
    // Nested while loop
    // Outer loop
    // suppose, num = 38, num = 11, num = 2 >= 10, false...exit the loop
    while (num >= 10) {
        let sum = 0;
        // Inner Loop
        /* while (num > 0) {
            // 0 + (38 % 10) = 3.8 => 8, 8 + (3 % 10) = 0.3 => 3
            // 0 + 1, 1 + 1
            sum = sum + (num % 10);
            // (38 / 10) = 3.8 => 3, (3 / 10) = o.3 => 0
            // 1, 0
            num = Math.floor(num / 10);
          } */
        // A slightly different approach using strings
        // Convert the whole number to a string
        // "38", then "11"
        for (const digit of String(num)) {
            //"3" => 0 + 3, "8" => 3 + 8
            // "1" => 0 + 1, "1" => 1 + 1
            // Converts each character back into a number
            sum += Number(digit);
        }
        // num = 11, num = 2
        num = sum;
    }
    // num = 2
    return num;
    // Mathematical shortcut - Digital-root formula
    // There is also a very short mathematical solution using the digital root.
    // The important mathematical pattern is that the digital root follows the remainder when dividing by 9.
    // For any number, repeatedly adding its digits gives the same remainder when divided by 9. The repeated digit sum doesn't change the number's remainder modulo 9.
    // 38 => 9 * 4 + 2; 8 + 3 = 11 => 9 * 1 + 2
    if (num === 0) {
        return 0;
    }
    const reminder = num % 9;
    return reminder === 0 ? 9 : reminder;
    // Mathematical shortcut, (num -1) is cleaver part for solve which value is divided by 9 and reminder 0, Multiples of 9 are special => 18 % 9 = 0, 27 % 9 = 0
    // 18 % 9 = 0, 1 + 0 => 1 but expected result = 9
    return 1 + ((num - 1) % 9);
    // do...while
    do {
        let sum = 0;
        while (num > 0) {
            sum += num % 10;
            num = Math.floor(num / 10);
        }
        num = sum;
    } while (num >= 10);
    return num;
};
console.log(addDigits(38)); // 2
console.log(addDigits(9875)); // 2
console.log(addDigits(12345)); // 6
console.log(addDigits(7)); // 7
console.log(addDigits(0)); // 0
console.log(addDigits(999999)); // 9
function repeatedDigitSum(n) {
    // String + split() + reduce();
    // "38" => ["3", "8"] -> 11, "11" => ["1", "1"] -> 2
    while (n >= 10) {
        n = String(n)
            .split("")
            .reduce((sum, digit) => sum + Number(digit), 0);
    }
    return n;
    // String + map() + reduce()
    // "38" => ["3", "8"] -> [3, 8] -> 11, "11" => ["1", "1"] -> [1, 1] -> 2
    while (n >= 10) {
        const digits = String(n).split("").map(Number);
        n = digits.reduce((total, digit) => total + digit, 0);
    }
    return n;
    // Using for loop for digit extraction
    while (n >= 10) {
        let sum = 0;
        // n = Math.floor(num / 10) removes one digit each iteration.
        for (; n > 0; n = Math.floor(n / 10)) {
            sum += n % 10;
        }
        n = sum;
    }
    return n;
    // Recursive solution
    if (n < 10) {
        return n;
    }
    let sum = 0;
    while (n > 0) {
        sum += n % 10;
        n = Math.floor(n / 10);
    }
    for (; n > 0; n = Math.floor(n / 10)) {
        sum += n % 10;
    }
    /*
    repeatedDigitSum(9875)
         ↓
     repeatedDigitSum(29)
         ↓
     repeatedDigitSum(11)
         ↓
     repeatedDigitSum(2)
         ↓
         2
    */
    return repeatedDigitSum(sum);
    return n === 0 ? 0 : n % 9 === 0 ? 9 : n % 9;
}
console.log(repeatedDigitSum(9875)); // 2
//# sourceMappingURL=Repeated_Digit_Sum.js.map