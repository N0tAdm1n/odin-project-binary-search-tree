import { mergeSort } from "./merge-sort";

function Node(value = null, leftNode = null, rightNode = null) {
  return {
    value,
    leftNode,
    rightNode,
  };
}

function Tree(array) {
  let root = buildTree();
  let sortedArray = mergeSort(array);

  //   function buildTree(array) {
  //       let mid =

  //   }

  return {
    get root() {
      return root;
    },
  };
}
