"use strict";
/* Given an absolute file path, simplify it.

The rules for simplification are:

    . means the current directory and should be ignored.
    
    .. means going up one directory level. If you are at the root directory, .. has no effect.
    
    Multiple consecutive slashes (e.g., //) are treated as a single slash.
    
    A path always starts with a single slash /.
    
    A path does not end with a trailing / unless it is the root path itself (/).

Examples:

    simplifyPath("/home/")
    Expected output: "/home"

    simplifyPath("/home/user/../docs/./file.txt")
    Expected output: "/home/docs/file.txt"

Topics: string, stack, file-system

Hints:

    Hint 1. Consider splitting the path string into components.

    Hint 2. A stack data structure can be useful to keep track of directory levels.

    Hint 3. Remember to handle `.` (current directory), `..` (parent directory), and multiple slashes correctly.

Important: ... is a normal directory name. Only . and .. have special meanings.

*/
Object.defineProperty(exports, "__esModule", { value: true });
// Complexity analysis
// Time: O(n), where n is the length of the path. Each character is visited a constant number of times.
// Space: O(n) for the segments and the stack.
// - Time Complexity: O(n) — We process each character/path segment once.
// - Space Complexity: O(n) — The stack stores directory names.
// Using Stack
function simplifyPath(path) {
    const stack = [];
    // Split the path by slash
    const parts = path.split("/");
    // console.log(parts); // [ '', 'home', 'user', '..', 'docs', '.', 'file.txt' ]
    // for (let i = 0; i < parts.length; i++) {
    // const part = parts[i];
    // for (const part of path.split("/")) {
    for (const part of parts) {
        // Ignore empty parts and current directory
        if (part === "" || part === ".") {
            continue; // empty (from "//" or the leading "/") or current dir
        }
        // Go one directory up
        if (part === "..") {
            if (stack.length > 0) {
                stack.pop();
            }
            // stack.pop(); // go up one level; does nothing if already at root
        }
        else {
            // Add directory to the stack
            stack.push(part); // a real directory or file name
        }
    }
    // Build the simplified absolute path
    return stack.length > 0 ? `/${stack.join("/")}` : "/";
    // return "/" + stack.join("/");
}
/* simplifyPath("/home//user/.././documents/");

After splitting: ["", "home", "", "user", "..", ".", "documents", ""]

    Part	Action	Stack
    ""	Ignore	[]
    "home"	Push	["home"]
    ""	Ignore	["home"]
    "user"	Push	["home", "user"]
    ".."	Pop user	["home"]
    "."	Ignore	["home"]
    "documents"	Push	["home", "documents"]
    ""	Ignore	["home", "documents"]

Final result: "/home/documents"
*/
// function simplifyPath(path: string): string {}
// function simplifyPath(path: string): string {}
console.log(simplifyPath("/home/")); // "/home"
console.log(simplifyPath("/home/user/../docs/./file.txt")); // "/home/docs/file.txt"
console.log(simplifyPath("/../")); // "/"
console.log(simplifyPath("/home//user/")); // "/home/user"
console.log(simplifyPath("/a/./b/../../c/")); // "/c"
console.log(simplifyPath("/a/b/c/../../../")); // "/"
console.log(simplifyPath("/.../abc/...")); // "/.../abc/..."
console.log(simplifyPath("/home//foo/")); // "/home/foo"
console.log(simplifyPath("/home/user/Documents/../Pictures")); // "/home/user/Pictures"
console.log(simplifyPath("/../")); // "/"
console.log(simplifyPath("/.../a/../b/c/../d/./")); // "/.../b/d"
//# sourceMappingURL=Simplify_File_Path.js.map