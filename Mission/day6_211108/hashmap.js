// Mission : 해시맵처럼 동작하는 코드를 구현하기 : 문자열 키와 문자열 값을 저장하는 해시맵 라이브러리 구현하기

function hashMap() {
  this.obj = new Object();

  hashMap.prototype.put = (key, value) => {
    this.obj[key] = value;
  };

  hashMap.prototype.remove = key => {
    delete this.obj[key];
  };

  hashMap.prototype.containsKey = key => {
    // The in operator returns true if the specified property is in the specified object or its prototype chain
    return key in this.obj;
    // The static Reflect.has() method works like the in operator as a function
    // return Reflect.has(this.obj, key);
  };

  hashMap.prototype.get = key => {
    return this.obj[key];
  };

  hashMap.prototype.isEmpty = () => {
    // The Object.keys() method returns an array of a given object's own enumerable property names,
    // iterated in the same order that a normal loop would.
    return Object.keys(this.obj).length === 0;
  };

  hashMap.prototype.keys = () => {
    return Object.keys(this.obj);
  };

  hashMap.prototype.values = () => {
    return Object.values(this.obj);
  };

  hashMap.prototype.replace = (key, value) => {
    this.obj[key] = value;
  };

  hashMap.prototype.size = () => {
    return Object.keys(this.obj).length;
  };

  hashMap.prototype.clear = () => {
    delete this.obj;
  };
}

// test
const cost = new hashMap();

cost.put('apple', 1.5);
cost.put('banana', 3);
cost.put('cherry', 7);

console.log(`keys : ${cost.keys()}`);
console.log(`values : ${cost.values()}`);
console.log(`containsKey? ${cost.containsKey('banana')}`);
console.log(`get : ${cost.get('cherry')}`);
console.log(`isEmpty? ${cost.isEmpty()}`);
console.log(`size : ${cost.size()}`);
