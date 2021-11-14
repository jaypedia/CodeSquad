class HashTable {
  constructor(size) {
    this.storage = [];
    if (size === true) this.size = size;
    else this.size = 50; // 이렇게 숫자로만 적는 것 좋지 않다고 함
  }

  // 함수들 화살표보단 그냥 함수식으로 하는 게 나을수 있음.
  // changeAscii(key) {} 이런 식으로
  // 아스키코드로 변환
  changeAscii = key => {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % this.size;
    // const value = hash % this.size;
    // return value; 이런 식으로.
    // 디버깅할 땐 value에 할당해 놓고 검사하는 게 더 낫다고 함
  };

  //데이터 추가
  put = (key, value) => {
    let index = this.changeAscii(key);

    if (this.storage[index] === undefined) {
      this.storage[index] = [key, value];
    }
    // 추가해야 할 꺼 : 해시충돌 막기 (key 같으면 value에 배열 추가)
  };

  // 데이터 삭제
  remove = key => {
    let index = this.changeAscii(key);

    /*데이터 없다*/
    if (this.storage[index] === undefined) {
      return false;
    }

    /*데이터가 있을때*/
    if (this.storage[index].length === 2) {
      for (let i = 0; i < this.storage[index].length; i++) {
        if (this.storage[index][i] === key) {
          this.storage[index].splice(i, 2);
          return true;
        }
      }
    }
    return false;
  };

  // 키 존재 여부
  containsKey = key => {
    let index = this.changeAscii(key);

    if (this.storage[index] === undefined) {
      return false;
    } else {
      return true;
    }
  };

  // 값 찾기
  get = key => {
    let index = this.changeAscii(key);

    /*데이터가 없다*/
    if (this.storage[index] === undefined) {
      return false;
    }

    /*데이터가 있을때*/
    if (this.storage[index].length === 2) {
      return this.storage[index];
    }
  };

  // 배열이 비어있는지 아닌지 확인
  isEmpty = () => {
    let result = true;
    if (this.storage.length > 0) {
      result = false;
    }
    return result;
  };

  // key 값으로 value 대체하기
  replace = (key, value) => {
    let index = this.changeAscii(key);

    if (this.storage[index]) {
      return (this.storage[index] = [key, value]);
    }
    if (this.storage[index] === undefined) {
      return false;
    }
  };

  // 전체 사이즈
  total = () => {
    let count = 0;
    this.storage.forEach(element => count++);
    return count;
  };

  // 전체출력
  keys = () => {
    let result = '';
    let resultArray = [];
    this.storage.forEach(element => {
      element.forEach(value => {
        result += value + ', ';
      });
    });
    resultArray.push(result);
    return resultArray;
  };

  // key, value 초기화
  clear = () => {
    return (this.storage = []);
  };
}

let myHashTable = new HashTable(50);

myHashTable.put('beef', 30000); //추가
myHashTable.put('lamb', 20000); //추가
myHashTable.put('duckMeat', 15000); //추가
myHashTable.put('pork', 10000); //추가
myHashTable.put('chicken', 5000); //추가
console.log(myHashTable.keys()); //전체출력[ 'beef, 30000, lamb, 20000, duckMeat, 15000, chicken, 5000, pork, 10000, ']

console.log(myHashTable.remove('aa')); //삭제 false
console.log(myHashTable.remove('chicken')); //삭제 true
console.log(myHashTable.containsKey('Pork')); //키 존재여부 true
console.log(myHashTable.containsKey('pizza')); //키 존재여부 false
console.log(myHashTable.get('duckMeat')); //값 찾기 [ 'duckMeat', 15000 ]
console.log(myHashTable.get('hamburger')); //값 찾기 false
console.log(myHashTable.isEmpty()); //값이 들어있으면 false
console.log(myHashTable.replace('pork', 30000)); //대체하기 [ 'Pork', 30000 ]
console.log(myHashTable.total()); //총 개수 5
console.log(myHashTable.keys()); //전체출력 [ 'beef, 30000, lamb, 20000, duckMeat, 15000, pork, 30000, ' ]
console.log(myHashTable.clear()); //초기화 []
