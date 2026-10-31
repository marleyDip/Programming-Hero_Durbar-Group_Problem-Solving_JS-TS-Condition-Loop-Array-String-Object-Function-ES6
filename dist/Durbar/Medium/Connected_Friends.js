"use strict";
/* Given an array of undirected friendships represented as pairs of names [person1, person2], and a startPerson, return the total number of people in the connected network starting from startPerson (including startPerson themselves).

    Friendships are mutual.
    
    If person A is friends with B, and B is friends with C, then A, B, and C are all in the same connected network.

If startPerson has no listed friendships, the size of their network is 1 (just themselves).

Example:
    Input: friendships = [["Alice","Bob"],["Bob","Charlie"],["David","Eve"]], startPerson = "Alice"

    Output: 3

    Explanation: Alice is connected to Bob, and Bob is connected to Charlie. Total connected network size is 3.


    Hint 1. Build an adjacency list (a Map where key is a person and value is an array of their friends).
    
    Hint 2. Use a traversal algorithm like BFS or DFS starting from startPerson.
    
    Hint 3. Keep track of visited people using a Set to avoid infinite loops in cycles and return the size of the set.

    Topics
    graphs, traversal, sets, breadth-first-search

    This problem is a classic Graph Traversal problem. You can solve it using either DFS (Depth-First Search) or BFS (Breadth-First Search).
    
    The easiest approach to understand first is DFS + Set + Adjacency List.

Note: For very large graphs, repeatedly calling shift() can be inefficient. You can use a queue index instead.

My recommendation: Learn both DFS and BFS. They solve the same connectivity problem, but DFS uses recursion (or a stack), while BFS uses a queue.

Remember this pattern: Whenever a problem asks for the number of people, nodes, or items connected to a starting point, think about graph traversal using DFS or BFS.
*/
Object.defineProperty(exports, "__esModule", { value: true });
/*
interface UserInfo {
  age: number;
  role: string;
}

// Every key must be a string; every value must match the UserInfo interface
const userRegistry: Record<string, UserInfo> = {
  alice123: { age: 28, role: "admin" },
  bob99: { age: 34, role: "user" }
};


type AppTheme = "light" | "dark" | "highContrast";

const themeColors: Record<AppTheme, string> = {
  light: "#ffffff",
  dark: "#000000",
  highContrast: "#ff00ff" // If you omit this, TypeScript flags an error
};



*/
/* Complexity analysis
Let:
    - V = number of unique people.
    - E = number of friendship pairs.

Complexity	Cost	Reason
Time	O(V + E)	Build graph and visit each person and friendship
Space	O(V + E)	Adjacency list and visited set
*/
// Using DFS - uses recursion (or a stack) - Last-In, First-Out (LIFO)
function countConnectedFriends(friendships, startPerson) {
    // Step 1: Build an adjacency list
    // The Record<Keys, Type> Utility Type
    // It's simply an object that stores each person's friends.
    const graph = {};
    for (const [person1, person2] of friendships) {
        if (person1 === undefined || person2 === undefined)
            continue;
        // ["A", "B"] => Creates an empty array for A if A doesn't exist. graph["A"] = [];
        if (!graph[person1]) {
            graph[person1] = [];
        }
        if (!graph[person2])
            graph[person2] = [];
        // Friendships are undirected, so we must store both directions.
        graph[person1].push(person2);
        graph[person2].push(person1);
        // console.log(graph);
    }
    // console.log(graph);
    /* {
      Alice: [ 'Bob' ],
      Bob: [ 'Alice', 'Charlie' ],
      Charlie: [ 'Bob' ],
      David: [ 'Eve' ],
      Eve: [ 'David' ]
    } */
    // Step 2: Track visited people
    // A person can be reached through multiple friendship paths. The Set prevents counting or visiting the same person repeatedly.
    const visited = new Set();
    // Step 3: DFS traversal
    function dfs(person) {
        // console.log(person); // Alice Bob Alice Charlie Bob
        // console.log(visited.has(person)); // false false true false true
        if (visited.has(person))
            return;
        // console.log(visited.add(person)); // Set(3) { 'Alice', 'Bob', 'Charlie' }
        visited.add(person);
        // If startPerson has no listed friendships, they won't exist in the graph. The empty array ensures DFS simply stops, and the answer remains 1.
        for (const friend of graph[person] ?? []) {
            // console.log(friend); // Bob Alice Charlie Bob
            dfs(friend);
        }
    }
    dfs(startPerson);
    // Step 4: Return the number of connected people
    return visited.size;
}
// You can also solve this iteratively using a queue. This avoids recursive function calls and potential stack overflow on very large networks.
// Using BFS - uses a queue - First-In, First-Out (FIFO)
/* function countConnectedFriends(
  friendships: string[][],
  startPerson: string,
): number {
  const graph: Record<string, string[]> = {};

  // Build the graph
  for (const [person1, person2] of friendships) {
    if (person1 === undefined || person2 === undefined) continue;
    if (!graph[person1]) graph[person1] = [];
    if (!graph[person2]) graph[person2] = [];

    graph[person1].push(person2);
    graph[person2].push(person1);
  }

  const visited = new Set<string>([startPerson]);
  // console.log(visited); // Set(1) { 'Alice' }

  const queue: string[] = [startPerson];
  // console.log(queue); // [ 'Alice' ]

  // BFS traversal
  while (queue.length > 0) {
    const person = queue.shift()!;
    // console.log(queue); // []

    for (const friend of graph[person] ?? []) {
      if (!visited.has(friend)) {
        // console.log(visited.add(friend)); // Set(2) { 'Alice', 'Bob' }, Set(3) { 'Alice', 'Bob', 'Charlie' }
        visited.add(friend);

        queue.push(friend);
        // console.log(queue); // [ 'Bob' ], [ 'Charlie' ]
      }
    }
  }

  return visited.size;
} */
console.log(countConnectedFriends([
    ["Alice", "Bob"],
    ["Bob", "Charlie"],
    ["David", "Eve"],
], "Alice")); // 3
console.log(countConnectedFriends([
    ["Alice", "Bob"],
    ["Charlie", "David"],
], "Eve")); // 1
//# sourceMappingURL=Connected_Friends.js.map