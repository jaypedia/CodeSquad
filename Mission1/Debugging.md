# Debugging

## What is a “software bug”?

software bug, 혹은 줄여서 bug는 소프트웨어가 예상치 못한 잘못된 결과를 내는 것을 말한다. 버그는 프로그램의 소스 코드에서의 잘못된 부분이나 설계 과정에서의 오류 때문에 발생한다.

버그는 사소한 것부터 심각한 것까지 다양한 수준으로 발생할 수 있다. 어떤 소프트웨어 버그는 재난과 같을 수 있다. 1996년 European Space Agency의 10억 달러 프로토타입 Ariane 5 로켓은 on-board guidance 컴퓨터 프로그램의 버그로 인해 발사 후 1분도 되지 않아 파괴되었다.

2002년 미국 상무부(US Department of Commerce)의 국립표준 기술연구소(National Institute of Standards and Technology)가 의뢰한 연구에 따르면 “소프트웨어 버그나 오류는 매우 만연하고 해로워서, 미국 경제에 연간 약 590억 달러 또는 국내 총생산의 약 0.6%의 비용이 발생한다”라고 한다. 소프트웨어 버그는 사람들에게 직접적인 불편함을 겪게 할뿐만 아니라, 매우 큰 경제적 손실도 유발할 수 있다는 것을 알 수 있다.

### History of software bug

1945년 9월 9일, 하버드 대학교 Mark II 컴퓨터의 회로에 나방이 들어가 합선을 일으켰다. 이것을 Grace Hopper가 발견하였고, 인류 역사상 최초의 버그로 명명되었다.
<br>

## What is “Debugging”?

> Summary: 가정(assumption)과 현실(reality) 사이의 간격을 좁혀나가는 과정

디버깅이란 **버그를 찾아내서 수정하는 과정**을 말한다. 분명 이 코드는 기능을 잘 수행할 것이라는 생각으로 코딩했지만, 결과물은 그렇지 않을 때가 있다. 그럴 때 바로 디버깅을 도와주는 디버거를 활용하여 버그를 잡아내야 한다. 그러면 비로소 원하는 결과를 얻을 수 있을 것이다.

‘개발에서 20%는 코딩, 80%는 디버깅이다’, ‘프로그래머의 삶은 디버깅의 연속이다’라는 말이 있을 정도로, 개발자들은 코딩보다 디버깅에 몇 배나 많은 시간을 쏟는다. 디버깅은 개발 과정의 많은 부분을 차지하고 있기 때문에 매우 중요한 작업이다. 그래서 개발 도구에는 거의 필수로 디버깅 기능이 들어간다.

실무에서는 디버그라는 의미를 확장하여 사용하기도 한다. 꼭 에러가 발생했을 때 외에도 개발자가 코드를 작성하는 내내 프로그램을 돌려보는 것도 디버깅한다고 한다. 디버깅은 코드를 작성하는 순간부터 출시해도 되겠다는 확신이 드는 마지막 순간까지 수없이 반복된다. 규모가 큰 소프트웨어일수록 디버깅에 걸리는 시간은 더 늘어난다.
<br>

## Debugging in VS Code

- VS Code는 뛰어난 디버깅 기능을 지원한다. 내장된 디버거를 사용하여 디버깅을 원활하게 진행할 수 있다.
- 기본적으로는 Node.js 런타임에 대한 디버깅 기능이 내장되어 있고, JavaScript, TypeScript, 혹은 JavaScript로 트랜스파일이 가능한 다른 언어를 디버깅할 수 있다. 이외 다른 언어를 디버깅하고 싶다면 Debugger Extension을 설치하면 된다.

