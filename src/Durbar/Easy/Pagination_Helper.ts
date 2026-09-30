/* When building user interfaces, you often need to paginate a list of items. Given the total number of items, the page size, and the current active page, calculate the metadata needed to render the pagination controls.

Write a function getPageMetadata that accepts:

    => totalItems (non-negative integer): The total number of items in the collection.
    => pageSize (positive integer): The maximum number of items displayed per page.
    => currentPage (positive integer): The current 1-based page number.

It should return an object containing:

    1. totalPages: The total number of pages (0 if there are no items).
    
    2. startItem: The 1-based index of the first item on the current page (0 if there are no items).
    
    3. endItem: The 1-based index of the last item on the current page (0 if there are no items).
    
    4. hasPrev: A boolean indicating if there is a previous page.
    
    5. hasNext: A boolean indicating if there is a next page.

Note: You can assume currentPage will always be a valid page number from 1 to totalPages (unless totalItems is 0, in which case currentPage will be 1).

Example 1
Input: totalItems = 95, pageSize = 10, currentPage = 10

Output: {"endItem":95,"hasNext":false,"hasPrev":true,"startItem":91,"totalPages":10}

Explanation: Page 10 of 10. Items 91 to 95.

Example 2
Input: totalItems = 24, pageSize = 5, currentPage = 3

Output: {"endItem":15,"hasNext":true,"hasPrev":true,"startItem":11,"totalPages":5}

Explanation: Page 3 of 5. Items 11 to 15.


    Hint 1. Use Math.ceil to calculate totalPages.

    Hint 2. The start item index can be calculated using the page size and current page: (currentPage - 1) * pageSize + 1.
    
    Hint 3. The end item index is the minimum of (currentPage * pageSize) and totalItems.
    
    Hint 4. Remember to handle the edge case where totalItems is 0.


*/

interface PageMetadata {
  totalPages: number;
  startItem: number;
  endItem: number;
  hasPrev: boolean;
  hasNext: boolean;
}

function getPageMetadata(
  totalItems: number,
  pageSize: number,
  currentPage: number,
): PageMetadata {
  const totalPages = Math.ceil(totalItems / pageSize);
  // console.log("Total Pages:", totalPages);

  // const totalPages = Math.floor((totalItems + pageSize - 1) / pageSize);

  //   let totalPages = Math.floor(totalItems / pageSize);
  //   if (totalItems % pageSize !== 0) {
  //     totalPages++;
  //   }

  if (totalItems === 0) {
    return {
      totalPages: 0,
      startItem: 0,
      endItem: 0,
      hasPrev: false,
      hasNext: false,
    };
  }

  const offset = (currentPage - 1) * pageSize;
  console.log("Last Previous Items:", offset);

  return {
    totalPages,
    startItem: offset + 1,
    endItem: Math.min(offset + pageSize, totalItems),
    hasPrev: currentPage > 1,
    hasNext: currentPage < totalPages,

    // startItem: (currentPage - 1) * pageSize + 1,
    // endItem: Math.min(currentPage * pageSize, totalItems),
    // hasPrev: currentPage !== 1,
    // hasNext: currentPage !== totalPages,
  };

  // Complexity
  // Time: O(1)
  // Space: O(1)
  // Because we don't loop through the items. We only perform a fixed number of calculations.
}

// No items
console.log(getPageMetadata(0, 10, 1));

// Exactly one page
console.log(getPageMetadata(5, 10, 1));

// first page
console.log(getPageMetadata(56, 10, 1));

// Last page
console.log(getPageMetadata(95, 10, 10));

// Middle page
console.log(getPageMetadata(24, 5, 3));

// Total is exactly divisible
console.log(getPageMetadata(50, 10, 5));
