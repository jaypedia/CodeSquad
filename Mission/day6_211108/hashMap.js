function HashMap(size = 53) {
  this.size = size;
  this.keyMap = new Array(this.size);
  this.maxNum = 100;
  this.primeNum = 31;
}

HashMap.prototype._hash = function (key) {
  let total = 0;
  for (let i = 0; i < Math.min(key.length, this.maxNum); i++) {
    const char = key[i];
    const value = char.charCodeAt(0) - 96;
    total = (total * this.primeNum + value) % this.keyMap.length;
  }
  return total;
};

HashMap.prototype.put = function (key, value) {
  const index = this._hash(key);
  if (!this.keyMap[index]) {
    this.keyMap[index] = [];
  }
  this.keyMap[index].push([key, value]);
};

HashMap.prototype.remove = function (key) {
  const index = this._hash(key);
  if (!this.keyMap[index]) return [];
  for (let i = 0; i < this.keyMap[index].length; i++) {
    if (this.keyMap[index][i][0] === key) {
      return this.keyMap[index].splice(i, 1);
    }
  }
  return [];
};

HashMap.prototype.contains = function (key) {
  const index = this._hash(key);
  if (!this.keyMap[index]) return false;
  for (let i = 0; i < this.keyMap[index].length; i++) {
    if (this.keyMap[index][i][0] === key) {
      return true;
    }
  }
  return false;
};

HashMap.prototype.get = function (key) {
  const index = this._hash(key);
  if (!this.keyMap[index]) return 'No result';

  for (let i = 0; i < this.keyMap.length; i++) {
    if (this.keyMap[index][i][0] === key) return this.keyMap[index][i][1];
  }
};

HashMap.prototype.isEmpty = function () {
  for (let i = 0; i < this.keyMap.length; i++) {
    if (this.keyMap[i]) return false;
  }
  return true;
};

HashMap.prototype.keys = function () {
  const keysArr = [];
  if (this.isEmpty()) return keys;
  for (let i = 0; i < this.keyMap.length; i++) {
    if (this.keyMap[i]) {
      for (let j = 0; j < this.keyMap[i].length; j++) {
        if (!keysArr.includes(this.keyMap[i][j][0])) {
          keysArr.push(this.keyMap[i][j][0]);
        }
      }
    }
  }
  return keysArr;
};

HashMap.prototype.replace = function (key, value) {
  const index = this._hash(key);
  if (!this.keyMap[index]) return [];
  for (let i = 0; i < this.keyMap[index].length; i++) {
    if (this.keyMap[index][i][0] === key) {
      return this.keyMap[index].splice(i, 1, [key, value]);
    }
  }
  return [];
};

HashMap.prototype.getItemSize = function () {
  let itemSize = 0;
  this.keyMap.forEach(v => {
    itemSize += v.length;
  });
  return itemSize;
};

HashMap.prototype.clear = function () {
  this.keyMap = new Array(this.size);
};

const hm = new HashMap(3);
hm.put('violet', '#000400');
hm.put('plum', '#000411');
hm.put('red', '#000412');
hm.put('black', '#000413');
hm.put('black', '#000413');
console.log(hm.keyMap);
hm.get('violet');
hm.contains('vvv');

const hm2 = new HashMap(3);
