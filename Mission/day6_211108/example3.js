// 문자열 키와 문자열 값을 저장하는 해시맵 라이브러리를 구현한다.(객체는 JavaScript prototype 속성을 활용한다.)
function mapFunction() {
  this.myMap = new Object();
  // put(String key, String value) 키-값을 추가한다.
  mapFunction.prototype.put = function (key, value) {
    this.myMap[key] = value;
  };
  // remove(String key) 해당 키에 있는 값을 삭제한다.
  mapFunction.prototype.remove = function (key) {
    delete this.myMap[key];
  };
  // containsKey(String) 해당 키가 존재하는지 판단해서 Bool 결과를 리턴한다.
  mapFunction.prototype.containsKey = function (key) {
    // return key in this.myMap;
    return Reflect.has(this.myMap, key);
  };
  // containsValue(String) 해당 값이 존재하는지 판단해서 Bool 결과를 리턴한다.
  mapFunction.prototype.containsValue = function (value) {
    for (const key in this.myMap) {
      if (this.myMap[key] === value) return true;
    }
    return false;
  };
  // get(String) 해당 키와 매치되는 값을 찾아서 리턴한다.
  mapFunction.prototype.get = function (key) {
    return this.myMap[key];
  };
  // isEmpty() 비어있는 맵인지 Bool 결과를 리턴한다.
  mapFunction.prototype.isEmpty = function () {
    let count = 0;
    for (const key in this.myMap) {
      count++;
    }
    return count === 0;
  };
  // keys() 전체 키 목록을 [String] 배열로 리턴한다.
  mapFunction.prototype.keys = function () {
    const keys = new Array();
    for (const key in this.myMap) {
      keys.push(key);
    }
    return keys;
  };

  //replace(String key, String value) 키-값으로 기존 값을 대체한다.
  mapFunction.prototype.replace = function (key, value) {
    this.myMap[key] = value;
  };
  // values() 전체 값 목록을 [String] 배열로 리턴한다.
  mapFunction.prototype.values = function () {
    const values = [];
    for (const key in this.myMap) {
      values.push(this.myMap[key]);
    }
    return values;
  };
  // size() 전체 아이템 개수를 리턴한다.
  mapFunction.prototype.size = function () {
    let count = 0;
    for (const key in this.myMap) {
      count++;
    }
    return count;
  };
  // clear() 전체 맵을 초기화한다.
  mapFunction.prototype.clear = function () {
    for (const key in this.myMap) {
      delete this.myMap[key];
    }
  };
}

//테스트
const capitalMap = new mapFunction();
capitalMap.put('대한민국', '서울');
capitalMap.put('일본', '오사카');
capitalMap.put('중국', '베이징');
capitalMap.put('베트남', '하노이');
capitalMap.put('영국', '런던');

console.log('keys() : ', capitalMap.keys());
console.log('values() : ', capitalMap.values());

console.log('containsKey("중국") : ', capitalMap.containsKey('중국'));

console.log('@실행@ remove("중국")');
capitalMap.remove('중국');
console.log('keys() : ', capitalMap.keys());
console.log('values() : ', capitalMap.values());
console.log('containsKey("중국") : ', capitalMap.containsKey('중국'));

console.log('isEmpty() : ', capitalMap.isEmpty());

console.log('@실행@ replace("일본", "도쿄")');
capitalMap.replace('일본', '도쿄');

console.log('get("일본") : ', capitalMap.get('일본'));
console.log('size() : ', capitalMap.size());

console.log('@실행@ clear() ');
capitalMap.clear();

console.log('keys() : ', capitalMap.keys());
console.log('isEmpty() : ', capitalMap.isEmpty());
