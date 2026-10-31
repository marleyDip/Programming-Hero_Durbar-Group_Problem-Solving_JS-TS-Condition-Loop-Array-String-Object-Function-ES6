/* Given an array of tasks where each task is represented as [start, finish], return the maximum number of tasks a single person can complete without any overlapping intervals.

Two tasks overlap if one starts before the other finishes 
    (i.e. start2 < finish1 when start1 <= start2). 
However, a task that starts at the exact same time another task finishes (e.g., [1, 3] and [3, 5]) is considered non-overlapping.

Example:
    Input: tasks = [[1,4],[2,3],[3,5],[7,9]]
    Output: 3
    Explanation: Selecting tasks [2, 3], [3, 5], and [7, 9] yields 3 non-overlapping tasks.

    start2 < finish1 when start1 <= start2
    [1,4],[2,3] → overlap 
    2 < 4 when 1 <= 2


    Hint 1. Sort the tasks by their finish time in ascending order.
    
    Hint 2. Iterate through the sorted tasks and greedily pick any task whose start time is greater than or equal to the finish time of the last selected task.

=> This problem is a classic Activity Selection Problem (also called the Interval Scheduling Problem).

=> The best strategy is a Greedy Algorithm: always choose the task that finishes earliest. This leaves as much time as possible for the remaining tasks.

    Topics
    arrays, greedy algorithms, scheduling
*/

// Complexity
// - Time: O(n log n) —Sorting tasks. The sorting step is the most expensive part.
// - Space: O(n) — Creating a sorted copy.

// Using Greedy & Sorting
function maxTasks(tasks: [number, number][]): number {
  // Step 1: Sort tasks by their finish time - [start, finish]
  const sortedTasks = [...tasks].sort((a, b) => a[1] - b[1]);
  // console.log(sortedTasks);

  let count = 0;
  let lastFinish = -Infinity;

  // Step 2: Select non-overlapping tasks
  for (const [start, finish] of sortedTasks) {
    //console.log("Starting point of Task", start);
    // console.log("Finishing point of Task", finish);

    // A task can be selected if it starts
    // at or after the previous task finishes
    if (start >= lastFinish) {
      count++;
      lastFinish = finish;

      // console.log("Last finishing point of Previous Task", lastFinish);
    }
  }

  return count;
}

/* 
Task	Condition	    Decision
[1, 3]	1 >= -Infinity	Select
[2, 5]	2 >= 3	        Skip
[3, 5]	3 >= 3	        Select
[5, 7]	5 >= 5	        Select
[6, 8]	6 >= 7	        Skip 
*/

const tasks: [number, number][] = [
  [1, 3],
  [2, 5],
  [3, 5],
  [6, 8],
  [5, 7],
]; // 3

console.log(maxTasks(tasks));

console.log(
  maxTasks([
    [1, 4],
    [2, 3],
    [3, 5],
    [7, 9],
  ]),
); // 3

console.log(
  maxTasks([
    [1, 2],
    [2, 3],
    [3, 4],
  ]),
); // 3
