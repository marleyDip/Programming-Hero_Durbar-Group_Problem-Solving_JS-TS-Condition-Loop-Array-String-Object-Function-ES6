/* Write a function toQueryString that takes a flat object of key-value pairs (where values are strings or numbers) and converts it into a URL query string.

    Each pair must be formatted as key=value, and pairs must be joined by &.
    Both keys and values should be encoded using standard URI component encoding (e.g. encodeURIComponent).
    Pairs should appear in the order returned by Object.entries(params).
    
    Do not include a leading ? in the output. If the input object has no keys, return an empty string "".

    toQueryString({ search: "hello world", page: 1 });
    => "search=hello%20world&page=1"

How it works
    1. Object.entries(params) converts the object into key-value pairs.
    2. map() converts each pair into an encoded key=value string.
    3. encodeURIComponent() encodes special characters in both keys and values.
    4. join("&") joins all pairs with &. If the object is empty, join() automatically returns "".

*/

// Using map Method
function toQueryString(params: Record<string, string | number>): string {
  // console.log(Object.entries(params)); // [ [ 'first name', 'John Doe' ], [ 'city', 'New York' ] ]

  return Object.entries(params)
    .map(([key, value]) => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .join("&");

  // Complexity analysis
  // Time complexity: O(n+L), where n is the number of key-value pairs and L is the total number of characters encoded.
  // Space complexity: O(n+L) for the generated strings.
}

// Using for...of loop
/* function toQueryString(params: Record<string, string | number>): string {
  const pairs: string[] = [];

  for (const [key, value] of Object.entries(params)) {
    pairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
  }

  return pairs.join("&");

  // Complexity analysis
  // Time complexity: O(n+L), where n is the number of key-value pairs and L is the total number of characters encoded.
  // Space complexity: O(n+L) for the generated strings.
} */

console.log(toQueryString({ search: "hello world", page: 1 })); // "search=hello%20world&page=1"

console.log(toQueryString({ sort: "asc", limit: 10 })); // "sort=asc&limit=10"

console.log(toQueryString({ name: "Sufian", age: 25 })); // "name=Sufian&age=25"

console.log(toQueryString({ search: "web development" })); // "search=web%20development"

console.log(toQueryString({ "first name": "John Doe", city: "New York" })); // "first%20name=John%20Doe&city=New%20York"

console.log(toQueryString({})); // ""

console.log(toQueryString({ price: 10, available: "yes" })); // "price=10&available=yes"
