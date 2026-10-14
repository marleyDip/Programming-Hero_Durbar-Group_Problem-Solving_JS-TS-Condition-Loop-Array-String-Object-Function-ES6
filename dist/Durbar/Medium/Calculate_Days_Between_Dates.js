"use strict";
/* Write a function daysBetweenDates that calculates the absolute number of whole days between two calendar dates given in YYYY-MM-DD format.

    The calculation must accurately account for varying month lengths and leap years. The dates can be provided in any order.

    `Date.UTC(year, monthIndex, day)` creates timestamps consistently without timezone-related offsets.

    1. Split the dates: Convert "2024-03-01" into [2024, 3, 1].
    
    2. Convert to UTC timestamps: Date.UTC() expects a zero-based month index, so subtract 1 from the month.
    
    3. Find the difference: Subtract the timestamps and use Math.abs() so the dates can be in either order.
    
    4. Convert milliseconds to days: Divide by 86,400,000 milliseconds per day.
*/
Object.defineProperty(exports, "__esModule", { value: true });
const toTimestamp = (date) => {
    const [year, month, day] = date.split("-").map(Number);
    if (year === undefined || month === undefined) {
        return 0;
    }
    return new Date(Date.UTC(year, month - 1, day)).getTime();
};
function daysBetweenDates(date1, date2) {
    const difference = toTimestamp(date1) - toTimestamp(date2);
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    return Math.abs(difference) / millisecondsPerDay;
    // return Math.abs(difference) / 86400000;
    // Time complexity: O(1), because each date has a fixed number of components.
}
/* function daysBetweenDates(date1: string, date2: string): number {
  const [year1, month1, day1] = date1.split("-").map(Number);
  const [year2, month2, day2] = date2.split("-").map(Number);

  if (
    year1 === undefined ||
    month1 === undefined ||
    day1 === undefined ||
    year2 === undefined ||
    month2 === undefined ||
    day2 === undefined
  ) {
    return 0;
  }

  const timeStamp1 = Date.UTC(year1, month1 - 1, day1);
  const timeStamp2 = Date.UTC(year2, month2 - 1, day2);

  const millisecondsPerDay = 1000 * 60 * 60 * 24;

  return Math.abs(timeStamp1 - timeStamp2) / millisecondsPerDay;
} */
console.log(daysBetweenDates("2020-01-15", "2020-01-20")); // 5
console.log(daysBetweenDates("2020-01-15", "2019-12-31")); // 15
console.log(daysBetweenDates("2024-03-01", "2024-02-28")); // 2
console.log(daysBetweenDates("2024-02-25", "2024-02-29")); // 4
//# sourceMappingURL=Calculate_Days_Between_Dates.js.map