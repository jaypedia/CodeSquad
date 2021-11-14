// 11/10 10:40 코드리뷰

function HashTable() {
  this.storage = [];
  this.size = 13; // 상수 말고 다른 방법으로 사이즈를 할당하는 방법은 없을까?
  // this.size = size 이런 식으로 매개변수로 전달하는 게 나을까?
}

//아스키코드로 바꾸는 함수
HashTable.prototype.makeAscii = function (key) {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash += key.charCodeAt(i);
  }
  //console.log(hash);
  return hash % 13; //13 this.size
};

//넣어주는 함수
HashTable.prototype.put = function (key, value) {
  let index = this.makeAscii(key);
  if (this.storage[index] !== null) {
    this.storage[index] = [key, value];
  }
  //   console.log(this.storage);
};

//[]containsKey(String) 해당 키가 존재하는지 판단해서 Bool 결과를 리턴한다.
HashTable.prototype.containsKey = function (key) {
  //   let index = this.makeAscii(key);
  //   if (this.storage[index].length === 0) {
  //     return true;
  //   } else {
  //     return false;
  //   }

  // forEach문의 활용
  let result = false;
  this.storage.forEach(v => {
    if (v[0] === key) result = true;
  });

  return result;

  // 아래 코드는 실패
  //   this.storage.forEach(v => {
  //     if (v[0] === key) return true;
  //   });
  //   return false;

  // map & includes의 활용 - map은 콜백 함수의 결과를 array로 반환함.
  this.storage.map(v => v[0] === key).includes(true);
};

//[]get(String) 해당 키와 매치되는 값을 찾아서 리턴한다.
HashTable.prototype.get = function (key) {
  let index = this.makeAscii(key);
  if (this.storage[index] === key) {
    return this.storage[index];
  }
};

// []replace(String key, String value) 키-값으로 기존 값을 대체한다.
HashTable.prototype.replace = function (key, value) {
  let index = this.makeAscii(key);

  if (this.storage[index]) {
    return (this.storage[index] = [key, value]);
  }
};

const myTable = new HashTable();

myTable.put('태리로제', 9000);
myTable.put('신전떡볶이', 5000);
myTable.put('엽기떡볶이', 16000);
myTable.put('벌떡', 16000);
myTable.put('떡군이네', 9000);
myTable.put('pizza', 20000);
console.log(myTable.storage);

console.log(myTable.containsKey('pizza'));
// console.log(myTable.get('떡군이네'));
// console.log(myTable.remove('pizza'));
// console.log(myTable.replace('배떡', 9000));
// console.log(this.storage);
