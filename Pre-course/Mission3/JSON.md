# JSON (JavaScript Object Notation)

## Table of Contents

- [A lightweight data-interchange format](#a-lightweight-data-interchange-format)
  - [Syntax](#syntax)
- [JSON methods](#json-methods)
  - [`JSON.stringify()`](#-jsonstringify---)
    - [Syntax](#syntax-1)
    - [Examples](#examples)
  - [`JSON.parse()`](#-jsonparse---)
    - [Syntax](#syntax-2)
    - [Using reviver](#using-reviver)
  - [Reference](#reference)

## A lightweight data-interchange format

- JSON은 데이터 교환을 목적으로 만들어졌다. **클라이언트와 서버가 HTTP 통신을 할 때 사용되는 텍스트 데이터 포맷**이다.
- JSON은 JavaScript에서 사용할 목적으로 만들어진 포맷이다. 그러나 JavaScript에 종속되지 않는 **언어 독립적인 데이터 포맷 (language-independent data format**)이 되었고, 대부분의 프로그래밍 언어에서 사용할 수 있다. JSON 형식의 데이터를 파싱하고 생성하는 코드가 포함되어 있기 때문이다. 이는 JSON이 데이터 교환 언어로서 이상적인 이유 중 하나이다.
- 사람이 읽고 쓰기가 쉬울 뿐만 아니라, 컴퓨터가 파싱하고 생성하기에도 쉽다.

### Syntax

- JSON의 key는 반드시 작은따옴표가 아닌 큰따옴표로 묶어야 한다.
- value는 객체 리터럴과 같은 표기법을 그대로 사용할 수 있다.
  - 다만 문자열일 경우 작은따옴표가 아닌 큰따옴표로 묶어야 한다.
- 주석을 지원하지 않는다. 만약 JSON에 주석을 추가하면 유효하지 않게 된다.
- JSON 포맷이 엄격한 규칙을 가지고 있는 이유는 쉽고 안정적이며 빠른 parsing algorithm을 구현하기 위해서이다.

<br>

## JSON methods

### `JSON.stringify()`

> 객체 → JSON 포맷의 문자열 [Serialize]

- 객체, 배열을 JSON 포맷의 문자열로 변환한다.
- 클라이언트가 서버로 객체를 전송하려면 객체를 문자열화해야 하는데, 이를 직렬화(serializing)라 한다.

#### Syntax

```js
JSON.stringify(value[, replacer, space])
```

- value: 인코딩 하려는 값
- replacer: JSON으로 인코딩하기를 원하는 프로퍼티가 담긴 배열, 혹은 매핑 함수 `function (key, value)`
  - 순환 참조를 다뤄야 하는 경우같이 전환 프로세스를 정교하게 조정하기 위해 사용한다.
- space: Amount of space to use for formatting
  - 가독성을 높이기 위해 사용한다. 예를 들어 space를 2로 설정하면, 중첩 객체를 별도의 줄에 출력하고 space를 2개 사용하여 들여쓰기한다.

#### Examples

```js
let student = {
  name: 'John',
  age: 30,
  isAdmin: false,
  courses: ['html', 'css', 'js'],
  spouse: null,
};

let json = JSON.stringify(student);

alert(typeof json); // we've got a string!

alert(json);
/* JSON-encoded object:
{
  "name": "John",
  "age": 30,
  "isAdmin": false,
  "courses": ["html", "css", "js"],
  "spouse": null
}
*/
```

- 변경된 문자열은 JSON-encoded, serialized, stringified, marshalled(정렬된, 결집된) 객체라고 부른다. 객체는 이렇게 문자열로 변환된 후에야 비로소 네트워크를 통해 전송할 수 있다.
- JSON은 언어에 종속되지 않는 포맷이기 때문에 JavaScript 특유의 객체 프로퍼티는 `JSON.stringify`가 처리할 수 없다. 함수 프로퍼티(메서드), key가 Symbol인 프로퍼티, 값이 `undefined`인 프로퍼티는 무시된다.

```js
let user = {
  sayHi() {
    // ignored
    alert('Hello');
  },
  [Symbol('id')]: 123, // ignored
  something: undefined, // ignored
};

alert(JSON.stringify(user)); // {} (empty object)
```

- 중첩된 객체도 문자열로 바꿔준다.

```js
let meetup = {
  title: 'Conference',
  room: {
    number: 23,
    participants: ['john', 'ann'],
  },
};

alert(JSON.stringify(meetup));
/* The whole structure is stringified:
{
  "title":"Conference",
  "room":{"number":23,"participants":["john","ann"]},
}
*/
```

- 사용 시 주의할 점은 순환 참조가 있다면 에러가 난다는 점이다.

```js
let room = {
  number: 23,
};

let meetup = {
  title: 'Conference',
  participants: ['john', 'ann'],
};

meetup.place = room; // meetup references room
room.occupiedBy = meetup; // room references meetup

JSON.stringify(meetup); // Error: Converting circular structure to JSON
```

<br>

### `JSON.parse()`

> JSON 포맷의 문자열 → 객체 [Deserialize]

- JSON으로 인코딩된 객체(문자열)을 객체로 디코딩한다.
- 서버로부터 클라이언트에게 전송된 JSON 데이터는 문자열이다. 이 문자열을 객체로 사용하려면 JSON 포맷의 문자열을 객체화해야 하는데, 이것을 역직렬화(deserializing)라 한다.

#### Syntax

```js
JSON.parse(str, [reviver]);
```

- str: JSON 형식의 문자열
- reviver: 모든 `(key, value)` 쌍을 대상으로 호출되는 `function(key, value`) 형태의 함수. 값을 변경시킬 수 있다.

#### Using reviver

- 서버로부터 문자열로 변환된 객체를 전송받았다. 이 문자열을 역직렬화하여 자바스크립트 객체를 만든다.

```js
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

let meetup = JSON.parse(str);

alert(meetup.date.getDate()); // Error!
```

- `meetup.date`의 값은 `Date` 객체가 아닌 문자열이기 때문에 에러가 발생한다.
- 문자열을 `Date` 객체로 전환해야 한다는 것을 알리기 위해 `JSON.parse`의 두 번째 인수인 `reviver`를 사용할 수 있다.
- 이 방법은 중첩된 객체에서도 사용할 수 있다.

```js
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

let meetup = JSON.parse(str, function (key, value) {
  if (key == 'date') return new Date(value);
  return value;
});

alert(meetup.date.getDate()); // now works!
```

---

### Reference

- https://en.wikipedia.org/wiki/JSON
- https://www.json.org/json-en.html
- https://ko.javascript.info/json
- Modern JavaScript Deep Dive - 43.2 JSON
