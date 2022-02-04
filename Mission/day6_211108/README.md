# Hashmap

##### 2022.2.4

## Objectives

- [x] 기본이 되는 자료구조 중 하나인 Hashmap을 직접 구현해보며 기초를 쌓는다.
- [x] 충돌을 방지하는 방법을 학습한다.
- [x] 중복을 방지하기 위한 알고리즘은 어떻게 해야할지 학습한다.
- [x] 부가적으로는 class가 아닌 prototype을 이용해보며 prototype에도 익숙해진다.

---

## Implementation

- 중첩된 배열 구조를 활용

## Hashmap functions

### `put(String key, String value)`

- key와 value 값을 Hashmap에 추가한다.

### `remove(String key)`

- 해당 key에 있는 value를 삭제한다.
- remove 된 대상을 return한다.
- 해당하는 key가 없을 경우, 빈 배열을 리턴한다. (`Array.prototype.splice`와 동일)

### `contains(String key)`

- 해당 key가 존재하는지 판단하여 true/false로 리턴한다.

### `get(String key)`

- 해당 key와 매치되는 value를 찾아서 리턴한다.

### `isEmpty()`

- 비어 있는 map인지를 true/false로 리턴한다.

### `keys()`

- 전체 key의 목록을 배열로 리턴한다.
- 중복된 key는 포함하지 않기 위해 배열 메서드 `includes`를 활용했다.

### `replace(String key, String value)`

- 일치하는 key를 찾아서 key, value로 기존의 아이템을 대체한다.
- `remove`와 유사

### `getItemSize()`

- 전체 아이템의 개수를 리턴한다.

### `clear()`

- 전체 map을 초기화한다.
- key, value를 하나하나 remove 하는 방법도 있지만 좀 더 간단히 하기 위해서 새로운 배열을 할당했다.
  - 이 방식은 Memory leak 문제가 있을 수 있겠다.
