"use strict";
/* When building user interfaces, we often have to deal with incomplete or nested data.

Write a function generateProfileCard that takes a user object and returns a formatted profile string in the following format:
    "{name} | {city} | followers: {followers}"

Fallback Rules
If certain fields are missing (null or undefined), use these fallbacks:

    name: defaults to "Anonymous"
    address.city: defaults to "Unknown"
    social.followers: defaults to 0

Important: Empty strings "" and the number 0 are valid values and must not be replaced by fallbacks. Use optional chaining (?.) and the nullish coalescing operator (??) to handle this safely.

*/
Object.defineProperty(exports, "__esModule", { value: true });
// function generateProfileCard(user: any): string {}
// Using destructuring ({}) and nullish coalescing operator (??) and optional chaining (?.)
function generateProfileCard(user) {
    // Nested destructuring with defaults only works for undefined, not null.
    //   const {
    //     name = "Anonymous",
    //     address: { city = "Unknown" } = {},
    //     social: { followers = 0 } = {},
    //   } = user;
    const { name, address: { city } = {}, social: { followers } = {} } = user;
    // Using an array with join()
    return [
        name ?? "Anonymous",
        city ?? "Unknown",
        `followers: ${followers ?? 0}`,
    ].join(" | ");
    // Destructuring with optional chaining and nullish coalescing operator
    // const { name, address, social } = user;
    // const userName = name ?? "Anonymous";
    // const city = address?.city ?? "Unknown";
    // const followers = social?.followers ?? 0;
    // return `${userName} | ${city} | followers: ${followers}`;
    // return `${user?.name ?? "Anonymous"} | ${user?.address?.city ?? "Unknown"} | followers: ${user?.social?.followers ?? 0}`;
}
// Generic field configuration (Object And Array) and Without optional chaining
/* function generateProfileCard(user: ProfileCardType): string {
  // Object with map() method with destructuring (object and array)
  const fields = [
    { value: user?.name, fallback: "Anonymous" },
    { value: user?.address?.city, fallback: "Unknown" },
    { value: user?.social?.followers, fallback: 0 },
  ];

  // Destructuring
  const [name, city, followers] = fields.map(
    ({ value, fallback }) => value ?? fallback,
  );

  return `${name} | ${city} | followers: ${followers}`;

  // Array with join() method
  const values = [
    user?.name ?? "Anonymous",
    user?.address?.city ?? "Unknown",
    `followers: ${user?.social?.followers ?? 0}`,
  ];

  return values
    .map((value, index) => {
      if (index === 0) return value;
      if (index === 1) return value;
      return `followers: ${value}`;
    })
    .join(" | ");

  // // It works, but it's unnecessarily verbose. That's exactly one reason optional chaining was introduced.

  // const name = user.name ?? "Anonymous";

  // const city =
  //   user.address &&
  //   user.address.city !== null &&
  //   user.address.city !== undefined
  //     ? user.address.city
  //     : "Unknown";

  // const followers =
  //   user.social &&
  //   user.social.followers !== null &&
  //   user.social.followers !== undefined
  //     ? user.social.followers
  //     : 0;

  // return `${name} | ${city} | followers: ${followers}`;
} */
console.log(generateProfileCard({
    name: "Rafi",
    address: { city: "Dhaka" },
    social: { followers: 0 },
}));
console.log(generateProfileCard({
    name: "Alice",
    social: { followers: 120 },
}));
console.log(generateProfileCard({}));
console.log(generateProfileCard({
    address: { city: "" },
    name: "",
    social: { followers: 999 },
}));
console.log(generateProfileCard({
    address: { city: null },
    name: null,
    social: { followers: null },
}));
console.log(generateProfileCard({ address: {}, name: "Bob", social: {} }));
console.log(generateProfileCard({ address: { city: "London" }, name: "Charlie" }));
//# sourceMappingURL=Safe_Profile_Card.js.map