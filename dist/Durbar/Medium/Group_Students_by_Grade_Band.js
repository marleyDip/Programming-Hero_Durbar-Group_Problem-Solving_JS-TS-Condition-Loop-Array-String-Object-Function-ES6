"use strict";
/* You are given an array of student objects, each with a name (string) and marks (number). Your task is to group these students into different grade bands based on their marks.

The grade bands are defined as follows:

    A: Marks 80 or above
    B: Marks between 70 and 79 (inclusive)
    C: Marks between 60 and 69 (inclusive)
    F: Marks below 60

The function should return an object where the keys are the grade bands ('A', 'B', 'C', 'F') and the values are arrays of student objects belonging to that band. If a band has no students, its array should be empty.


  Hint 1. Consider using the `reduce` method to iterate over the students and build the result object.
  
  Hint 2. You'll need an initial accumulator object with `A`, `B`, `C`, and `F` keys, each mapped to an empty array.
  
  Hint 3. Use `if-else if-else` statements to determine which grade band a student belongs to based on their `marks`.

*/
Object.defineProperty(exports, "__esModule", { value: true });
// TypeScript extracts the keys ("A" | "B" | "C" | "D") and treats it exactly like this under the hood:
// type Grade = "A" | "B" | "C" | "D";
const getGrade = (marks) => {
    const gradeBands = [
        { grade: "A", min: 80 },
        { grade: "B", min: 70 },
        { grade: "C", min: 60 },
        { grade: "F", min: 0 },
    ];
    return gradeBands.find(({ min }) => marks >= min)?.grade || "F";
    // return gradeBands.find((band) => marks >= band.min).grade;
    // for (const { grade, min } of gradeBrands) {
    //   if (marks >= min) {
    //     return grade;
    //   }
    // }
    // return "F";
};
function groupStudentsByGradeBand(students) {
    const result = {
        A: [],
        B: [],
        C: [],
        F: [],
    };
    students.forEach((student) => {
        const grade = getGrade(student.marks);
        result[grade].push(student);
    });
    return result;
}
console.log(groupStudentsByGradeBand([
    { name: "Alice", marks: 85 },
    { name: "Bob", marks: 72 },
    { name: "Charlie", marks: 65 },
    { name: "David", marks: 55 },
])); // { A: [{ name: 'Alice', marks: 85 }], B: [{ name: 'Bob', marks: 72 }], C: [{ name: 'Charlie', marks: 65 }], F: [{ name: 'David', marks: 55 }] }
console.log(groupStudentsByGradeBand([])); // { A: [], B: [], C: [], F: [] }
console.log(groupStudentsByGradeBand([
    { marks: 85, name: "Alice" },
    { marks: 72, name: "Bob" },
    { marks: 58, name: "Charlie" },
    { marks: 91, name: "David" },
])); // { A: [{ marks: 85, name: 'Alice' }, { marks: 91, name: 'David' }], B: [{ marks: 72, name: 'Bob' }], C: [], F: [{ marks: 58, name: 'Charlie' }] }
console.log(groupStudentsByGradeBand([
    { marks: 65, name: "Eve" },
    { marks: 60, name: "Frank" },
])); // { A: [], B: [], C: [{ marks: 65, name: 'Eve' }], F: [{ marks: 60, name: 'Frank' }] }
console.log(groupStudentsByGradeBand([
    { name: "Sufian", marks: 85 },
    { name: "Rahim", marks: 91 },
])); // { A: [{ name: 'Sufian', marks: 85 }, { name: 'Rahim', marks: 91 }], B: [], C: [], F: [] }
//# sourceMappingURL=Group_Students_by_Grade_Band.js.map