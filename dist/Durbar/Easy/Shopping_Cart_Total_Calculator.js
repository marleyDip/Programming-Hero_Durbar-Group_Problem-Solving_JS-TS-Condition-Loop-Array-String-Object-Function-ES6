"use strict";
/* Write a function calculateCartTotal that calculates the final total cost of a shopping cart.

Each item in the items array is an object with:

price (number): the unit price
quantity (number): the number of units
discount (number): the percentage discount on that item (e.g., 10 means 10% off)

The function also accepts a taxRate (number), representing the tax percentage (e.g., 8 means 8% sales tax) applied to the combined total after item discounts.

Return the final total rounded to 2 decimal places.

([
  { price: 100, quantity: 2, discount: 10 },
  { price: 50, quantity: 1, discount: 0 }
], 10)

    Item 1: 100 * 2 * (1 - 0.10) = 180
    Item 2: 50 * 1 * (1 - 0) = 50
    Subtotal = 230
    Final Total: 230 * (1 + 0.10) = 253

*/
Object.defineProperty(exports, "__esModule", { value: true });
// Complexity analysis
// Time complexity: O(n), because every item is processed once.
// Space complexity: O(1), auxiliary space for the loop-based solutions.
// Using reduce
function calculateCartTotal(items, taxRate) {
    const subTotal = items.reduce((sum, { price, quantity, discount }) => {
        const itemTotal = price * quantity;
        return sum + itemTotal * (1 - discount / 100);
    }, 0);
    const total = subTotal * (1 + taxRate / 100);
    return Math.round(total * 100) / 100;
    //   const subTotal = items.reduce((total, item) => {
    //     const itemTotal = item.price * item.quantity;
    //     return total + itemTotal - itemTotal * (item.discount / 100);
    //   }, 0);
    //   // console.log(subTotal);
    //   return Number((subTotal + subTotal * (taxRate / 100)).toFixed(2));
}
// Using for...of
/* function calculateCartTotal(items: CartItem[], taxRate: number): number {
  let subTotal = 0;

  for (const item of items) {
    subTotal += item.price * item.quantity * (1 - item.discount / 100);
  }

  return Number((subTotal * (1 + taxRate / 100)).toFixed(2));
} */
// Using a traditional for loop
/* function calculateCartTotal(items: CartItem[], taxRate: number): number {
  let subTotal = 0;

  for (let i = 0; i < items.length; i++) {
    const { price, quantity, discount } = items[i]!;
    // console.log(price, quantity, discount);

    // const discountPrice = price - price * (discount / 100);
    const discountPrice = price * (1 - discount / 100);
    subTotal += discountPrice * quantity;

    const itemTotal = items[i].price * items[i].quantity;
    const discountAmount = itemTotal * (items[i].discount / 100);
    subTotal += itemTotal - discountAmount;
  }

  const taxAmount = subtotal * (taxRate / 100);
  const total = subtotal + taxAmount;

  // const total = subTotal + subTotal * (taxRate / 100);
  const total = subTotal * (1 + taxRate / 100);

  return Number(total.toFixed(2));
} */
console.log(calculateCartTotal([
    { price: 100, quantity: 2, discount: 10 },
    { price: 50, quantity: 1, discount: 0 },
], 10)); // 253
console.log(calculateCartTotal([{ price: 19.99, quantity: 3, discount: 15 }], 8)); // 55.05
console.log(calculateCartTotal([], 10)); // 0
console.log(calculateCartTotal([{ price: 100, quantity: 2, discount: 0 }], 10)); // 220
console.log(calculateCartTotal([{ price: 100, quantity: 2, discount: 10 }], 10)); // 198
console.log(calculateCartTotal([{ price: 100, quantity: 1, discount: 100 }], 10)); // 0
//# sourceMappingURL=Shopping_Cart_Total_Calculator.js.map