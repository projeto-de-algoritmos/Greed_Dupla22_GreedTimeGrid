class Heap {
    constructor() {
      this.list = [-1];
    }
    isRoot(index) {
      return index == 1;
    }
    getLeftIndex(index) {
      return 2 * index;
    }
    getLeftNode(index, list) {
      return list[this.getLeftIndex(index)];
    }
    getRightIndex(index) {
      return 2 * index + 1;
    }
    getRightNode(index, list) {
      return list[this.getRightIndex(index)];
    }
    getParentIndex(index) {
      return Math.floor(index / 2);
    }
    getParentNode(index, list) {
      return list[this.getParentIndex(index)];
    }
  
    heapifyUp(list) {
      let i = list.length - 1;
      const val = list[i];
      console.log('Val: ', val);
      console.log('Val 1: ', list[1]);
      console.log('Val 2: ', list[2]);
      console.log('Parent ind: ', i);
      console.log('Parent Node: ', this.getParentNode(i, list));
      while (!this.isRoot(i) && this.getParentNode(i, list).end > val.end) {
        [list[this.getParentIndex(i)], list[i]] = [
          val,
          this.getParentNode(i, list),
        ];
        i = this.getParentIndex(i);
      }
  
      console.log("Lista depois de adição: ", this.list);
    }
  
    heapifyDown(list) {
      if (list < 3) return;
      let i = 1;
      const currentVal = list[1];
      let leftVal = this.getLeftNode(i, list);
      let rightVal = this.getRightNode(i, list);
      while (
        leftVal !== undefined &&
        (currentVal.end > leftVal.end || currentVal.end > rightVal.end)
      ) {
        if (
          currentVal.end > leftVal.end &&
          (rightVal === undefined || leftVal.end < rightVal.end)
        ) {
          [list[this.getLeftIndex(i)], list[i]] = [currentVal, leftVal];
          i = this.getLeftIndex(i);
        } else {
          [list[this.getRightIndex(i)], list[i]] = [
            currentVal,
            rightVal,
          ];
          i = this.getRightIndex(i);
        }
        leftVal = this.getLeftNode(i, list);
        rightVal = this.getRightNode(i, list);
      }
    }
}
 
module.exports = {Heap};
