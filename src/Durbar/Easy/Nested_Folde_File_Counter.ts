/* Given a nested folder structure containing files and subfolders, count the total number of files present in the entire structure, including those within any subfolders.

The folder structure is represented as an array of objects. Each object can be either a file or a folder:

    A file object has type: 'file'.

    A folder object has type: 'folder' and a children property, which is an array of other file or folder objects.

Example

    Input:
    const structure1 = [
        { "name": "document.txt", "type": "file" },
    
        { "name": "images", "type": "folder", "children": [
            { "name": "photo1.jpg", "type": "file" },
            { "name": "photo2.png", "type": "file" }
        ]},
    
        { "name": "report.pdf", "type": "file" }
    ];
    Output: 4


    const structure2 = [
        { "name": "src", "type": "folder", "children": [
            { "name": "index.js", "type": "file" },
    
            { "name": "components", "type": "folder", "children": [
            { "name": "Button.js", "type": "file" },
            { "name": "Header.js", "type": "file" }
            ]}
        ]},
    
        { "name": "package.json", "type": "file" },
        { "name": "empty_folder", "type": "folder", "children": [] }
    ];
    Output: 5

This problem is a good example of Recursion because 
    folders can contain other folders, and those folders can contain more folders.

How Recursion Works
    When the function encounters:
    - file: Increase total by 1.
    - folder: Call countFiles() again with its children.
    - children ?? []: If children are missing, use an empty array.
*/

interface File {
  name: string;
  type: "file";
}
interface Folder {
  name: string;
  type: "folder";
  children: (File | Folder)[];
}
type FileSystemItem = File | Folder;

// Complexity
// - Time: O(n) — Visits every file and folder once.
// - Space: O(d) — Recursive call stack, where d is the maximum folder nesting depth.

// Using for...of & Recursion
function countFilesInFolder(structure: FileSystemItem[]): number {
  let total = 0;

  for (const item of structure) {
    if (item.type === "file") {
      total++;
    } else {
      // It recursively counts all files inside the nested folder and adds that result to the current total.
      total += countFilesInFolder(item.children);
    }
  }

  return total;
}

// Using reduce & Recursion
/* function countFilesInFolder(structure: FileSystemItem[]): number {
  return structure.reduce((total, item) => {
    if (item.type === "file") {
      return total + 1;
    }

    return total + countFilesInFolder(item.children ?? []);
  }, 0);
} */

const structure: FileSystemItem[] = [
  { name: "index.html", type: "file" },

  {
    name: "src",
    type: "folder",
    children: [
      { name: "app.ts", type: "file" },
      { name: "style.css", type: "file" },

      {
        name: "components",
        type: "folder",
        children: [
          { name: "Header.tsx", type: "file" },
          { name: "Footer.tsx", type: "file" },
        ],
      },
    ],
  },

  { name: "package.json", type: "file" },
];

console.log(countFilesInFolder(structure)); // 6

const structure1: FileSystemItem[] = [
  { name: "document.txt", type: "file" },

  {
    name: "images",
    type: "folder",
    children: [
      { name: "photo1.jpg", type: "file" },
      { name: "photo2.png", type: "file" },
    ],
  },

  { name: "report.pdf", type: "file" },
];

console.log(countFilesInFolder(structure1)); // 4

const structure2: FileSystemItem[] = [
  {
    name: "src",
    type: "folder",
    children: [
      { name: "index.js", type: "file" },

      {
        name: "components",
        type: "folder",
        children: [
          { name: "Button.js", type: "file" },
          { name: "Header.js", type: "file" },
        ],
      },
    ],
  },

  { name: "package.json", type: "file" },
  { name: "empty_folder", type: "folder", children: [] },
];

console.log(countFilesInFolder(structure2)); // 4
