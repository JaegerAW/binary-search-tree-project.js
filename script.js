class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }
  buildTree(array) {
    //accepts an array of integers and sort them into binary search tree;
    //loop through the given array, creating a node for each item. insert nodes into the array in a binarySearchTree  manner.
    array.forEach((item) => {
      this.insert(item);
    });
  }
  isEmpty() {
    return this.root === null;
  }

  insert(value) {
    //accepts an integer value and sort it into the tree;
    let newNode = new Node(value);
    if (this.root === null) {
      this.root = newNode;
      return this;
    }
    let current = this.root;
    while (true) {
      if (value === current.value) return undefined; //value already exists;
      if (value < current.value) {
        if (current.left === null) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else if (value > current.value) {
        if (current.right === null) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }
  insertRecursively(value) {
    let newNode = new Node(value);
    if (this.isEmpty()) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }
  insertNode(root, newNode) {
    if (newNode.value < root.value) {
      //if newNode is smaller than root
      if (root.left === null) {
        //if root doesnt have left child, set left child to new Node;
        root.left = newNode;
      } else {
        // if left child does exist, we need to traverse the tree to the left,
        this.insertNode(root.left, newNode); //recursively executed, now it will traverse the tree until it finds the right spot.
      }
    } else {
      if (root.right === null) {
        root.right = newNode;
      } else {
        this.insertNode(root.right, newNode);
      }
    }
  }
  min(root) {
    if (root.left === null) {
      return root.value;
    } else {
      return this.min(root.left);
    }
  }

  max(root) {
    if (root.right === null) {
      return root.value;
    } else {
      return this.max(root.right);
    }
  }

  deleteRecursively(value) {
    this.root = this.deleteNodeRecursively(this.root, value);
  }
  deleteNodeRecursively(root, value) {
    if (root === null) {
      //this happens IF value is not in the tree.
      return root;
    }
    if (value < root.value) {
      root.left = this.deleteNodeRecursively(root.left, value);
    } else if (value > root.value) {
      root.right = this.deleteNodeRecursively(root.right, value);
    } else {
      //found the value
      //case1 node is leaf
      if (!root.left && !root.right) return null; //if this didnt execute, root definitely has at least 1 child;
      if (!root.left)
        return root.right; //root has no left child, has right child.
      else if (!root.right)
        return root.left; //root has no right child, has left child;
      else {
        root.value = this.min(root.right); //root is the target of deleteNode, we find what's smallest in its right subtree, and point the previous root to this root.
        root.right = this.deleteNodeRecursively(root.right, root.value); //we need to delete the node that we switched with because we used that value to replace the original delete target.
      }
    }
    return root; //this returns root so that deleteRecursively can call it and assign it to this.root;
  }

  find(value) {
    //accepts an integer value and search for it in the tree. IF found ,return the node with the value;
    if (this.root === null) {
      return undefined;
    }
    let current = this.root;
    while (current) {
      if (current.value === value) {
        return current;
      } else if (current.value > value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return false;
  }

  findRecursively(root, value) {
    if (!root) {
      //if tree is empty, return null
      return false;
    } else {
      //tree is not empty;
      if (root.value === value) {
        console.log("found");
        return root;
      } else if (value < root.value) {
        return this.findRecursively(root.left, value);
      } else {
        return this.findRecursively(root.right, value);
      }
    }
  }

  findMinHeight(node = this.root) {
    //min height is the distance between the root to the first node without both left and right children(1. node with only 1 child, 2. leaf node);
    if (!node) return -1;
    let left = this.findMinHeight(node.left);
    let right = this.findMinHeight(node.right);
    if (left < right) return left + 1;
    else return right + 1;
  }
  findMaxHeight(node = this.root) {
    if (!node) return -1;
    let left = this.findMaxHeight(node.left);
    let right = this.findMaxHeight(node.right);
    if (left < right) {
      return right + 1;
    } else return left + 1;
  }

  height(value) {
    //findmaxheight
    //given a node, return its height where height represents the distance between the node to its furthest leaf child;
    let node = this.find(value);
    return this.findMaxHeight(node);
  }
  depth(value) {
    return this.findDepth(this.root, value);
  }
  findDepth(node, value) {
    //given a node, return the distance from the node to the root.
    if (!node) {
      console.log("not found");
      return undefined;
    }
    if (node.value === value) return 0;
    else if (node.value > value) return this.findDepth(node.left, value) + 1;
    else return this.findDepth(node.right, value) + 1;
  }

  isBalanced() {
    return this.findMinHeight() >= this.findMaxHeight() - 1; //checks to see if the tree is balanced. Balanced is achieved when left subtree and right subtree height is <=1;
  }
  rebalance() {
    if (!this.isBalanced()) {
      const arr = this.inOrder();
      //arr is now filled with the nodes of the tree in a sorted manner;
      //build the tree.
      return this.buildBalancedTree(arr);
    } else return;
    //if isbalanced is false;
    //we can do a inOrder traversal to get a sorted array
    //use this sorted array and
  }
  buildBalancedTree(array) {
    if (array.length === 0) {
      return null;
    }

    let mid = Math.floor(array.length / 2);
    let node = new Node(array[mid]);
    let left = array.slice(0, mid);
    let right = array.slice(mid + 1);
    node.left = this.buildBalancedTree(left);
    node.right = this.buildBalancedTree(right);
    return node;
  }

  //findRecursively(odinTree.root,100);
  //root is not empty, value > root.value;
  //findRecursively(odinTree.root.right, 100);

  levelOrder(callback) {
    //BFS
    const queue = [];
    const data = [];
    let node = this.root;
    queue.push(this.root);
    while (queue.length) {
      node = queue.shift();
      data.push(node.value);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    return data;
  }

  inOrder(callback) {
    //inOrderDFS
    if (this.root === null) {
      return undefined;
    }
    const data = [];
    let current = this.root;
    const traverse = (node) => {
      if (node.left) {
        traverse(node.left);
      }
      data.push(node.value);
      if (node.right) {
        traverse(node.right);
      }
    };
    traverse(current);
    return data;
  }
  preOrder(callback) {
    //preOrderDFS
    if (this.root === null) {
      return undefined;
    }
    const data = [];
    let current = this.root;
    const traverse = (node) => {
      data.push(node.value);
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    };
    traverse(current);
    return data;
  }

  postOrder(callback) {
    //postOrderDFS
    if (this.root === null) {
      return undefined;
    }
    const data = [];
    let current = this.root;
    const traverse = (node) => {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      data.push(node.value);
    };
    traverse(current);
    return data;
  }
}

const odinTree = new BinarySearchTree();
const array = [10, 5, 15, 20, 21, 1, 17, 24];
const array1 = [5, 3, 6, 2, 4, 7];
odinTree.buildTree(array1);

//                                  10
//                           5              20
//                       2      9        12         50
//                        3          11     15   35
//                                             21   36 if remove 50, cant go to 35, must swap with 36

//IMPORTANT NOTE ON DELETENODE
//while (current) {
//DONT DO THIS HERE! DO IT IF CURRENT VALUE > || < VALUE,set a variable prev to current, to store as parent node;
//if current.value > value, prev = current, current = current.left; once we traverse left, we set prev to current.left,
//ELSE if current.value < value, prev = current, current = current.right;
//ELSE if current.value === value {
//
//}

//}

//                  10
//           5             15
//   1                              20
//                            16            21
//                                                  24

//findRecursively(odinTree.root, 17);
//root is not empty, value > root = 10, findRecursively(odinTree.right, 17);
//root is not empty = 15, value > root = 15, findRecursively(odinTree.right.right, 17);
//root is not empty = 20, value < root = 20, findRecursively(odinTree.right.right.left, 17);
//root is not empty = 16, value > root = 16, findRecursively(odinTree.right.right.left.right, 17);
//root is empty, return false;

/* FAIL
  deleteNode(value) {
    let current = this.root;
    let prev;
    if (!current) {
      console.log("hello");
      return undefined;
    }
    if (!value) return undefined; //if i delete a node, then i keyup and landed on odinTree.deleteNode() in my textbox, stuck. this solves it.
    //this might only be a bug in console though. or when i accidentally press delete button without inputting value;
    while (current) {
      if (current.value > value) {
        prev = current;
        current = current.left;
      } else if (current.value < value) {
        prev = current;
        current = current.right;
      } else {
        //node found.
        if (!current.left && !current.right) {
          //case 1: node is leaf node, no left and right children
          if (prev.value > current.value) {
            //if parent > target, target is at left, parent.left = null; target removed
            prev.left = null;
          } else {
            prev.right = null; //if parent < target, target is right of parent, parent.right = null; target removed;
          }
          return this;
        }
        //case 2: node has either left or right child
        else if (!current.left) {
          //target has only right child;
          if (prev.value > current.value) {
            //if parent > target, target is left child of parent,AND target has only right child; parent.left = target.right; target removed;
            prev.left = current.right;
          } else if (prev.value < current.value) {
            //parent < target, target is right child of parent, AND target has only right child, parent.right = target.right, target skipped and removed;
            prev.right = current.right;
          }
          return current;
        } else if (!current.right) {
          //target has only left child;
          if (prev.value < current.value) {
            //parent < target, target is right child of parent, AND target only has left child; parent.right = target.left;
            prev.right = current.left;
          } else if (prev.value > current.value) {
            //parent > target, target is left child of parent, AND target has only left child, parent.left = target.left;
            prev.left = current.left;
          }
          return current;
        }
        //case 3: node has both left and right children
        //traverse through the tree again from current/target, find biggest node on left subtree OR smallest node on right subtree.
        //assign a new prev variable to nullify the target
        //when found, current = THAT node;
        let newPrev;
        let newCurrent = current.left; //we use biggest node on left of current;
        if (prev.value > current.value) {
          //if parent is bigger than child to be removed;
          if (newCurrent.right) {
            //IF current.left has bigger children on the right, traverse right
            while (newCurrent.right) {
              newPrev = newCurrent;
              newCurrent = newCurrent.right;
            }
            newPrev.right = null;
            prev.left = newCurrent;
            prev.left.left = newPrev;
            prev.left.right = current.right;
            return current;
          }
          //current.left has no bigger children on the right, this is the biggest element in left subtree.
          prev.left = newCurrent;
          prev.left.right = current.right;
          return current;
        } else if (prev.value < current.value) {
          if (newCurrent.right) {
            //IF current.left has bigger children on the right, traverse right
            while (newCurrent.right) {
              newPrev = newCurrent;
              newCurrent = newCurrent.right;
            }
            newPrev.right = null;
            prev.right = newCurrent;
            prev.right.left = newPrev;
            prev.left.right = current.right;
            return current;
          }
          prev.right = newCurrent;
          prev.right.right = current.right;
        }
      }
    }
    return false;
  }
*/
