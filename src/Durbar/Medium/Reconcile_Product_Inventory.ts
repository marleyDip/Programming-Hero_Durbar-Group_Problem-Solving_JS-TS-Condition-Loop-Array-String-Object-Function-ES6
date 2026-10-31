/* You are given an initial inventory of products and a list of transactions. Your task is to apply these transactions to the inventory and return the final state of each product's quantity.

    For 'stock-in' transactions, add the quantity to the product's current stock.
    
    For 'stock-out' transactions, subtract the quantity. 
    
    However, a product's stock can never fall below zero. If a 'stock-out' transaction would result in a negative quantity, the stock should instead be set to zero.
    
    Products not present in the initial inventory but appearing in transactions should be treated as starting with a quantity of zero before any transactions are applied to them.

Example:
    Input: 
    initialInventory = {"apple":10,"banana":5}, 
    transactions = [{"productId":"apple","quantity":3,"type":"in"},{"productId":"banana","quantity":2,"type":"out"}]
    
    Output: {"apple":13,"banana":3}
    Explanation: Apple stock increases by 3, banana stock decreases by 2.

    Input: 
    initialInventory = {"orange":2}, 
    transactions = [{"productId":"orange","quantity":2,"type":"out"},{"productId":"grape","quantity":7,"type":"in"}]
    
    Output: {"grape":7,"orange":0}
    Explanation: Orange stock goes to zero. Grape is a new product, starting at 0 and increasing by 7.


    Hint 1. Start by creating a mutable copy of the `initialInventory`.

    Hint 2. Iterate through the `transactions` array.

    Hint 3. For each transaction, check if the `productId` already exists in your current inventory. If not, initialize its quantity to 0.

    Hint 4. Use a conditional (if/else if) to handle 'in' and 'out' transaction types.

    Hint 5. Remember to use `Math.max(0, ...)` when subtracting for 'stock-out' to ensure the quantity never drops below zero.

    Topics
    arrays, objects, aggregation, maps
*/

/* In TypeScript, the relationship between Inventory and Transaction is a producer-consumer data relationship linked by a shared lookup key (productId).

Here is how their types interact and map to each other:

1. The Shared Key (productId)

    • Transaction.productId acts as a Foreign Key. It provides the exact string value used to look up or modify a record.

    • Inventory[productId] acts as the Primary Key Map. It uses that string value via an index signature ([productId: string]) to access the current stock count.


2. Value Mutation by Transaction Type

    The Transaction.type literal ("in" | "out") dictates the mathematical operations applied to the Inventory value:

    // How Transaction maps to Inventory updates
    if (Transaction.type === "in") {
    Inventory[Transaction.productId] += Transaction.quantity;
    } else if (Transaction.type === "out") {
    Inventory[Transaction.productId] -= Transaction.quantity;
    }


3. Type Defensiveness (The undefined Relationship)

    Because Inventory uses an open index signature ([productId: string]: number), TypeScript assumes that looking up any string will return a number.
    However, at runtime, a transaction might reference a productId that does not exist in the inventory yet.
    
    To bridge this type gap safely, your logic must handle the initial relationship setup:

    // Setting up the relationship for a new product
    if (inventory[transaction.productId] === undefined) {
    inventory[transaction.productId] = 0; // Initialize state before applying transaction quantity
    }



Indexed Access Relationship (Lookup)

    The productId in Transaction is typed as a string. 
    
    The Inventory interface uses a string index signature ([productId: string]).

Because of this, TypeScript allows you to use the property value of a transaction to dynamically look up or create a key inside the inventory object:

=> TypeScript safely connects the two because both use the 'string' primitive type

    let key: Transaction['productId'] = "prod-01";
    let stock: Inventory[string] = 10;


1. The Key Match (String to String)

TypeScript looks at productId in both places:

    • Inside Transaction, productId is a string.
    • Inside Inventory, the box [productId: string] means it only accepts a string as a key.

Because both are string, TypeScript smiles and says: "Yes, you are allowed to use the ID from the transaction to look up the item in the inventory."

2. The Number Match

TypeScript checks the math:

    • In Transaction, quantity is a number.
    • In Inventory, the stock value must be a number.

Because both are number, TypeScript knows you can safely add or subtract them together.

Summary
 
    TypeScript's job here is simply to guarantee that you cannot accidentally pass a text name (like "apple") into the inventory math, and you cannot use a number as a product ID.
    
    It ensures the data types fit together perfectly like Lego blocks.


Remember
    - for → initialization, condition, increment.
    - for...of → directly iterate values.
    - for...in → iterate object keys.
    - while → repeat while a condition is true.
*/

