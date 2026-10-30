"use strict";
/* Write a function trackElevator that simulates an elevator's movement given a starting floor, building bounds, and a sequence of movement commands.

The function takes four parameters:

    startFloor: The floor where the elevator starts.
    minFloor: The lowest floor allowed in the building.
    maxFloor: The highest floor allowed in the building.
    commands: An array of strings where each element is either "UP" or "DOWN".

Each "UP" command moves the elevator up by 1 floor (if it is not already at maxFloor). Each "DOWN" command moves the elevator down by 1 floor (if it is not already at minFloor). Commands that would move the elevator beyond the bounds are capped at the boundary.

Return the final floor number after all commands have been processed.

    Input: startFloor = 0, minFloor = 0, maxFloor = 10, commands = ["UP","UP","DOWN","UP"]

    Output: 2

    Explanation: Starts at 0, goes to 1, then 2, then down to 1, then up to 2.


    Input: startFloor = 9, minFloor = 0, maxFloor = 10, commands = ["UP","UP","UP","DOWN"]

    Output: 9

    Explanation: Starts at 9, goes to 10, stays at 10 on subsequent UP commands, then down to 9.


*/
Object.defineProperty(exports, "__esModule", { value: true });
// Complexity Analysis
// - Time Complexity: O(n) — Processes every command once.
// - Space Complexity: O(1) — 	Uses only one additional variable.
function trackElevator(startFloor, minFloor, maxFloor, commands) {
    // Initialize the elevator position
    let currentFloor = startFloor;
    for (const command of commands) {
        // Process each command
        if (command === "UP") {
            currentFloor++;
        }
        else if (command === "DOWN") {
            currentFloor--;
        }
        // Keep the elevator within building bounds
        currentFloor = Math.max(minFloor, Math.min(maxFloor, currentFloor));
        // Without Math.min() and Math.max()
        /* if (command === "UP" && currentFloor < maxFloor) {
          currentFloor++;
        } else if (command === "DOWN" && currentFloor > minFloor) {
          currentFloor--;
        } */
    }
    return currentFloor;
}
console.log(trackElevator(9, 1, 10, ["UP", "UP", "UP"])); // 10
console.log(trackElevator(2, 1, 10, ["DOWN", "DOWN", "DOWN"])); // 1
console.log(trackElevator(3, 1, 10, ["UP", "UP", "DOWN"])); // 4
console.log(trackElevator(5, 1, 10, [])); // 5
console.log(trackElevator(5, 1, 10, ["UP", "UP", "DOWN", "DOWN"])); // 5
console.log(trackElevator(0, 0, 10, ["UP", "UP", "DOWN", "UP"])); // 2
console.log(trackElevator(9, 0, 10, ["UP", "UP", "UP", "DOWN"])); // 9
//# sourceMappingURL=Elevator_Floor_Tracker.js.map