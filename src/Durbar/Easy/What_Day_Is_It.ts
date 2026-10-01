/* Write a function that takes a year, month, and day as numbers and returns the name of the weekday for that date.

Note that the month parameter is 1-indexed (1 for January, 2 for February, ..., 12 for December).

    Input: year = 2024, month = 5, day = 11
    Output: "Saturday"
    Explanation: May 11, 2024 was a Saturday.

    Hint 1. JavaScript's Date constructor takes a 0-indexed month (0 for January, 11 for December).

    Hint 2. You can use the `.getDay()` method of a Date object, which returns 0 for Sunday, 1 for Monday, etc.

    Hint 3. Store the names of the weekdays in an array and use the result of `.getDay()` as the index.


*/

function getWeekday(year: number, month: number, day: number): string {
  const date = new Date(year, month - 1, day);

  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // console.log(date.getDay()); // 0, 1, ...
  return weekdays[date.getDay()]!; // weekdays[index]

  // return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date);

  // Complexity
  // Time: O(1)
  // Space: O(1)

  return new Date(year, month - 1, day).toLocaleString("en-US", {
    weekday: "long",
  });
}

console.log(getWeekday(2026, 9, 30)); // Wednesday

console.log(getWeekday(2026, 1, 1)); // Thursday

console.log(getWeekday(2025, 12, 25)); // Thursday

console.log(getWeekday(2024, 2, 29)); // Thursday

console.log(getWeekday(2024, 7, 4)); // Thursday
