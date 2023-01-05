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

  //function finds the next big value than node
  function nextMinValue(node) {
    while (node.leftNode != null) {
      node = node.leftNode;
    }

    return node.value;
  }

  //function to find a given node
  function find(value, node = root) {
    if (node == null) {
      console.log("Value doesn't exist in the tree");
      return;
    }
    if (value < node.value) {
      find(value, node.leftNode);
    } else if (value > node.value) {
      find(value, node.rightNode);
    } else {
      console.log(node);
    }

    return;
  }

  // function for breadth-first traversal
  function levelOrder() {
    let queue = [];
    let traversalArr = [];
    let node = root;

    if (node == null) return;

    queue.push(node);

    while (queue.length) {
      let level = [];
      for (let i = 0; i < queue.length; i++) {
        traversalArr.push(queue[0].value);

        if (queue[0].leftNode) queue.push(queue[0].leftNode);
        if (queue[0].rightNode) queue.push(queue[0].rightNode);

        queue.shift();
      }
    }

    return traversalArr;
  }

  // function for inorder traversal
  function inorder(node = root, result = []) {
    if (node == null) return;

    inorder(node.leftNode, result);
    result.push(node.value);
    inorder(node.rightNode, result);

    return result;
  }

  // preorder traversal
  function preorder(node = root, result = []) {
    if (node == null) return;

    result.push(node.value);
    preorder(node.leftNode, result);
    preorder(node.rightNode, result);

    return result;
  }

  function postorder(node = root, result = []) {
    if (node == null) return;

    postorder(node.leftNode, result);
    postorder(node.rightNode, result);
    result.push(node.value);

    return result;
  }

  function height(node = root) {
    if (node == null) return -1;

    let leftHeight = height(node.leftNode);
    let rightHeight = height(node.rightNode);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  function depth(node, temp = root) {
    if (!node) return `node doesnt exist`;

    if (temp == node) return 0;

    let result = 0;

    if (node.value < temp.value) {
      result = depth(node, temp.leftNode) + 1;
    } else {
      result = depth(node, temp.rightNode) + 1;
    }

    return result;
  }

  // function to check if the trre is balanced
  // A balanced tree is one where the
  // difference between heights of left subtree
  // and right subtree of every node is not more than 1.
  function isBalanced(node = root) {
    if (!root) return `Tree is empty`;

    if (!node) return true;

    if (Math.abs(height(node.leftNode) - height(node.rightNode)) <= 1) {
      if (isBalanced(node.leftNode) && isBalanced(node.rightNode)) return true;
    }

    return false;
  }

  function rebalance() {
    let array = inorder();

    root = buildTree(array, 0, array.length - 1);
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
    find,
    levelOrder,
    inorder,
    preorder,
    postorder,
    height,
    depth,
    isBalanced,
    rebalance,
  };
}

export { Tree };

let testArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
// let testArr = [1, 2, 3];
let bst = Tree(testArr);
// bst.buildTree();
bst.insert(0);
bst.insert(2);
bst.prettyPrint(bst.root);
// console.log(bst.postorder());
// console.log(bst.depth(bst.root.leftNode.rightNode.leftNode.leftNode));
// console.log(bst.height());
console.log(bst.isBalanced());
bst.rebalance();
bst.prettyPrint(bst.root);
