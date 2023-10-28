/*
Filename: ComplexCode.js

Description: This code demonstrates a complex sorting algorithm known as merge sort.
Merge sort is an efficient, stable sorting algorithm that works by repeatedly dividing the unsorted list into smaller sublists, sorting them, and then merging them back together. This algorithm has a time complexity of O(n log n), making it a popular choice for sorting large data sets.

Note: Although this code may seem complex, it showcases the power and elegance of the merge sort algorithm in a concise manner.

*/

function mergeSort(array) {
  if (array.length <= 1) {
    return array;
  }

  const middle = Math.floor(array.length / 2);
  const left = array.slice(0, middle);
  const right = array.slice(middle);

  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  let resultArray = [],
    leftIndex = 0,
    rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      resultArray.push(left[leftIndex]);
      leftIndex++;
    } else {
      resultArray.push(right[rightIndex]);
      rightIndex++;
    }
  }

  return resultArray
    .concat(left.slice(leftIndex))
    .concat(right.slice(rightIndex));
}

// Example usage
const unsortedArray = [9, 5, 7, 1, 3, 8, 4, 2, 6];
const sortedArray = mergeSort(unsortedArray);

console.log("Unsorted Array: ", unsortedArray);
console.log("Sorted Array: ", sortedArray);

/* 
Expected Output:

Unsorted Array:  [9, 5, 7, 1, 3, 8, 4, 2, 6]
Sorted Array: [1, 2, 3, 4, 5, 6, 7, 8, 9]
*/