"use strict";
/* Given an array of student objects, assign competition ranks to each student based on their score and return a new array of student objects sorted by score in descending order.

Rules
    - Students are sorted by score from highest to lowest.
    
    - If multiple students have equal scores, they receive the same rank, and their original relative order should be preserved.
    
    - Ranks skip according to the standard competition ranking method (1224 ranking). For example, if two students tie for rank 1, the next student gets rank 3.
    
    - Each student object in the output should include all original properties plus a rank property.

Example
    Input:
        rankStudents([
            { name: "Alice", score: 90 },
            { name: "Bob", score: 95 },
            { name: "Charlie", score: 90 },
            { name: "David", score: 85 }
        ]);

    Output:
        [
            { name: "Bob", score: 95, rank: 1 },
            { name: "Alice", score: 90, rank: 2 },
            { name: "Charlie", score: 90, rank: 2 },
            { name: "David", score: 85, rank: 4 }
        ]

    Input:
        rankStudents([
            { name: "Eva", score: 100 },
            { name: "Frank", score: 100 },
            { name: "Grace", score: 100 }
        ]);

    Output:
        [
            { name: "Eva", score: 100, rank: 1 },
            { name: "Frank", score: 100, rank: 1 },
            { name: "Grace", score: 100, rank: 1 }
        ]


Key learning: Remember the difference between competition ranking and dense ranking:

Scores	Competition (1224)	Dense (1234)
100	    1	                1
100	    1	                1
90	    3	                2
90	    3	                2
80	    5	                3

For this problem, always use competition ranking (1224).
*/
Object.defineProperty(exports, "__esModule", { value: true });
// Using map
function rankStudents(students) {
    const sortedStudents = [...students].sort((a, b) => b.score - a.score);
    // console.log(sortedStudents);
    let currentRank = 0;
    return sortedStudents.map((student, index) => {
        if (index === 0 || student.score !== sortedStudents[index - 1]?.score) {
            currentRank = index + 1;
        }
        return { ...student, rank: currentRank };
    });
}
// Using for Loop
/* function rankStudents(students: Student[]): RankedStudent[] {
  const sortedStudents = [...students].sort((a, b) => b.score - a.score);
  // console.log(sortedStudents);

  const result: RankedStudent[] = [];

  for (let i = 0; i < sortedStudents.length; i++) {
    // Cache the previous result item safely
    const prevResult = result[i - 1];

    // Check if the previous item exists AND has the same score
    const rank =
      i > 0 &&
      prevResult &&
      sortedStudents[i]?.score === sortedStudents[i - 1]?.score
        ? prevResult.rank
        : i + 1;

    // const rank = prevResult
    //   ? sortedStudents[i]!.score === sortedStudents[i - 1]!.score
    //     ? prevResult.rank
    //     : i + 1
    //   : i + 1;

    result.push({
      ...sortedStudents[i]!,
      rank,
    });
  }

  return result;
} */
// Using reduce
/* function rankStudents(students: Student[]): RankedStudent[] {
  return [...students]
    .sort((a, b) => b.score - a.score)
    .reduce<RankedStudent[]>((acc, student, i) => {
      const previousStudent = acc[i - 1];

      const rank =
        previousStudent && student.score === previousStudent.score
          ? previousStudent.rank
          : i + 1;

      acc.push({ ...student, rank });
      return acc;
    }, []);
} */
const students = [
    { name: "Rahim", score: 90 },
    { name: "Karim", score: 100 },
    { name: "Sufian", score: 90 },
    { name: "Hasan", score: 80 },
    { name: "Nayeem", score: 100 },
    { name: "Rafi", score: 70 },
];
console.log(rankStudents(students));
/*
[
  { name: "Karim", score: 100, rank: 1 },
  { name: "Nayeem", score: 100, rank: 1 },
  { name: "Rahim", score: 90, rank: 3 },
  { name: "Sufian", score: 90, rank: 3 },
  { name: "Hasan", score: 80, rank: 5 },
  { name: "Rafi", score: 70, rank: 6 }
]
*/
console.log(rankStudents([
    { name: "Alice", score: 90 },
    { name: "Bob", score: 95 },
    { name: "Charlie", score: 90 },
    { name: "David", score: 85 },
]));
console.log(rankStudents([
    { name: "Eva", score: 100 },
    { name: "Frank", score: 100 },
    { name: "Grace", score: 100 },
]));
console.log(rankStudents([]));
console.log(rankStudents([{ name: "A", score: 90 }]));
console.log(rankStudents([
    { name: "A", score: 100 },
    { name: "B", score: 90 },
    { name: "C", score: 80 },
]));
//# sourceMappingURL=Student_Ranking_with_Ties.js.map