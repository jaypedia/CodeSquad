function HashMap(size = 31) {
  this.size = size;
  this.keyMap = new Array(this.size);
}

HashMap.prototype._hash = function (key) {
  const MAX_NUM = 100;

  let hash = 0;
  for (let i = 0; i < Math.min(key.length, MAX_NUM); i++) {
    const charCode = key.charCodeAt(i);
    hash = (hash + charCode) % this.keyMap.length;
  }
  return hash;
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
  if (!this.keyMap[index]) return null;

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
  if (this.isEmpty()) return keysArr;

  for (let i = 0; i < this.keyMap.length; i++) {
    if (this.keyMap[i]) {
      for (let j = 0; j < this.keyMap[i].length; j++) {
        const currentKey = this.keyMap[i][j][0];
        if (!keysArr.includes(currentKey)) {
          keysArr.push(currentKey);
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
};

HashMap.prototype.getItemSize = function () {
  return this.keyMap.reduce((acc, cur) => {
    acc += cur.length;
    return acc;
  }, 0);
};

HashMap.prototype.clear = function () {
  this.keyMap = new Array(this.size);
};

// HashMap Test

const hashMap = new HashMap();

hashMap.put('violet', '#000400');
hashMap.put('plum', '#000411');
hashMap.put('red', '#000412');
hashMap.put('black', '#000413');
hashMap.put('black2', '#000000');
hashMap.put('white', '#ffffff');

console.log(hashMap.get('violet'));
console.log(hashMap.contains('vvv'));
console.log(hashMap.keyMap);
console.log(hashMap.isEmpty());
