# Mission 4. HashMap

> 2021.11.8 & 2022.2.4

## About HashMap

### Fast access to stored data given a key

- HashMap은 프로그래밍에서 매우 유용한 자료구조 중 하나입니다.
  - JavaScript뿐만 아니라 Java, C++, Python 등 다양한 프로그래밍 언어에서 지원됩니다.
  - HashMap을 잘 이해한다면 대용량 데이터를 빠르게 검색할 수 있고, 효율적으로 데이터를 관리할 수 있습니다.
- key-value 쌍으로 데이터를 저장하며, 각각의 key는 유일하며 값은 중복될 수 있습니다. 이를 통해 데이터 검색을 매우 빠르게 할 수 있습니다.
  - HashMap은 삽입, 삭제, 검색 작업의 시간 복잡도가 모두 O(1)입니다.

### Hash Functions

- HashMap은 내부적으로 해시 함수를 사용해서 데이터를 저장하고 검색합니다.
  - 해시 함수는 데이터의 고유한 식별자인 해시 코드를 계산하고, 이 해시 코드를 사용해서 데이터를 저장하고 검색합니다.
  - 해시 함수는 해시 충돌을 최소화하고 균등하게 값을 분포시키는 것이 중요합니다.
  - 해시 함수는 주어진 입력이 같다면 동일한 반환 값을 리턴합니다.

### Collisions

- HashMap은 충돌이 발생할 가능성이 있습니다.
  - 여기서 말하는 충돌이란, 두 개 이상의 데이터가 동일한 해시 코드를 가지는 경우를 말합니다.
    - 즉, HashMap의 인덱스에서 여러 개의 key-value 쌍을 찾을 수 있게 될 때 충돌이라고 합니다.
- 충돌을 해결하기 위해 HashMap은 내부적으로 충돌 해결 알고리즘을 사용합니다.
  - 대표적으로 Separate Chaining과 Open Addressing, linear probing 등의 방법이 있습니다.
- 충돌은 작은 크기의 HashMap에서 더 자주 발생할 수 있지만, 큰 크기의 HashMap이거나 좋은 hash function을 사용하더라도 피하기 어렵습니다.
  - 이번 미션에서는 소수(prime numbers)를 사용하여 충돌을 줄일 수 있는 방법을 구현해 보았습니다.

## Objectives

- [x] HashMap을 직접 구현하며 동작 원리를 이해한다.
- [x] HashMap에서 충돌을 방지하는 방법을 학습한다.
- [x] class가 아닌 prototype의 속성을 활용해서 객체를 만든다.

## Implementation

### `HashMap(Number size)`

```js
function HashMap(size = 31) {
  this.size = size;
  this.keyMap = new Array(this.size);
}
```

- `HashMap` 객체(Instance)를 생성하기 위해 생성자 함수(Constructor Function)을 이용했다.
  - `size` 숫자 매개변수를 받아 `keyMap` 배열을 생성하고, 객체 내부에서 참조할 수 있도록 `this`에 할당했다.
- `keyMap`: 이 배열의 크기는 `size`로 정해지며, 이 배열은 각각의 slot에서 해시 충돌이 일어나지 않도록 해시 값을 기반으로 값을 저장하고 검색하기 위해 사용된다.
- `new` 연산자와 함께 생성자 함수를 호출하면 인스턴스를 생성할 수 있다.
  - 이렇게 생성된 인스턴스는 프로토타입을 통해 생성자 함수와 연결된다.
  - 인스턴스마다 `size`와 `keyMap` 속성이 공유되지 않고 독립적으로 생성된다.
- `HashMap`의 크기에 소수(prime number)를 사용하여 각 slot에 값들이 균등하게 들어갈 수 있도록 하였다.
  - 소수는 1과 자기 자신으로만 나눠질 수 있다. 따라서 소수는 1과 자기 자신을 제외한 수의 배수가 될 수 없다. 따라서 %(modular) 연산을 했을 때 배수가 나오지 않게 된다.
  - 배수가 나오지 않게 되므로, keyMap에 값들이 균등하게 위치할 수 있다.

