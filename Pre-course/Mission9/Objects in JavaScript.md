# Objects in JavaScript

> 자바스크립트에는 다양한 종류의 객체가 존재한다. 각 객체를 잘 분류해보고, 특징을 알아보자.

## 1. Standard built-in objects

- 표준 빌트인 객체는 **ECMAScript 사양에 정의된 객체**이다.
  - Object, String, Number, Boolean, Symbol, Date, Math, RegExp, Array, Map/Set, WeakMap/WeakSet, Function, Promise, Reflect, Proxy, JSON, Error 등 40여 개의 표준 빌트인 객체가 있다.
    - Math, Reflect, JSON을 제외하고 모두 인스턴스를 생성할 수 있는 *생성자 함수 객체*다.
      - 생성자 함수 객체는 프로토타입 메서드와 정적 메서드를 제공하고, 그렇지 않은 표준 빌트인 객체는 정적 메서드만 제공한다.
- 애플리케이션 전역의 공통 기능을 제공한다.
- 자바스크립트 실행 환경(Browser, Node.js 환경)과 관계없이 언제나 사용할 수 있다.
- 전역 객체의 프로퍼티로서 제공되므로 별도 선언 없이 전역 변수처럼 언제나 참조 가능하다.

## 2. Host objects

- 호스트 객체는 ECMAScript 사양에 정의되어 있지는 않지만, **자바스크립트 실행 환경에서 추가로 제공하는 객체**이다.
- 브라우저 환경에서는 DOM, BOM, Canvas, XMLHttpRequest, fetch, requestAnimationFrame, SVG, Web Storage, Web Component, Web Worker와 같은 클라이언트 사이드 Web API를 호스트 객체로 제공한다.
- Node.js 환경에서는 Node.js 고유의 API를 호스트 객체로 제공한다.

## 3. User-defined objects

- 사용자 정의 객체는 표준 빌트인 객체와 호스트 객체처럼 기본적으로 제공되는 객체가 아닌, **사용자가 직접 정의한 객체**이다.

## 4. Global object

- 전역 객체는 코드가 실행되기 전, **자바스크립트 엔진이 어떤 객체보다도 가장 먼저 생성하는 특수한 객체**이다. 또한 계층적 구조상 어떤 객체에도 속하지 않은 **모든 빌트인 객체의 최상위 객체**다.

### 전역 객체를 지칭하는 이름

- 브라우저 환경에서는 `window`, `self`, `this`, `frames`가 전역 객체를 가리킨다.
  <img width="968" alt="image" src="https://user-images.githubusercontent.com/85419343/218060864-a26df69a-a01b-40dd-939d-865a084a37e0.png">
- Node.js 환경에서는 `global`이 전역 객체를 가리킨다.
- ECMAScript2020(ES11)에는 `globalThis`가 도입되어 브라우저 환경과 Node.js 환경에서 전역 객체를 가리키던 다양한 식별자를 통일했다. `globalThis`는 표준 사양이므로 ECMAScript 표준 사양을 준수하는 모든 환경에서 사용할 수 있다.

### 전역 객체의 특징

- 전역 객체는 *표준 빌트인 객체, 호스트 객체, var 키워드로 선언한 전역 변수와 전역 함수*를 프로퍼티로 가진다.
  - 즉, 전역 객체는 계층적 구조상 어떤 객체에도 속하지 않은 모든 빌트인 객체의 최상위 객체다.
  - 여기서 전역 객체가 최상위 객체라는 것은 프로토타입 상속 관계상에서 최상위 객체라는 의미가 아니다. 전역 객체 자신은 어떤 객체의 프로퍼티도 아니며, 객체의 계층적 구조상 표준 빌트인 객체와 호스트 객체를 프로퍼티로 소유한다는 의미이다.
- 전역 객체는 개발자가 의도적으로 생성할 수 없다. 전역 객체를 생성할 수 있는 생성자 함수는 제공되지 않는다.
- 전역 객체의 프로퍼티를 참조할 때 window(또는 global)를 생략할 수 있다.
- 전역 객체는 Object, String, Number, Boolean, Function, Array, RegExp, Date, Math, Promise 같은 모든 표준 빌트인 객체를 프로퍼티로 가지고 있다.
- 전역 객체는 자바스크립트 실행 환경에 따라 추가적으로 프로퍼티와 메서드를 갖는다.
  - 브라우저 환경에서는 DOM, BOM, Canvas, XMLHttpRequest, fetch, requestAnimationFrame, SVG, Web Storage, Web Component, Web Worker 같은 클라이언트 사이드 Web API를 호스트 객체로 제공한다.
  - Node.js 환경에서는 Node.js 고유의 API를 호스트 객체로 제공한다.
- var 키워드로 선언한 전역 변수, 선언하지 않은 변수에 값을 할당한 _암묵적 전역_, 전역 함수는 전역 객체의 프로퍼티가 된다.
  > **암묵적 전역(Implicit global)** : 선언하지 않은 변수에 값을 할당했을 때, 참조 에러가 발생하지 않고 마치 선언된 전역 변수처럼 동작한다. 하지만 전역 변수가 되는 것은 아니고, 전역 객체의 프로퍼티가 된다.
  > 자바스크립트 엔진은 선언하지 않은 변수에 값을 할당하기 위해 먼저 scope chain을 통해 선언된 변수인지 확인한다. 이때 어떤 scope에서도 선언하지 않은 변수의 선언을 찾을 수 없다. 따라서 참조 에러가 발생하게 된다. 하지만 자바스크립트 엔진은 전역 객체에 프로퍼티를 동적으로 생성한다. 결국 선언하지 않은 변수는 전역 객체의 프로퍼티가 되어 마치 전역 변수처럼 동작한다. 이것을 암묵적 전역이라고 한다. 이것은 변수가 아니므로 변수 호이스팅이 발생하지 않는다. 또한 전역 변수는 프로퍼티이지만 `delete` 연산자로 삭제할 수 없는 반면, 선언하지 않은 변수는 프로퍼티이므로 `delete` 연산자로 삭제가 가능하다.

```js
// var 키워드로 선언한 전역 변수
var foo = 1;
console.log(window.foo); // 1

// 선언하지 않은 변수에 값을 할당한 암묵적 전역
bar = 2; // window.bar = 2 와 같다. bar는 전역 변수가 아닌, 전역 객체 window의 프로퍼티이다.
console.log(window.bar); // 2

// 전역 함수
function baz() {
  return 3;
}
console.log(window.baz()); // 3
```

- let, const 키워드로 선언한 전역 변수는 전역 객체의 프로퍼티가 되지 않는다. 따라서 `window.foo`와 같이 접근할 수 없다. 이러한 변수들은 _보이지 않는 개념적인 블록(전역 렉시컬 환경의 선언적 환경 레코드)_ 내에 존재한다. 이를 더 잘 이해하려면 실행 컨텍스트 개념을 알아야 한다.
- 브라우저 환경의 모든 자바스크립트 코드는 하나의 전역 객체 `window`를 공유한다.
  - 여러 개의 `script` 태그를 사용하여 자바스크립트 코드를 분리하더라도, 하나의 전역 객체를 공유한다.

---

### Reference

- Modern JavaScript Deep Dive - 21. 빌트인 객체