![image](https://user-images.githubusercontent.com/85419343/216543242-f26ef018-07f0-4cb1-b42f-10c5a814aeca.png)

- VS Code에서는 디버깅할 때 다음 4가지를 활용하여 진행한다.
  1. Start debugging: 클릭하면 디버깅이 시작된다.
  2. Pause, step over, step in/out, restart, stop
  3. Debug side bar: 디버깅 진행 상황을 세부적으로 보고 조작할 수 있다. Variables, Watch, Call stack, Loaded scripts, Breakpoints를 포함한다.
  4. Debug console panel: 실행 결과를 볼 수 있다.

### Breakpoints

> A flag that tells the debugger “stop right here.”

- 프로그램은 일반적으로 인간보다 훨씬 빠르게 연산을 수행한다. 그래서 프로그램을 실행시켜 보는 것만으로는 무엇이 잘못되었는지 찾아내기 어렵다.
- 디버거는 프로그램을 특정 행에서 멈출 수 있게 해 주기 때문에 버그를 찾을 때 도움이 된다. 프로그래머는 멈춰진 그 지점에서 무슨 일이 일어나는지 볼 수 있다. **프로그램이 멈추는 특정 지점**을 Break point라고 한다. Break point를 설정하여 의심이 가는 코드 라인을 선택하고, 해당 코드 라인에서 멈춰서 조작해 보며 버그를 잡아내는 식으로 디버깅을 진행하게 된다.

![image](https://user-images.githubusercontent.com/85419343/216543280-947ab92a-691d-41ce-b2b3-b156f71064a6.png)

- VS Code에서는 원하는 코드의 행을 클릭하면 빨간 점이 생기는데, 디버거를 실행하면 이 지점에서 멈추게 된다. 해당 코드를 실행하지 않고 라인의 배경 색이 노란색으로 바뀌며 노란색 화살표가 생긴다. 이것은 **프로그램이 재개되면 실행할 다음 명령**이라는 것을 나타낸다.
- VS Code에서는 사이드바에서 체크박스를 클릭하여 활성화/비활성화를 할 수 있는 기능이 있다.

![image](https://user-images.githubusercontent.com/85419343/216543386-63a1dbba-7001-4e35-8a6b-7d1b967162c9.png)

- Break point에 마우스 우클릭을 하면 추가 기능을 이용할 수 있다. `Edit Breakpoint` 기능을 사용하면 특정한 조건에 맞을 때만 Breakpoint가 활성화되도록 설정할 수도 있다. Expression, Hit Count, Log Message 등 필요한 경우에 맞는 방식으로 활용이 가능하다.

### Actions: Continue / Step Over / Step Into / Step Out / Restart / Stop

![image](https://user-images.githubusercontent.com/85419343/216543410-8d8fb067-88db-4148-ace3-595be316dd0d.png)

> 디버깅을 시작하면 상단에 작은 toolbar가 보인다. 이러한 기능들을 사용하면 프로그램이 내리는 결정들을 단계별로 차근차근 따라갈 수 있다.

- `Continue`: breakpoint를 만나기 전까지는 계속 프로그램을 실행한다.
- `Step Over`: 디버거는 **현재의 실행 컨텍스트(scope) 내**에서 코드를 한 줄씩 실행한다.
- `Step Into`: 실행할 코드가 함수 호출인 경우, 해당 함수의 내부로 들어가 내부 코드를 실행한다. Call Stack 탭에서 새로운 실행 컨텍스트가 쌓이게 된다. 함수 호출이 아니라면 Step Over 작업과 동일하다.
- `Step Out`: 현재의 함수 바깥으로 빠져나오고 싶을 때 사용한다. 디버거가 중첩된 scope 안에 있다면, 함수가 모두 리턴될 때까지 작업이 진행된다. 즉 현재의 실행 컨텍스트가 종료될 때까지 진행된다. 디버거가 global scope에 있다면 프로그램을 끝까지 실행한다.

### Watch

- 특정 변수의 값을 추적하고 싶다면, 해당 변수명을 추가하면 된다.
- 변수명뿐만 아니라 식을 넣어볼 수도 있다.
  - 예를 들어, `result === 3`이라고 입력하면 true/false로 결괏값이 나온다.

### Call Stack

- 함수가 어떤 순서로 실행되는지 확인할 수 있다.

### Loaded Scripts

- 로딩이 된 스크립트의 목록을 확인해 볼 수 있다.

---

### Reference

- [Wikipedia - software bug](https://en.wikipedia.org/wiki/Software_bug)
- [Debugging in Visual Studio Code](https://code.visualstudio.com/docs/editor/debugging)
- [혼자 공부하는 얄팍한 코딩 지식](http://www.yes24.com/Product/Goods/109323347)
- [코딩의 시작과 끝, 디버깅 (드림코딩)](https://www.youtube.com/watch?v=IwC-BVM2_YQ)
- [Continue, Step Over, Step Into and Step Out actions in Visual Studio Code debugger explained](https://pawelgrzybek.com/continue-step-over-step-into-and-step-out-actions-in-visual-studio-code-debugger-explained/)
- [Basic Debugging in Visual Studio Code](https://medium.com/young-coder/basic-debugging-in-visual-studio-code-b9a5d193fe7b)
- [1.74ver Debugging updates](https://code.visualstudio.com/updates/v1_74#_debugging)