### `_hash(String key)`

```js
HashMap.prototype._hash = function (key) {
  const MAX_NUM = 100;

  let hash = 0;
  for (let i = 0; i < Math.min(key.length, MAX_NUM); i++) {
    const charCode = key.charCodeAt(i);
    hash = (hash + charCode) % this.keyMap.length;
  }
  return hash;
};
```

- 주어진 `key`를 통해 `keyMap`에 저장될 인덱스를 계산하기 위한 해시 함수이다.
- 최대 길이(`MAX_NUM`)값을 통해 `key` 문자열의 최대 길이를 제한하였다.

### `put(String key, String value)`

```js
HashMap.prototype.put = function (key, value) {
  const index = this._hash(key);
  if (!this.keyMap[index]) {
    this.keyMap[index] = [];
  }
  this.keyMap[index].push([key, value]);
};
```

- key와 value 값을 배열의 형태로 keyMap에 저장한다.

### `remove(String key)`

```js
HashMap.prototype.remove = function (key) {
  const index = this._hash(key);
  if (!this.keyMap[index]) return [];

  for (let i = 0; i < this.keyMap[index].length; i++) {
    if (this.keyMap[index][i][0] === key) {
      return this.keyMap[index].splice(i, 1);
    }
  }
};
```

- 주어진 key의 value를 삭제하고, remove 된 대상(value)을 리턴한다.
- key에 해당하는 value가 없을 경우, 빈 배열을 리턴한다.

### `contains(String key)`

```js
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
```

- 해당 key가 존재하는지 판단하여 `true` 또는 `false`로 리턴한다.

### `get(String key)`

```js
HashMap.prototype.get = function (key) {
  const index = this._hash(key);
  if (!this.keyMap[index]) return null;

  for (let i = 0; i < this.keyMap.length; i++) {
    if (this.keyMap[index][i][0] === key) return this.keyMap[index][i][1];
  }
};
```

- 해당 key와 매치되는 value를 찾아서 리턴한다.

### `isEmpty()`

```js
HashMap.prototype.isEmpty = function () {
  for (let i = 0; i < this.keyMap.length; i++) {
    if (this.keyMap[i]) return false;
  }
  return true;
};
```

- keyMap이 비어 있는지 여부를 알려 주는 함수이다.

### `keys()`

```js
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
```

- 전체 key의 목록을 배열로 리턴한다.
- 중복된 key는 포함하지 않기 위해 배열 메서드 `includes`를 활용했다.

### `replace(String key, String value)`

```js
HashMap.prototype.replace = function (key, value) {
  const index = this._hash(key);
  if (!this.keyMap[index]) return [];

  for (let i = 0; i < this.keyMap[index].length; i++) {
    if (this.keyMap[index][i][0] === key) {
      return this.keyMap[index].splice(i, 1, [key, value]);
    }
  }
};
```

- 일치하는 key를 찾아서 key, value로 기존의 아이템을 대체한다.

### `getItemSize()`

```js
HashMap.prototype.getItemSize = function () {
  return this.keyMap.reduce((acc, cur) => {
    acc += cur.length;
    return acc;
  }, 0);
};
```

- 전체 아이템의 개수를 리턴한다.

### `clear()`

```js
HashMap.prototype.clear = function () {
  this.keyMap = new Array(this.size);
};
```

- 전체 map을 초기화한다.
- 모든 key, value를 각각 `remove`메서드를 적용하여 삭제하는 방법도 있지만, 좀 더 간단히 구현하기 위해 새로운 배열을 할당했다.
  - 다만 이 방식은 Memory leak 문제가 있을 수 있다.

---

### Reference

- [Why Should the Length of Your Hash Table Be a Prime Number?](https://medium.com/swlh/why-should-the-length-of-your-hash-table-be-a-prime-number-760ec65a75d1)
