# Smart Drop Down Menu

## For Asynchronous programming practice

##### Try 👉 https://jaypedia.github.io/cocoa//Mission/day18_211124/index.html

## Requirements

- 리스트 영역에 마우스를 1초 이상 머무는 경우, 레이어가 노출된다.
- 과일 리스트 안에서 마우스를 이동할 때마다 해당 과일의 횟수를 기록한다.
- mouseevent 이벤트가 발생할 때마다 기록하는 게 아닌, 500ms마다 한 번씩만 기록한다.
- 기록정보는 마우스가 움직일 때마다 계속 업데이트된다.
- setTimeout의 동작 흐름을 이해하고 사용한다.

## Concepts

- Throttling : 마지막 함수가 호출된 후, 일정 시간이 지나기 전에 다시 호출되지 않도록 하는 것
- Debouncing : 연이어 호출되는 함수들 중, 마지막 함수 혹은 가장 첫 함수만 호출