interface Inventory {
  [productId: string]: number;
}

interface Transaction {
  productId: string;
  type: "in" | "out";
  quantity: number;
}

/* Complexity analysis
Complexity	Cost	    Explanation
Time	    O(n + m)	Copy inventory and process transactions
Space	    O(n + k)	Copy of initial inventory and new products

- n = number of products in initial inventory.
- m = number of transactions.
- k = number of new products introduced by transactions. */

// Using for...of Loop
function reconcileInventory(
  initialInventory: Inventory,
  transactions: Transaction[],
): Inventory {
  // Spread Operator (Immutable) creates a shallow copy. We update the copy instead of modifying the original inventory object.

  // Create a copy so the original inventory is not modified
  // const inventory: Inventory = { ...initialInventory };
  // console.log(inventory);

  // Copy initial inventory using a for...in loop
  const inventory: Inventory = {};
  for (const productId in initialInventory) {
    // console.log(productId); // laptop, mouse, ...

    const currentStock = initialInventory[productId];
    // console.log(currentStock); // 10, 20, ...

    // Bracket Notation (For Dynamic Keys) - obj[variable] = value
    // Add a property using a variable - productId which is dynamic
    inventory[productId] = currentStock ?? 0;
    // console.log(inventory);
  }
  // console.log(inventory);

  // Process each transaction using a for...of loop
  for (const transaction of transactions) {
    const { productId, type, quantity } = transaction;

    // A new product might not exist in the initial inventory. We initialize it with 0 before applying its transaction.

    // Initialize a new product with 0
    // If the product does not exist, start with 0
    // Dynamic (bracket notation) => Key-value lookup
    if (inventory[productId] === undefined) {
      inventory[productId] = 0;
    }

    // Apply the transaction
    if (type === "in") {
      inventory[productId] += quantity;

      // inventory[transaction.productId] += transaction.quantity;
    } else {
      // It ensures stock never becomes negative.
      // inventory[productId] = Math.max(0, inventory[productId] - quantity);

      inventory[productId] -= quantity;

      // Prevent negative stock
      if (inventory[productId] < 0) {
        inventory[productId] = 0;
      }
    }
  }

  return inventory;
}

// Using while Loop
/* function reconcileInventory(
  initialInventory: Inventory,
  transactions: Transaction[],
): Inventory {
  const inventory: Inventory = {};

  // Copy initial inventory using while loop
  const products = Object.keys(initialInventory);
  // console.log(products); // [ 'laptop', 'mouse', 'keyboard' ]

  let i = 0;
  while (i < products.length) {
    const product = products[i];

    if (product !== undefined) {
      inventory[product] = initialInventory[product] ?? 0;
    }

    i++;
  }

  // Process transactions using while loop
  let j = 0;

  while (j < transactions.length) {
    const transaction = transactions[j];

    if (transaction !== undefined) {
      const productId = transaction.productId;
      const quantity = transaction.quantity;
      const type = transaction.type;

      // Initialize new product with 0
      if (inventory[productId] === undefined) {
        inventory[productId] = 0;
      }

      // Stock-in
      if (type === "in") {
        inventory[productId] = inventory[productId] + quantity;
        // inventory[productId] = (inventory[productId] ?? 0) + quantity;
      }

      // Stock-out
      else {
        inventory[productId] = inventory[productId] - quantity;

        // Prevent negative stock
        if (inventory[productId] < 0) {
          inventory[productId] = 0;
        }
      }
    }

    j++;
  }

  return inventory;
} */

const initialInventory: Inventory = {
  laptop: 10,
  mouse: 20,
  keyboard: 5,
};

const transactions: Transaction[] = [
  { productId: "laptop", type: "in", quantity: 5 },
  { productId: "mouse", type: "out", quantity: 8 },
  { productId: "keyboard", type: "out", quantity: 10 },
  { productId: "monitor", type: "in", quantity: 3 },
  { productId: "laptop", type: "out", quantity: 4 },
];

console.log(reconcileInventory(initialInventory, transactions)); // { laptop: 11, mouse: 12, keyboard: 0, monitor: 3 }

console.log(
  reconcileInventory({ apple: 10, banana: 5 }, [
    { productId: "apple", quantity: 3, type: "in" },
    { productId: "banana", quantity: 2, type: "out" },
  ]),
); // { apple: 13, banana: 3 }

console.log(
  reconcileInventory({ orange: 2 }, [
    { productId: "orange", quantity: 2, type: "out" },
    { productId: "grape", quantity: 7, type: "in" },
  ]),
); // { orange: 0, grape: 7 }
