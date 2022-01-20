# Class field

- 클래스 필드는 클래스 기반 객체지향 언어에서 **클래스가 생성할 인스턴스의 프로퍼티**를 가리키는 용어이다.
- 이 문법을 사용하면 어떤 종류의 프로퍼티라도 클래스에 추가할 수 있다.
- 클래스 필드엔 복잡한 표현식이나 함수 호출 결과를 사용할 수 있다.

```js
class User {
  // 프로퍼티 이름 = 값
  name = 'Millie';

  sayHi() {
    console.log(`Hi, ${this.name}~`);
  }
}

new User().sayHi(); // Hi, Millie~
```

- `User.prototype`이 아닌 **개별 객체에만 클래스 필드가 설정된다**.

```js
class User {
  name = 'Millie';
}

const user = new User();
console.log(user); // User { name : 'Millie' }
console.log(user.name); // Millie
console.log(User.prototype.name); // undefined
```

- 함수는 일급 객체이므로 함수를 클래스 필드에 할당할 수 있다.
  - 따라서 클래스 필드를 통해 메서드를 정의할 수도 있다.
- 이처럼 클래스 필드에 함수를 할당하는 경우, 이 함수는 프로토타입 메서드가 아닌 인스턴스 메서드가 된다.
  - 모든 클래스 필드는 인스턴스 프로퍼티가 되기 때문
  - 따라서 클래스 필드에 함수를 할당하는 것은 권장되지 않는다.

```js
class User {
  name = 'Millie';
  getName = () => this.name; // 클래스 필드에 화살표 함수를 할당
}

const user = new User();
console.log(user); // User { name: 'Millie', getName: f}
```

---

### Reference

- https://ko.javascript.info/class
- Modern JavaScript Deep Dive
