/* Simulate a customer service ticket line based on a list of event commands. Your function should process the commands in order and return an object with two arrays: queue (the people still waiting, in order from front to back) and served (the people who were served, in the order they were served).

The possible commands are:

    = "join <name>": Adds <name> to the back of the queue. If someone with that name is already in the queue, ignore the command.
    
    = "leave <name>": Removes <name> from the queue if they are currently waiting. If they are not in the queue, ignore the command.
    
    = "serve": Removes the person at the front of the queue and appends their name to served. If the queue is empty, do nothing.

Note: A person who has been served is no longer in the queue and may join again later.

  Hint 1. Use an array for the queue and another array for the served history.

  Hint 2. Notice that `join ` has 5 characters and `leave ` has 6 characters; you can extract the name by slicing the command.

  Hint 3. Check if the person is already in the queue with `queue.includes(name)` before adding them.

*/

interface QueueResult {
  queue: string[];
  served: string[];
}

// Using forEach(), for...of, traditional for loop
/* function simulateTicketQueue(commands: string[]): QueueResult {
  const queue: string[] = [];
  const served: string[] = [];

  // console.log("Commands:", commands);

  // for (let i = 0; i < commands.length; i++) {
  //   const parts = commands[i].split(" "); // [ 'join', 'Alice' ]
  //   const action = parts[0]; // 'join'
  //   const name = parts[1]; // 'Alice'
  //   const name = parts.slice(1).join(" "); // 'Alice'
  // }

  // for (const command of commands) {
  
  commands.forEach((command) => {
    // console.log("Processing command:", command); // join Alice

    // console.log("Processing command:", command.split(" ")); // [ 'join', 'Alice' ]

    const [action, name] = command.split(" ");
    // const name = nameParts.join(" ");

    // console.log("Action:", action, "Name:", name);

    if (action === "join") {
      // Adds a person to the back of the queue. Use includes() first to prevent duplicate names among people who are waiting.
      if (name && !queue.includes(name)) {
        queue.push(name);
      }
    } else if (action === "leave") {
      // Removes a person from the queue if they are currently waiting.
      if (!name) return;
      const index = queue.indexOf(name);

      // console.log("Index of", name, "in queue:", index); // Index of Bob in queue: 1

      // Find the person's position, then remove them only if the index is not -1.
      if (index !== -1) {
        queue.splice(index, 1);
      }
    } else if (action === "serve") {
      // shift() removes the first person waiting; push() appends them to the served list.
      if (queue.length > 0) {
        served.push(queue.shift()!);
      }
    }
  });

  return { queue, served };

  // Complexity
  // Let n be the number of commands and q the maximum queue size.
  // Time: Up to O(nq) with this array-based approach, because includes(), indexOf(), splice(), and shift() can take O(q) per command.
  // Space: O(q+s), where s is the number of people served, excluding the input commands.
} */

// Using reduce()
function simulateTicketQueue(commands: string[]): QueueResult {
  // The accumulator contains the current state: { queue: [], served: [] }
  // Each command updates that state before the next command is processed.

  return commands.reduce(
    (result, command) => {
      const [action, name] = command.split(" ");

      if (action === "join") {
        if (name && !result.queue.includes(name)) {
          result.queue.push(name);
        }
      } else if (action === "leave") {
        if (!name) return result;
        const index = result.queue.indexOf(name);

        if (index !== -1) {
          result.queue.splice(index, 1);
        }
      } else if (action === "serve") {
        if (result.queue.length > 0) {
          result.served.push(result.queue.shift()!);
        }
      }

      return result;
    },
    { queue: [] as string[], served: [] as string[] },
    // { queue: [], served: [] } as QueueResult, // Type assertion to satisfy TypeScript
  );
}

console.log(
  simulateTicketQueue([
    "join Alice",
    "join Bob",
    "serve",
    "join Charlie",
    "leave Bob",
    "serve",
    "join Alice",
    "serve",
    "serve",
  ]),
); // { queue: [], served: ['Alice', 'Charlie', 'Alice'] }

// Empty command
console.log(simulateTicketQueue([])); // { queue: [], served: [] }

// Serving an empty queue
console.log(simulateTicketQueue(["serve"])); // { queue: [], served: [] }

// Duplicate join
console.log(simulateTicketQueue(["join Alice", "join Alice"])); // { queue: ['Alice'], served: [] }

// Leaving a person who isn't waiting
console.log(simulateTicketQueue(["leave Bob"])); // { queue: [], served: [] }

// A served person can join again
console.log(simulateTicketQueue(["join Alice", "serve", "join Alice"])); // { queue: ['Alice'], served: ['Alice'] }

// Leaving someone from the middle
console.log(
  simulateTicketQueue(["join Alice", "join Bob", "join Charlie", "leave Bob"]),
); // { queue: ['Alice', 'Charlie'], served: [] }
