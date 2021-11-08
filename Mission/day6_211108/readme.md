# Hashmap

## Hash function

- 해시 함수는 문자열을 받아서 숫자를 반환하는 함수이다. 즉 문자열에 대해 숫자를 할당(mapping)한다.
- 해시 함수는 같은 이름에 대해서는 항상 같은 인덱스를 할당한다.
- 해시 함수는 배열이 얼마나 큰지 알고 있어야 하며, 유효한 인덱스만 반환해야 한다.
- 해시 함수와 배열을 합치면 Hash table이라는 자료구조를 얻을 수 있다.
- 배열과 리스트는 직접 메모리를 할당하지만, 해시 테이블은 해시 함수를 사용해서 더 총명하게 어디에 원소를 저장할지 결정한다.

## Examples of using Hash tables

- 조회하기 : 어떤 것을 다른 것과 연관시키고자 할 때, 무언가를 찾아보고자 할 때

  - 예 1 : 전화번호부에서 사람의 이름과 번호를 추가, 사람 이름을 입력하면 그 이름과 관련된 전화번호를 알려 줌
  - DNS resolution(확인) 작업 : 웹 주소에 대해 IP 주소를 할당하는 작업

- 중복된 항목 방지
- 캐싱

## Collision

- 해시 테이블의 성능을 이해하기 위해서는 충돌에 대해 알아야 한다.
- 두 개 이상의 키가 같은 공간에 할당될 때 그것을 충돌이라고 한다.
- 충돌을 해결하는 가장 간단한 방법은 같은 공간에 여러 개의 키를 연결 리스트로 만들어 넣는 것이다.
- 연결 리스트가 길어지면 해시 테이블의 속도도 느려진다.

## Performance

- 평균적인 경우, 해시 테이블은 탐색, 삽입, 삭제하는 데 모두 O(1)의 시간이 걸린다.
  - O(1)은 constant time(상수 시간)이라고 한다. 해시 테이블의 크기에 상관없이 항상 같은 시간이 걸린다는 뜻이다.
- 충돌을 피하려면 낮은 사용률, 좋은 해시 함수가 필요하다.

### 사용률(load factor)

### 좋은 해시 함수

## Learning Checkpoint

- Understand Hash data structures
- Know a few ways to avoid collisions in hash algorithm
- Create an object using the prototype property
