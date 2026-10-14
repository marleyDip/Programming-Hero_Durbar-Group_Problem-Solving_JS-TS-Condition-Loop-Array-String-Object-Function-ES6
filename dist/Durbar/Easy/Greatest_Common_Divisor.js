"use strict";
/* Write a function gcd that computes the greatest common divisor (GCD) of two non-negative integers a and b.

The greatest common divisor is the largest positive integer that divides both numbers without leaving a remainder.

If one of the numbers is 0 and the other is positive, their GCD is the positive number.
If both numbers are 0, return 0.

GCD (Greatest Common Divisor) — বাংলায় সহজ ব্যাখ্যা
GCD-এর পূর্ণরূপ হলো Greatest Common Divisor। বাংলায় একে গরিষ্ঠ সাধারণ গুণনীয়ক (গ.সা.গু.) বলা হয়।

দুই বা তার বেশি সংখ্যাকে যে বৃহত্তম সংখ্যা দিয়ে নিঃশেষে ভাগ করা যায়, সেটিই তাদের GCD।

১. সহজ উদাহরণ
ধরি, আমাদের দুটি সংখ্যা আছে: 12 এবং 18।
    ১২-এর গুণনীয়ক: 1, 2, 3, 4, 6, 12
    ১৮-এর গুণনীয়ক: 1, 2, 3, 6, 9, 18
    সাধারণ গুণনীয়ক হলো: 1, 2, 3, 6
    এদের মধ্যে বৃহত্তম সংখ্যা 6।

    সুতরাং, gcd(12,18)=6

২. GCD বের করার গাণিতিক সূত্র (Euclidean Algorithm)
বড় সংখ্যার GCD বের করতে আমরা Euclidean Algorithm ব্যবহার করতে পারি।

এর মূল সূত্র: gcd(a,b)= gcd(b,a mod b)

যেখানে:
    - a = প্রথম সংখ্যা
    - b = দ্বিতীয় সংখ্যা
    - mod = ভাগশেষ বা Remainder
    - যখন b=0 হবে, তখন GCD হবে a।

    সহজভাবে মনে রাখবে: GCD(a, b) = GCD(b, a % b), gcd(a, b) = gcd(b, a mod b)
শেষ পর্যন্ত ভাগশেষ 0 হলে থামতে হবে।

ধরি, a=48 এবং b=18।

    48 % 18 -> ভাগশেষ = 12
    তাই GCD(48, 18) = GCD(18, 12)
    
    18 % 12 -> ভাগশেষ = 6
    তাই GCD(18, 12) = GCD(12, 6)
    
    12 % 6 -> ভাগশেষ = 0
    সুতরাং GCD = 6

    GCD(48, 18) => GCD(18, 12) => GCD(12, 6) = 6


কেন এই সূত্র কাজ করে? যদি a-কে b দিয়ে ভাগ করলে ভাগশেষ r হয়, তাহলে a ও b-এর সাধারণ গুণনীয়কগুলো b ও r-এর সাধারণ গুণনীয়কের সমান থাকে। তাই বারবার ভাগশেষ নিয়ে GCD বের করা যায়।
*/
Object.defineProperty(exports, "__esModule", { value: true });
// using while loop
/* function gcd(a: number, b: number): number {
  while (b !== 0) {
    const remainder = a % b;
    a = b; // 2nd number is now 1st
    b = remainder; // remainder now 2nd number
  }

  return a; // no remainder, return b which is store in a means last reminder, here b becomes 0, the algorithm stops

  // Complexity
  // Time complexity: O(log(min(a,b)))
  // Space complexity: O(1)
} */
// Using recursion
/* function gcd(a: number, b: number): number {
  if (b === 0) {
    return a;
  }

  return gcd(b, a % b);

  // Complexity
  // Time complexity: O(log(min(a,b)))
  // Space complexity: O(log(min(a,b)))
} */
// Using a for loop (brute force)
function gcd(a, b) {
    let smaller = Math.min(a, b);
    for (let i = smaller; i >= 1; i--) {
        if (a % i === 0 && b % i === 0) {
            return i;
        }
    }
    return 0;
    // Complexity
    // Time complexity: O(min(a,b))
    // Space complexity: O(1)
}
console.log(gcd(12, 8)); // 4
console.log(gcd(15, 5)); // 5
console.log(gcd(7, 3)); // 1
console.log(gcd(10, 0)); // 10
console.log(gcd(0, 6)); // 6
console.log(gcd(0, 0)); // 0
console.log(gcd(100, 25)); // 25
console.log(gcd(9, 0)); // 9
console.log(gcd(1, 1)); // 1
//# sourceMappingURL=Greatest_Common_Divisor.js.map