"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function convertCase(str) {
    let results = "";
    /* for (const char of str) { // 👈 Safely iterates over characters directly
        if (/[a-z]/.test(char)) {
          results += char.toUpperCase();
        } else if (/[A-Z]/.test(char)) {
          results += char.toLowerCase();
        } else {
          results = results + char;
        }
      } */
    for (let i = 0; i < str.length; i++) {
        // Use the Non-Null Assertion Operator (!)
        // const char = str[i]!; // 👈 The "!" tells TypeScript: "Trust me, this will never be undefined"
        const char = str[i];
        // Add a simple guard clause
        if (char === undefined)
            continue; // 👈 Tells TypeScript "char is definitely a string after this line"
        if (char >= "a" && char <= "z") {
            results += char.toUpperCase();
        }
        else if (char >= "A" && char <= "Z") {
            results += char.toLowerCase();
        }
        else {
            results += char;
        }
    }
    return results;
    return str
        .split("")
        .map((char) => {
        // return char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase();
        if (char >= "a" && char <= "z") {
            return char.toUpperCase();
        }
        if (char >= "A" && char <= "Z") {
            return char.toLowerCase();
        }
        return char;
    })
        .join("");
}
console.log(convertCase("J1s"));
/*
        String
        ↓
        split("")
        ↓
        Array of characters
        ↓
        map()
        ↓
        Change each character
        ↓
        join("")
        ↓
        String

    "Hello!".split("") => ["H", "e", "l", "l", "o", "!"]

    Then map() changes each character => ["h", "E", "L", "L", "O", "!"]

    .join("") => "hELLO!"
*/
//# sourceMappingURL=Case_Converter.js.map