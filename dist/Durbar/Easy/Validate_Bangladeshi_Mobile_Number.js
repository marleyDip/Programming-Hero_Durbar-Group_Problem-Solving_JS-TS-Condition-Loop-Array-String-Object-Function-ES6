"use strict";
/* Determine if a given string represents a valid Bangladeshi mobile number. A valid number must conform to one of the following formats:

    1. Starts with 01, followed by 9 more digits. The digit immediately after 01 must be 3, 4, 5, 6, 7, 8, or 9. (e.g., 01712345678)
    
    2. Starts with +8801, followed by 9 more digits. The digit immediately after +8801 must be 3, 4, 5, 6, 7, 8, or 9. (e.g., +8801712345678)
    
    3. Starts with 8801, followed by 9 more digits. The digit immediately after 8801 must be 3, 4, 5, 6, 7, 8, or 9. (e.g., 8801712345678)

    All characters must be digits, except for the optional leading + sign.

    => ^(?:01[3-9]\d{8}|\+8801[3-9]\d{8}|8801[3-9]\d{8})$\

    Pattern	     Meaning
    ^	         Start of the string
    (?: ... )	 Groups the alternatives without capturing them
    01	         Local format prefix
    \+8801	     International format with +
    8801	     International format without +
    [3-9]	     Next digit must be between 3 and 9
    \d{8}	     Exactly eight additional digits
    \|	         Means OR between formats
    $	         End of the string
*/
Object.defineProperty(exports, "__esModule", { value: true });
// using RegEX
/* function isValidBdMobileNumber(phoneNumber: string): boolean {
  const mobilePattern = /^(?:01[3-9]\d{8}|\+8801[3-9]\d{8}|8801[3-9]\d{8})$/;

  return mobilePattern.test(phoneNumber);

  // Complexity analysis
  // Time complexity: O(n), where n is the string length.
  // Space complexity: O(1) auxiliary space for the RegEx approach, excluding implementation-dependent regex engine memory.
} */
// without RegEx
function isValidBdMobileNumber(phoneNumber) {
    //   if (phoneNumber.startsWith("+8801")) {
    //     phoneNumber = phoneNumber.slice(1);
    //   }
    //   if (phoneNumber.startsWith("8801")) {
    //     phoneNumber = phoneNumber.slice(2);
    //   }
    if (phoneNumber.startsWith("+8801")) {
        phoneNumber = phoneNumber.slice(3);
    }
    else if (phoneNumber.startsWith("8801")) {
        phoneNumber = phoneNumber.slice(2);
    }
    if (phoneNumber.length !== 11) {
        return false;
    }
    if (!phoneNumber.startsWith("01")) {
        return false;
    }
    if (phoneNumber.charAt(2) < "3" || phoneNumber.charAt(2) > "9") {
        return false;
    }
    for (const char of phoneNumber) {
        if (char < "0" || char > "9") {
            return false;
        }
    }
    return true;
}
console.log(isValidBdMobileNumber("01712345678")); // true
console.log(isValidBdMobileNumber("+8801712345678")); // true
console.log(isValidBdMobileNumber("8801712345678")); // true
console.log(isValidBdMobileNumber("01212345678")); // false
console.log(isValidBdMobileNumber("0171234567")); // false
console.log(isValidBdMobileNumber("017123456789")); // false
console.log(isValidBdMobileNumber("01712abc678")); // false
console.log(isValidBdMobileNumber("+8801212345678")); // false
//# sourceMappingURL=Validate_Bangladeshi_Mobile_Number.js.map