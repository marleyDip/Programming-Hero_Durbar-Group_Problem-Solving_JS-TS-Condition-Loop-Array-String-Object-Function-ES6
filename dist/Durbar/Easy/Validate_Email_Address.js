"use strict";
/* Write a function isValidEmail that checks whether a given string is a valid email address according to a simplified format specification.

A string is considered a valid email address if and only if:

    1. It has the format <local>@<domain>.<tld>.
    
    2. Local part (before @): Contains at least one character and consists only of alphanumeric characters (a-z, A-Z, 0-9), periods (.), underscores (_), or hyphens (-).
    
    3. Domain part (between @ and .): Contains at least one character and consists only of alphanumeric characters (a-z, A-Z, 0-9) or hyphens (-).
    
    4. Top-Level Domain (TLD) (after .): Contains at least two characters and consists only of alphabetical letters (a-z, A-Z).
    
    5. The email must not contain any spaces or additional @ characters.


    Pattern	            Meaning
    ^	                Start of the string
    [a-zA-Z0-9._-]+	    One or more allowed local-part characters
    @	                Exactly one @ separator
    [a-zA-Z0-9-]+	    One or more allowed domain characters
    \.	                A literal period (.)
    [a-zA-Z]{2,}	    TLD containing at least two letters
    $	                End of the string

    The + means at least one character, while {2,} means at least two characters.

*/
Object.defineProperty(exports, "__esModule", { value: true });
// Using RegEx
/* function isValidEmail(email: string): boolean {
  const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;

  return pattern.test(email);

  // Complexity analysis
  // Time complexity: O(n), where n is the email string length.
  // Space complexity: O(1) auxiliary space for the fixed regular expression, excluding implementation-dependent regex engine memory.
} */
// Using split() and conditions
function isValidEmail(email) {
    const parts = email.split("@");
    // console.log(parts);
    if (parts.length !== 2)
        return false;
    const [local, domainAndTld] = parts;
    if (local === undefined || domainAndTld === undefined)
        return false;
    const domainParts = domainAndTld.split(".");
    // console.log(domainParts);
    if (domainParts.length !== 2)
        return false;
    //   const domain = domainParts[0];
    //   const tld = domainParts[1];
    //   if (domain === undefined || tld === undefined) return false;
    const [domain, tld = ""] = domainParts;
    // console.log(tld);
    if (!local || !domain || tld.length < 2)
        return false;
    const validLocal = /^[a-zA-Z0-9._-]+$/.test(local);
    const validDomain = /^[a-zA-Z0-9-]+$/.test(domain);
    const validTld = /^[a-zA-Z]+$/.test(tld);
    return validLocal && validDomain && validTld;
}
const emails = [
    "user@example", // false
    "user@example.com", // true
    "john_doe@mail-site.org", // true
    "user123@domain123.net", // true
    "a@b.co", // true
    "@example.com", // false
    "user@.com", // false
    "user@domain.c", // false
    "user name@example.com", // false
    "user@@example.com", // false
    "user@domain.toolong123", // false
    "user@domain.com.extra", // false
    "user!@example.com", // false
    "user@example-.com", // true
];
for (const email of emails) {
    console.log(email, "=>", isValidEmail(email));
}
//# sourceMappingURL=Validate_Email_Address.js.map