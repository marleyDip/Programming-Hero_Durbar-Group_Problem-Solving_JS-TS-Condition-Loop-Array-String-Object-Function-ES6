"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TOPICS = {
    condition: { label: "Condition", color: "#ffbe55" },
    loop: { label: "Loop", color: "#3ee6b4" },
    array: { label: "Array", color: "#5cc8ff" },
    string: { label: "String", color: "#ff7ab8" },
    object: { label: "Object", color: "#9d8cff" },
    function: { label: "Function", color: "#ff8a5c" },
    es6: { label: "ES6", color: "#b6f06a" },
};
const PROBLEMS = [
    {
        id: "leap-year",
        topic: "condition",
        title: "Leap year check",
        level: "Easy",
        name: "isLeapYear",
        brief: "Return true when a year is a leap year: divisible by 4, except century years, which must be divisible by 400.",
        sample: "[2024]",
        solve: (year) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0,
    },
    {
        id: "grade",
        topic: "condition",
        title: "Score to grade",
        level: "Easy",
        name: "gradeFor",
        brief: "Convert a score from 0 to 100 into a letter grade: 80+ A+, 70+ A, 60+ A-, 50+ B, 40+ C, 33+ D, below that F.",
        sample: "[87]",
        solve: (score) => {
            if (score < 0 || score > 100)
                return "Invalid score";
            if (score >= 80)
                return "A+";
            if (score >= 70)
                return "A";
            if (score >= 60)
                return "A-";
            if (score >= 50)
                return "B";
            if (score >= 40)
                return "C";
            if (score >= 33)
                return "D";
            return "F";
        },
    },
    {
        id: "primes",
        topic: "loop",
        title: "Primes up to n",
        level: "Medium",
        name: "primesUpTo",
        brief: "List every prime number from 2 up to n. Only test divisors up to the square root.",
        sample: "[50]",
        solve: (n) => {
            if (n > 100000)
                throw new Error("Keep n at 100000 or below so the page stays responsive.");
            const primes = [];
            for (let i = 2; i <= n; i++) {
                let isPrime = true;
                for (let j = 2; j * j <= i; j++) {
                    if (i % j === 0) {
                        isPrime = false;
                        break;
                    }
                }
                if (isPrime)
                    primes.push(i);
            }
            return primes;
        },
    },
    {
        id: "collatz",
        topic: "loop",
        title: "Collatz steps",
        level: "Easy",
        name: "collatzSteps",
        brief: "Count the steps to reach 1: halve even numbers, turn odd numbers into 3n + 1.",
        sample: "[27]",
        solve: (n) => {
            if (!Number.isInteger(n) || n < 1)
                throw new Error("Enter a positive whole number.");
            let steps = 0;
            while (n !== 1) {
                n = n % 2 === 0 ? n / 2 : 3 * n + 1;
                steps++;
            }
            return steps;
        },
    },
    {
        id: "second-largest",
        topic: "array",
        title: "Second largest",
        level: "Easy",
        name: "secondLargest",
        brief: "Find the second largest distinct number in an array. Return null if there isn't one.",
        sample: "[[4, 9, 2, 9, 7]]",
        solve: (nums) => {
            const unique = [...new Set(nums)].sort((a, b) => b - a);
            return unique[1] ?? null;
        },
    },
    {
        id: "chunk",
        topic: "array",
        title: "Split into chunks",
        level: "Medium",
        name: "chunk",
        brief: "Split an array into groups of a given size. The last group may be shorter.",
        sample: "[[1, 2, 3, 4, 5, 6, 7], 3]",
        solve: (arr, size) => {
            if (size < 1)
                throw new Error("Chunk size must be at least 1.");
            const out = [];
            for (let i = 0; i < arr.length; i += size)
                out.push(arr.slice(i, i + size));
            return out;
        },
    },
    {
        id: "palindrome",
        topic: "string",
        title: "Palindrome check",
        level: "Easy",
        name: "isPalindrome",
        brief: "Decide whether text reads the same backwards, ignoring case, spaces and punctuation.",
        sample: '["A man, a plan, a canal: Panama"]',
        solve: (text) => {
            const clean = text.toLowerCase().replace(/[^a-z0-9]/g, "");
            return clean === [...clean].reverse().join("");
        },
    },
    {
        id: "title-case",
        topic: "string",
        title: "Capitalize each word",
        level: "Easy",
        name: "titleCase",
        brief: "Capitalize the first letter of every word and lowercase the rest. Extra spaces collapse to one.",
        sample: '["  programming   hero never STOPS "]',
        solve: (sentence) => sentence
            .trim()
            .split(/\s+/)
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
            .join(" "),
    },
    {
        id: "word-count",
        topic: "object",
        title: "Word frequency",
        level: "Medium",
        name: "wordFrequency",
        brief: "Count how many times each word appears in a sentence, ignoring case and punctuation.",
        sample: '["To be, or not to be: that is the question"]',
        solve: (text) => {
            const counts = {};
            for (const word of text.toLowerCase().match(/[a-z']+/g) ?? []) {
                counts[word] = (counts[word] ?? 0) + 1;
            }
            return counts;
        },
    },
    {
        id: "invert",
        topic: "object",
        title: "Swap keys and values",
        level: "Easy",
        name: "invertObject",
        brief: "Return a new object where each value becomes a key and each key becomes its value.",
        sample: '[{"a": "x", "b": "y", "c": 3}]',
        solve: (obj) => Object.fromEntries(Object.entries(obj).map(([key, value]) => [String(value), key])),
    },
    {
        id: "fib",
        topic: "function",
        title: "Memoized Fibonacci",
        level: "Medium",
        name: "fibonacci",
        brief: "Return the nth Fibonacci number. Use a closure to cache results so large n stays fast.",
        sample: "[70]",
        solve: (n) => {
            if (!Number.isInteger(n) || n < 0 || n > 78)
                throw new Error("Use a whole number from 0 to 78 (beyond that, numbers lose precision).");
            const cache = new Map();
            const fib = (k) => {
                if (k < 2)
                    return k;
                const hit = cache.get(k);
                if (hit !== undefined)
                    return hit;
                const value = fib(k - 1) + fib(k - 2);
                cache.set(k, value);
                return value;
            };
            return fib(n);
        },
    },
    {
        id: "pipeline",
        topic: "function",
        title: "Function pipeline",
        level: "Medium",
        name: "applyOps",
        brief: "Run a number through a list of named operations, left to right: double, increment, square, negate.",
        sample: '[3, ["double", "increment", "square"]]',
        solve: (value, ops) => {
            const library = {
                double: (x) => x * 2,
                increment: (x) => x + 1,
                square: (x) => x * x,
                negate: (x) => -x,
            };
            return ops.reduce((acc, name) => {
                const op = library[name];
                if (!op)
                    throw new Error(`Unknown operation "${name}". Try double, increment, square or negate.`);
                return op(acc);
            }, value);
        },
    },
    {
        id: "merge-unique",
        topic: "es6",
        title: "Merge without duplicates",
        level: "Easy",
        name: "mergeUnique",
        brief: "Combine two arrays into one with no repeated values, using spread and Set.",
        sample: "[[1, 2, 3, 3], [3, 4, 5, 1]]",
        solve: (a, b) => [...new Set([...a, ...b])],
    },
    {
        id: "destructure",
        topic: "es6",
        title: "Destructure a profile",
        level: "Medium",
        name: "describe",
        brief: "Use destructuring in the parameter list to describe a person by their first skill and how many more they have.",
        sample: '[{"name": "Dip", "skills": ["TypeScript", "CSS", "Node"]}]',
        solve: ({ name, skills: [first, ...rest], }) => first
            ? `${name} leads with ${first}${rest.length ? ` (+${rest.length} more)` : ""}`
            : `${name} is just getting started`,
    },
];
//# sourceMappingURL=problems.js.map