"use strict";
/* Write a function selectBestDiscount that takes a purchase total price and an array of discount offers, and returns the single offer object that produces the lowest final payable price.

Each offer object has the following structure:

    name (string): The identifier of the offer.
    type (string): Either "flat" or "percent".
    value (number): The discount amount or percentage value.
    minPrice (number): The minimum purchase price required to use this discount.

Rules:

    An offer is eligible only if price >= offer.minPrice.
    
    A "flat" discount reduces the price by offer.value.
    
    A "percent" discount reduces the price by price * (offer.value / 100).
    
    The final price after discount cannot fall below 0 (i.e. Math.max(0, discountedPrice)).
    
    Return the offer object that results in the lowest final price. If no offer is eligible or no offer reduces the price below the original price, return null.
    
    If multiple eligible offers yield the same lowest price, return the one that appears first in the offers array.

Example:
    selectBestDiscount(100, [
    { name: "FLAT15", type: "flat", value: 15, minPrice: 50 },
    { name: "HALF", type: "percent", value: 50, minPrice: 150 }
    ]);
    
    Returns: { name: "FLAT15", type: "flat", value: 15, minPrice: 50 }
    
    Explanation: FLAT15 is eligible (100 >= 50) and gives price 85. HALF requires minPrice 150 (not met).
*/
Object.defineProperty(exports, "__esModule", { value: true });
// Using for..of Loop and conditional statements
function selectBestDiscount(price, offers) {
    // Initialize variables
    let bestOffer = null;
    let lowestPrice = price;
    for (const offer of offers) {
        // Check offer eligibility
        if (price < offer.minPrice) {
            continue;
        }
        // Calculate discounted price
        let discountedPrice = price;
        if (offer.type === "flat") {
            discountedPrice = price - offer.value;
        }
        else {
            discountedPrice = price - price * (offer.value / 100);
        }
        // Final price cannot be negative
        discountedPrice = Math.max(0, discountedPrice);
        // Keep the offer with the lowest payable price and not used <= bcz if two offers produce the same final price, we want to keep the first offer.
        // 1900 < 2000; 1600 < 1900; 1700 < 1600; 1000 < 1600
        if (discountedPrice < lowestPrice) {
            lowestPrice = discountedPrice; // 1900, 1600, 1000
            bestOffer = offer;
        }
    }
    return bestOffer;
}
// Using reduce()
/* function selectBestDiscount(price: number, offers: Offer[]): Offer | null {
  return offers.reduce<Offer | null>((best, offer) => {
    if (price < offer.minPrice) return best;

    const discount =
      offer.type === "flat" ? offer.value : price * (offer.value / 100);

    const finalPrice = Math.max(0, price - discount);

    if (finalPrice >= price) return best;
    if (best === null) return offer;

    const bestDiscount =
      best.type === "flat" ? best.value : price * (best.value / 100);

    const bestFinalPrice = Math.max(0, price - bestDiscount);

    return finalPrice < bestFinalPrice ? offer : best;
  }, null);
} */
const offers = [
    { name: "Flat 100", type: "flat", value: 100, minPrice: 500 },
    { name: "20% OFF", type: "percent", value: 20, minPrice: 1000 },
    { name: "Flat 300", type: "flat", value: 300, minPrice: 1500 },
    { name: "50% OFF", type: "percent", value: 50, minPrice: 2000 },
];
console.log(selectBestDiscount(2000, offers)); // { name: "50% OFF", type: "percent", value: 50, minPrice: 2000 }
console.log(selectBestDiscount(100, [
    { name: "FLAT15", type: "flat", value: 15, minPrice: 50 },
    { name: "HALF", type: "percent", value: 50, minPrice: 150 },
]));
console.log(selectBestDiscount(200, [
    { name: "SAVE20", type: "flat", value: 20, minPrice: 100 },
    { name: "25PERCENT", type: "percent", value: 25, minPrice: 150 },
]));
// No eligible offer
console.log(selectBestDiscount(100, [
    { name: "Flat 50", type: "flat", value: 50, minPrice: 500 },
])); // null
// Discount cannot reduce price below zero
console.log(selectBestDiscount(100, [
    { name: "Flat 200", type: "flat", value: 200, minPrice: 50 },
])); // { name: "Flat 200", type: "flat", value: 200, minPrice: 50 }
// Equal discounts: first offer wins
console.log(selectBestDiscount(1000, [
    { name: "Flat 200", type: "flat", value: 200, minPrice: 500 },
    { name: "20% OFF", type: "percent", value: 20, minPrice: 500 },
])); // { name: "Flat 200", type: "flat", value: 200, minPrice: 500 }
// No offer reduces the original price
console.log(selectBestDiscount(1000, [
    { name: "Zero discount", type: "flat", value: 0, minPrice: 500 },
])); // null
//# sourceMappingURL=Best_Discount_Selector.js.map