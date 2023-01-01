// merge sort using recursion

function mergeSort(array) {
  if (array.length < 2) {
    return array;
  } else {
    let mid = Math.round(array.length / 2);

    //sort left half of the array
    let leftHalf = mergeSort(array.slice(0, mid));
    //sort left half of the array
    let rightHalf = mergeSort(array.slice(mid, array.length));

    //merge two halfs
    return merge(leftHalf, rightHalf);
  }
}

function merge(left, right) {
  let arr = [];
  let leftIndex = 0;
  let rightIndex = 0;

  //loop runs till both arrays are empty
  while (leftIndex < left.length || rightIndex < right.length) {
    //check which element is smaller or if right array is empty
    if (left[leftIndex] <= right[rightIndex] || rightIndex >= right.length) {
      arr.push(left[leftIndex]); //push the element in arr
      leftIndex++; //increase the index by one
    }
    // same thing in this section
    // would have been better if i used array.shift() instead of indexes, but i forgor :\
    else if (right[rightIndex] <= left[leftIndex] || leftIndex >= left.length) {
      arr.push(right[rightIndex]);
      rightIndex++;
    }
  }
  return arr;
}

export { mergeSort };
