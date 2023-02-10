# Timer

## Scheduling a call

- 타이머 함수를 사용하여 호출을 스케줄링 할 수 있다. 일반적으로 함수를 호출하면 함수가 즉시 실행되지만, **함수를 명시적으로 호출하지 않고 일정 시간이 경과된 후 호출되도록 함수 호출을 예약할 수 있는 것**이다.

| 타이머를 생성하는 타이머 함수 | 타이머를 제거하는 타이머 함수 |
| ----------------------------- | ----------------------------- |
| `setTimeout`                  | `clearTimeout`                |
| `setInterval`                 | `clearInterval`               |

- JavaScript는 위의 네 가지 타이머 함수를 제공한다.
- 타이머 함수는 ECMAScript 사양에 정의된 built-in 함수가 아니다. 하지만 브라우저 환경과 Node.js 환경에서 모두 **전역 객체의 메서드**로서 타이머 함수를 제공한다. 즉, 타이머 함수는 [호스트 객체](https://github.com/jaypedia/codesquad-precourse/blob/main/Mission9/Objects%20in%20JavaScript.md#2-host-objects)다.
- setTimeout, setInterval은 일정 시간이 지난 후 콜백 함수가 호출되도록 타이머를 생성하는 함수이다.
  - 생성된 타이머가 만료되면 콜백 함수가 호출된다.
- 자바스크립트 엔진은 단 하나의 실행 컨텍스트 스택을 가지고 있으며, single thread로 동작한다. 따라서 동시에 두 가지 이상의 태스크를 실행할 수 없다.
  - 이러한 이유로 setTimeout, setInterval은 asynchronous 처리 방식으로 동작한다.

## Timer functions

### `setTimeout` / `clearTimeout`

- timeout의 의미는 다양하지만, 미리 정해둔 시간이 지나면 어떤 이벤트가 발생되도록 하는 것을 말한다. 타임아웃은 적절한 신호에 의해 중단시킬 수 있다. - [위키백과 타임아웃](<https://ko.wikipedia.org/wiki/%ED%83%80%EC%9E%84%EC%95%84%EC%9B%83_(%EC%BB%B4%ED%93%A8%ED%8C%85)>)

- setTimeout 함수는 두 번째 인수로 전달받은 시간(ms)으로 단 한 번만 동작하는 타이머를 생성한다.
  - 타이머가 만료되면 첫 번째 인수로 전달받은 콜백 함수가 호출된다.
  - 콜백 함수가 전달받은 시간 이후 단 한 번만 실행되도록 호출 스케줄링되는 것이다.
- 두 번째 인수 `delay`의 경우, 생략하면 기본값 0이 지정된다. 4ms 이하로 전달할 경우, 최소 지연 시간 4ms가 지정된다.
  > `delay` 시간이 설정된 타이머가 만료되었을 때, 콜백 함수가 즉시 호출되는 것이 보장되지는 않는다.
  > 이것은 **task queue에 콜백 함수를 등록하는 시간을 지연할 뿐**이기 때문이다. 이와 관련해서는 브라우저 환경에서의 task queue, event loop를 알아야 한다.
- Return value로 **timeoutID**를 반환한다. 이것으로 생성된 타이머를 식별할 수 있다.
  - 브라우저 환경일 경우 양의 정수 값이며, Node.js 환경일 경우 객체이다.
  - 이 id를 `clearTimeout` 함수의 인수로 전달하여 타이머를 취소할 수 있다. `clearTimeout`은 호출 스케줄링을 취소한다.

### `setInterval`

- setInterval 함수는 두 번째 인자로 전달받은 시간(ms)으로 반복 동작하는 타이머를 생성한다.
  - 타이머가 만료될 때마다 첫 번째 인수로 전달받은 콜백 함수가 반복 호출된다. 이것은 타이머가 취소될 때까지 계속된다.
  - 콜백 함수가 전달받은 시간이 경과할 때마다 반복 실행되도록 호출 스케줄링되는 것이다.
- setInterval 함수에 전달할 인수, 반환 값 및 `clearInterval` 함수의 동작은 setTimeout과 동일하다.

---

### Reference

- JavaScript Deep Dive - 41. Timer
