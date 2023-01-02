//Node for bst
function Node(value = null, leftNode = null, rightNode = null) {
  return {
    value,
    leftNode,
    rightNode,
  };
}

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

function removeDuplicate(array) {
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] == array[i + 1]) {
      array.splice(i, 1);
    }
  }

  return array;
}

function Tree(array) {
  let sortedArray = mergeSort(array);
  sortedArray = removeDuplicate(sortedArray);
  let root = buildTree(sortedArray, 0, sortedArray.length - 1);

  function buildTree(arr, start, end) {
    if (start > end) return null;

    let mid = Math.round((start + end) / 2);

    let newNode = Node(arr[mid]);
    newNode.leftNode = buildTree(arr, start, mid - 1);
    newNode.rightNode = buildTree(arr, mid + 1, end);

    return newNode;
  }

  function getArray() {
    return sortedArray;
  }

  //function to insert node in bst
  function insert(valueToInsert, node = root) {
    if (node == null) return Node(valueToInsert);

    if (valueToInsert < node.value) {
      node.leftNode = insert(valueToInsert, node.leftNode);
    } else if (valueToInsert > node.value) {
      node.rightNode = insert(valueToInsert, node.rightNode);
    }

    return node;
  }

  //function to remove node in bst
  function remove(valueToRemove, node = root) {
    if (node == null) return node;

    if (valueToRemove < node.value) {
      node.leftNode = remove(valueToRemove, node.leftNode);
    } else if (valueToRemove > node.value) {
      node.rightNode = remove(valueToRemove, node.rightNode);
    } else {
      if (node.leftNode == null) {
        return node.rightNode;
      } else if (node.rightNode == null) {
        return node.leftNode;
      }

      node.value = nextMinValue(node.rightNode);

      node.rightIndex = remove(node.value, node.rightNode);
    }

    return node;
  }

  function nextMinValue(node) {
    while (node.leftNode != null) {
      node = node.leftNode;
    }

    return node.value;
  }

  // code from odin project
  const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node.rightNode !== null) {
      prettyPrint(
        node.rightNode,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.leftNode !== null) {
      prettyPrint(node.leftNode, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  return {
    get root() {
      return root;
    },
    getArray,
    prettyPrint,
    insert,
    remove,
  };
}

let testArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let bst = Tree(testArr);
// bst.buildTree();
bst.prettyPrint(bst.root);
bst.remove(67);
bst.prettyPrint(bst.root);
