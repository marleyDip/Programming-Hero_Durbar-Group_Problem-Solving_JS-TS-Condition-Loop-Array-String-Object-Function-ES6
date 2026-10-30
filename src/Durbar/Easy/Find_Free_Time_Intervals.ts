/* Given a list of booked time intervals and a working-day time range, return all available time intervals when no booking exists. All time values are numbers representing points in time (e.g., minutes from midnight).

Booked intervals may overlap with each other or extend beyond the working hours. The output should be a list of non-overlapping intervals, sorted by their start times.

Example:
    Input: bookedIntervals = [[10,12],[14,16]], 
    workingHours = [9,17]
    Output: [[9,10],[12,14],[16,17]]
*/

/* Complexity Analysis
Let n represent the number of booked intervals.

Operation	         Time complexity
Clipping intervals	 O(n)
Sorting	             O(n log n)
Merging intervals	 O(n)
Finding free time	 O(n)
Overall	             O(n log n)

Space complexity: O(n) for storing sorted, merged, and available intervals. */

function findFreeTime(
  bookedIntervals: number[][],
  workingHours: [number, number],
): number[][] {
  const [start, end] = workingHours;

  // Step 1: Keep only bookings inside working hours
  const bookings = bookedIntervals
    .map((interval): [number, number] | null => {
      const [bookingStart, bookingEnd] = interval;

      if (bookingStart === undefined || bookingEnd === undefined) return null;

      return [Math.max(start, bookingStart), Math.min(end, bookingEnd)];
    })
    .filter((interval): interval is [number, number] => interval !== null)
    .filter(([bookingStart, bookingEnd]) => bookingStart < bookingEnd)
    .sort((a, b) => a[0] - b[0]);

  // Step 2: Merge overlapping bookings
  const merged: [number, number][] = [];

  for (const booking of bookings) {
    const last = merged[merged.length - 1];

    if (!last || booking[0] > last[1]) {
      merged.push([...booking]);
    } else {
      last[1] = Math.max(last[1], booking[1]);
    }
  }

  // Step 3: Find free time gaps
  const freeTime: [number, number][] = [];
  let currentTime = start;

  for (const booking of merged) {
    if (currentTime < booking[0]) {
      freeTime.push([currentTime, booking[0]]);
    }

    currentTime = booking[1];
  }

  // Without merged Array
  /* for (const [bookingStart, bookingEnd] of bookings) {
    if (bookingStart > currentTime) {
      freeTime.push([currentTime, bookingStart]);
    }

    currentTime = Math.max(currentTime, bookingEnd);
  } */

  // Step 4: Check remaining time after the last booking
  if (currentTime < end) {
    freeTime.push([currentTime, end]);
  }

  return freeTime;
}

const bookedIntervals = [
  [9, 11],
  [10, 12],
  [13, 14],
  [15, 16],
  [15.5, 17],
];

const workingHours: [number, number] = [9, 18];

console.log(findFreeTime(bookedIntervals, workingHours));

// No bookings
console.log(findFreeTime([], [9, 18])); // [[9, 18]]

// Entire working day booked
console.log(findFreeTime([[9, 18]], [9, 18])); // []

// One booking
console.log(findFreeTime([[10, 12]], [9, 18])); // [[9, 10], [12, 18]]

// Overlapping bookings
console.log(
  findFreeTime(
    [
      [9, 12],
      [10, 14],
      [13, 16],
    ],
    [9, 18],
  ),
); // [[16, 18]]

// Bookings outside working hours
console.log(
  findFreeTime(
    [
      [7, 9],
      [18, 20],
    ],
    [9, 18],
  ),
); // [[9, 18]]

// Unsorted bookings
console.log(
  findFreeTime(
    [
      [14, 15],
      [10, 11],
      [12, 13],
    ],
    [9, 18],
  ),
); // [[9, 10], [11, 12], [13, 14], [15, 18]]

// Duplicate bookings
console.log(
  findFreeTime(
    [
      [10, 12],
      [10, 12],
      [10, 12],
    ],
    [9, 18],
  ),
); // [[9, 10], [12, 18]]
