"use strict";
/* Given an array of student attendance records, generate a formatted report string for each student.

Each student record is an object with the following properties:

    name (string): The student's name.
    present (number): The number of sessions attended.
    total (number): The total number of sessions.
    
For each student:
    Calculate their attendance percentage rounded to the nearest integer using Math.round((present / total) * 100).
    
    Determine their status based on this rounded percentage:
        90% and above: "Excellent"
        75% through 89%: "Good"
        Below 75%: "At Risk"

Format the result as "<name>: <present>/<total> (<percentage>%) - <status>".
Return an array of these formatted strings in the same order as the input.

Examples:
formatAttendanceReport([{ name: "Rafi", present: 18, total: 20 }]);
// ["Rafi: 18/20 (90%) - Excellent"]

formatAttendanceReport([
  { name: "Lina", present: 15, total: 20 },
  { name: "Sam", present: 12, total: 20 }
]);
// ["Lina: 15/20 (75%) - Good", "Sam: 12/20 (60%) - At

    Hint 1. Use Array.prototype.map to transform each student record into a formatted string.
    
    Hint 2. Calculate the percentage using Math.round((present / total) * 100) before checking conditions.
    
    Hint 3. Use template literals (`${...}`) to build the output string.
    
map() means: "Transform every item into another item."

reduce() means: "Combine many items into one result."

*/
Object.defineProperty(exports, "__esModule", { value: true });
function getStatus(percentage) {
    if (percentage >= 90) {
        return "Excellent";
    }
    if (percentage >= 75)
        return "Good";
    return "At Risk";
    switch (true) {
        case percentage >= 90:
            return "Excellent";
        case percentage >= 90:
            return "Good";
        default:
            return "At Risk";
    }
}
/* function formatAttendanceReport(students: Student[]): string[] {
  return students.map((student) => {
    const percentage = Math.round((student.present / student.total) * 100);

    // console.log("Total percentage", percentage);

    const status: "Excellent" | "Good" | "At Risk" =
      percentage >= 90 ? "Excellent" : percentage >= 75 ? "Good" : "At Risk";

    // const status = getStatus(percentage);

    return `${student.name}: ${student.present}/${student.total} (${percentage}%) - ${status}`;
    
    return `${student.name}: ${student.present}/${student.total} (${percentage}%) - ${getStatus(percentage)}`;
  });

  // Complexity
  // Time: O(n)
  // Space: O(n) because we create a new array containing n report strings.
} */
// for loop and for...of loop
/* function formatAttendanceReport(students: Student[]): string[] {
  const reports: string[] = [];

  //   for (let i = 0; i < students.length; i++) {
  //     const student = students[i];
  //     if (!student) continue;

  // for (let student of students) {

  students.forEach((student) => {
    const percentage = Math.round((student.present / student.total) * 100);

    let status: "Excellent" | "Good" | "At Risk";

    if (percentage >= 90) {
      status = "Excellent";
    } else if (percentage >= 75) {
      status = "Good";
    } else {
      status = "At Risk";
    }

    reports.push(
      `${student.name}: ${student.present}/${student.total} (${percentage}%) - ${status}`,
    );
  });

  return reports;

  // Complexity
  // Time: O(n)
  // Space: O(n) because we create a new array containing n report strings.
} */
// Using Reduce & Lookup Array
function formatAttendanceReport(students) {
    // This approach is useful when have many status rules.
    // CRITICAL: Keep these sorted from highest 'min' to lowest 'min'
    const statusRules = [
        { min: 90, status: "Excellent" },
        { min: 75, status: "Good" },
        { min: 0, status: "At Risk" },
    ];
    return students.reduce((reports, student) => {
        // Avoid Division by Zero if a student has 0 total classes
        const percentage = student.total > 0
            ? Math.round((student.present / student.total) * 100)
            : 0;
        // TypeScript infers the fallback object type literally: { min: number, status: "At Risk" }
        const rule = statusRules.find((rule) => percentage >= rule.min) ?? {
            min: 0,
            status: "At Risk",
        };
        reports.push(`${student.name}: ${student.present}/${student.total} (${percentage}%) - ${rule?.status}`);
        return reports;
    }, []);
}
console.log(formatAttendanceReport([{ name: "Rafi", present: 18, total: 20 }])); // ["Rafi: 18/20 (90%) - Excellent"]);
console.log(formatAttendanceReport([
    { name: "Lina", present: 15, total: 20 },
    { name: "Sam", present: 12, total: 20 },
]));
console.log(formatAttendanceReport([
    { name: "Rahim", present: 18, total: 20 },
    { name: "Karim", present: 15, total: 20 },
    { name: "Hasan", present: 12, total: 20 },
]));
//# sourceMappingURL=Attendance_Report_Printer.js.map