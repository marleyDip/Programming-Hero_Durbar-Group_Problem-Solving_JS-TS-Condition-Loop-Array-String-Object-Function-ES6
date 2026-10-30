/* Convert a non-negative integer representing total seconds into a formatted string in HH:MM:SS format.

    Hours (HH): Total whole hours, padded with leading zeros to at least 2 digits.
    
    Minutes (MM): Remaining minutes (00–59), padded to 2 digits.
    
    Seconds (SS): Remaining seconds (00–59), padded to 2 digits.

Examples
    formatCountdown(3661) returns "01:01:01".
    formatCountdown(59) returns "00:00:59".

How it works
    1. Hours: Divide total seconds by 3600 and use Math.floor().
    2. Minutes: Get the remaining seconds using % 3600, then divide by 60.
    3. Seconds: Use % 60 to get the remaining seconds.
    4. padStart(2, "0"): Ensures every part has at least 2 digits.

string.padStart(targetLength, padString (Optional))

const str = "5";
console.log(str.padStart(3)); // Output: "  5" (Total length is 3)

const hours = "9";
console.log(hours.padStart(2, "0")); // Output: "09"

const score = "42";
console.log(score.padStart(5, "0")); // Output: "00042"

const str = "abc";
console.log(str.padStart(10, "12345")); // Output: "1234512abc" (Pads with "1234512" to hit length 10)

const num = 7;
// num.padStart(3, "0"); // Error!
console.log(num.toString().padStart(3, "0")); // Output: "007"

*/

// Using division, modulo (%), and padStart()
// Complexity Analysis
// - Time Complexity: O(1) — Fixed number of mathematical operations.
// - Space Complexity: O(1) — Only a few variables are used.
function formatCountdown(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // Using toString().padStart() with an array
  return [hours, minutes, seconds]
    .map((time) => String(time).padStart(2, "0"))
    .join(":");

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  // Using toLocaleString() - Good alternative
  const format = (value: number) =>
    value.toLocaleString("en-us", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });

  return `${format(hours)}:${format(minutes)}:${format(seconds)}`;

  // Using destructuring and array mapping - Clean and concise
  const time = [
    Math.floor(totalSeconds / 3600),
    Math.floor((totalSeconds % 3600) / 60),
    totalSeconds % 60,
  ];

  // `${value}` - this make it Number to String
  return time.map((value) => `${value}`.padStart(2, "0")).join(":");

  // Using a helper function - Beginner-friendly
  function pad(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

console.log(formatCountdown(0));
console.log(formatCountdown(59));
console.log(formatCountdown(60));
console.log(formatCountdown(3600));
console.log(formatCountdown(3661));
console.log(formatCountdown(86399));
console.log(formatCountdown(90061));

// Important: Hours are not restricted to 23. For example, 90000 seconds gives "25:00:00", not "01:00:00".
console.log(formatCountdown(90000));
