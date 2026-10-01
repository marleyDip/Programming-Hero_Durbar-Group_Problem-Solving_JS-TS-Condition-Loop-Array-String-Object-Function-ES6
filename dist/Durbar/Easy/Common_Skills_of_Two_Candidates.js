"use strict";
/* Given two arrays of candidate skill names, find all skills shared by both candidates.

The comparison must be case-insensitive. The returned array must:

    Contain each shared skill converted to lowercase.
    Contain no duplicate values.
    Be sorted alphabetically in ascending order.


Input: skills1 = ["JS","React","Node"], skills2 = ["react","css","js"]

Output: ["js","react"]

Explanation: Matching skills are "js" and "react", returned in alphabetical order.

*/
Object.defineProperty(exports, "__esModule", { value: true });
// function commonSkills(skills1: string[], skills2: string[]): string[] {}
// Using new Set() and for...of loop, filter() & includes() methods, and sort() method, forEach() method, and reduce() method
/* function findSharedSkills(skills1: string[], skills2: string[]): string[] {
  // Set automatically prevents duplicates.
  const normalizedSkill2 = new Set(skills2.map((skill) => skill.toLowerCase()));

  // console.log(candidate2); // Set(2) { 'react', 'javascript' }

  const shared = new Set<string>();

  // skills1.forEach((skill) => {});
  
  for (const skill of skills1) {
    const normalizedSkill = skill.toLowerCase();

    if (normalizedSkill2.has(normalizedSkill)) {
      shared.add(normalizedSkill);
    }
  }

  // const shared = skills1.reduce((result, skill) => {}, new Set<string>());

  return [...shared].sort();

  // Complexity
  // If n and m are the lengths of the two arrays:

  // Building the Set: O(m)
  // Searching candidate 1: O(n) average
  // Sorting shared skills: O(k log k), where k is the number of unique

  // shared skills
  // Extra space: O(m + k)

  // Time: O(n + m + k log k)
  // Space: O(m + k)

  const normalizedSkill = skills2.map((skill) => skill.toLowerCase());

  return [
    ...new Set(
      skills1
        .map((skill) => skill.toLowerCase())
        .filter((skill) => normalizedSkill.includes(skill)),
    ),
  ].sort();
} */
// Without SET - Basic for loops and Normalize first, then use nested for...of loops and some() method, and sort() method
function findSharedSkills(skills1, skills2) {
    const normalizedSkills1 = skills1.map((skill) => skill.toLowerCase());
    const normalizedSkills2 = skills2.map((skill) => skill.toLowerCase());
    const shared = [];
    for (const skill1 of normalizedSkills1) {
        for (const skill2 of normalizedSkills2) {
            if (skill1 === skill2 && !shared.includes(skill1)) {
                shared.push(skill1);
                break;
            }
        }
    }
    // for (let i = 0; i < skills1.length; i++) {
    //   const normalizedSkill1 = skills1[i]!.toLowerCase();
    //   for (let j = 0; j < skills2.length; j++) {
    //     const normalizedSkill2 = skills2[j]!.toLowerCase();
    //     if (
    //       normalizedSkill1 === normalizedSkill2 &&
    //       !shared.includes(normalizedSkill1)
    //     ) {
    //       shared.push(normalizedSkill1);
    //       break; // Exit the inner loop once a match is found to avoid duplicates
    //     }
    //   }
    // }
    // for (const skill of skills1) {
    //   const normalizedSkill = skill.toLowerCase();
    //   // const exits
    //   const isShared = skills2.some(
    //     (otherSkill) => otherSkill.toLowerCase() === normalizedSkill,
    //   );
    //   if (isShared && !shared.includes(normalizedSkill)) {
    //     shared.push(normalizedSkill);
    //   }
    // }
    return shared.sort();
    // Complexity
    // If n and m are the lengths of the two arrays:
    // Time: O(n * m) - Nested loops
    // Space: O(k) - Where k is the number of unique shared skills
}
console.log(findSharedSkills(["JavaScript", "React"], ["Python", "Go"])); // []
console.log(findSharedSkills(["React", "React", "JavaScript"], ["REACT", "react", "JAVASCRIPT"])); // ["javascript", "react"]
console.log(findSharedSkills(["JavaScript", "REACT"], ["javascript", "react"])); // ["javascript", "react"]
console.log(findSharedSkills([], ["React"])); // []
console.log(findSharedSkills([], [])); // []
console.log(findSharedSkills(["JS", "React", "Node"], ["react", "css", "js"])); // [ 'js', 'react' ]
console.log(findSharedSkills(["Python", "SQL"], ["Java", "C++"])); // []
//# sourceMappingURL=Common_Skills_of_Two_Candidates.js.map