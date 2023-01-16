class Heap {

    list = [];
    constructor() {
      this.list = [-1, 5, 10, 20, 14, 16, 24, 26];
    }
  
    isRoot(index) {
      return index == 1;
    }
    getLeftIndex(index) {
      return 2 * index;
    }
    getLeftNode(index) {
      return this.list[this.getLeftIndex(index)];
    }
    getRightIndex(index) {
      return 2 * index + 1;
    }
    getRightNode(index) {
      return this.list[this.getRightIndex(index)];
    }
    getParentIndex(index) {
      return Math.floor(index / 2);
    }
    getParentNode(index) {
      return this.list[this.getParentIndex(index)];
    }
  
    // add(value) {
    //   const len = this.list.length;
    //   this.list.push(value);
    //   if (len == 1) {
    //     return value;
    //   }    
    //   this.heapifyUp(this.list);
    //   return this.list[1];
    // }
  
    // remove() {
    //   if (this.list.length == 1) return null;
    //   if (this.list.length == 2) return this.list.pop();
    //   const prevRoot = this.list[1];
    //   // bring last val to root
    //   this.list[1] = this.list.pop();
    //   // reorder top to bottom
    //   this.heapifyDown(this.list);
    //   console.log("Numero Removido: ", prevRoot);
    //   return prevRoot;
    // }
  
    heapifyUp(list) {
      let i = list.length - 1;
      const val = list[i];
      while (!this.isRoot(i) && this.getParentNode(i) > val) {
        [list[this.getParentIndex(i)], list[i]] = [
          val,
          this.getParentNode(i),
        ];
        i = this.getParentIndex(i);
      }
  
      console.log("Lista depois de adição: ", this.list);
    }
  
    heapifyDown(list) {
      if (list < 3) return;
      let i = 1;
      const currentVal = list[1];
      let leftVal = this.getLeftNode(i);
      let rightVal = this.getRightNode(i);
      while (
        leftVal !== undefined &&
        (currentVal > leftVal || currentVal > rightVal)
      ) {
        if (
          currentVal > leftVal &&
          (rightVal === undefined || leftVal < rightVal)
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
        leftVal = this.getLeftNode(i);
        rightVal = this.getRightNode(i);
      }
    }
  }
  