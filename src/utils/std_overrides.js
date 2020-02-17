
// [1,2,3,4,5,6,7,8,9,10,11]
// -> [[1,2,3,4,5], [6,7,8,9,10], [11]]
Array.prototype.toGroups = function toGroups() {
    let ar = []
    for (let i = 0; i<this.length; i++) {
        if (i % 5 === 0) ar.push([])
        ar[ ar.length-1 ].push( this[i] )
    }
    if (ar.length === 0) return [[]]
    else return ar
}

// 'a b c d e f' -> ['a','b','c','d','e','f'] -> [['a','b','c','d','e'], ['f']]
String.prototype.parseProductions = function parseProductions () {
    return this.split(/\s+/m).filter(a=>a).toGroups()
}


// Array.prototype.shuffle = function shuffle(times) {
//     for (let i = 0; i<times; i++) {
//         let first = Math.floor( Math.random() * this.length )
//         let second = Math.floor( Math.random() * this.length )

//         let temp = this[first]
//         this[first] = this[second]
//         this[second] = temp
//     }
//     return this
// }


Array.prototype.swap = function(index1, index2) {
    const temp = this[index1];
    this[index1] = this[index2];
    this[index2] = temp;
  
    return this;
  };
  
  // Fisher-Yates shuffle
  Array.prototype.shuffle = function() {
    for (let i = this.length - 1; i >= 1; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      this.swap(i, j);
    }

    return this;
  };
  
  Array.prototype.pickRandom = function() {
    return this[Math.floor(Math.random() * this.length)];
  };
  
  Array.prototype.isSameWith = function(arr) {
    if (this.length !== arr.length) {
      return false;
    }
    for (let i = 0; i < this.length; i++) {
      if (this[i] !== arr[i]) {
        return false;
      }
    }
    return true;
  };
  