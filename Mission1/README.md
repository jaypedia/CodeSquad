# Mission 1. Area of Shapes

> 2021.11.1

## Description

### 1. Implement a function that calculates the area of shapes

- 도형의 넓이를 계산하는 함수 구현

#### Result

- 함수가 한 가지의 역할만 맡을 수 있도록 도형의 넓이를 계산하는 함수를 개별적으로 구현하였습니다.
- 함수의 이름은 일관적으로 `get[도형 이름]Area`로 지었습니다.
- 도형별로 받아야 하는 인자의 개수가 다르기 때문에 [Rest parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters) 문법을 활용하였습니다.

```js
const getArea = (shapeName, ...params) => {
  switch (shapeName) {
    case SHAPE.circle:
      if (params.length === 1) {
        return getCircleArea(...params);
      }
      if (params.length === 2) {
        return getTotalCircleArea(...params);
      }
    case SHAPE.rectangle:
      return getRectangleArea(...params);
    case SHAPE.trapezoid:
      return getTrapezoidArea(...params);
    default:
      console.log('Invalid parameters');
  }
};
```

```js
getArea('circle', 10); // 314.1592653589793
getArea('circle', 1, 5); // 172.7875959474386
getArea('rectangle', 10, 5); // 50
getArea('trapezoid', 5, 8, 3); // 19.5
```

</br>

### 2. Implement `printExecutionSequence`

- 지금까지 호출된 함수의 도형 이름과 넓이 값을 로깅하고, 로깅(logging)한 값을 순서대로 출력하는 함수 구현

#### Result

- 프로그래밍에서 logging이란, 프로그램의 수행 과정이나 결과를 기록하는 것을 말합니다.
- 로그를 저장하기 위해서 배열을 활용했습니다.
- `logFunction`을 구현하여 넓이를 계산하는 함수를 호출 시, 이 함수도 호출하여 도형의 이름 및 넓이를 배열에 기록했습니다.
- 출력 함수를 호출 시 `log` 배열에 있는 내용을 `reduce` 메서드를 활용하여 프린트하도록 구현했습니다.

```js
const logs = [];

const logFunction = (shapeName, area) => {
  logs.push(`${shapeName} = ${area}`);
};

const printExecutionSequence = () => {
  const executionSequence = logs.reduce((acc, cur, i) => {
    acc += `[${i + 1}] ${cur}  `;
    return acc;
  }, '');
  console.log(executionSequence);
};

const getCircleArea = (radius) => {
  const area = radius ** 2 * Math.PI;
  logFunction(SHAPE.circle, area); // getCircleArea 함수 호출 시 도형 이름 및 넓이 로깅
  return area;
};
```

```js
getArea('circle', 10);
getArea('circle', 1, 5);
getArea('rectangle', 10, 5);
getArea('trapezoid', 5, 8, 3);

printExecutionSequence();
// [1] circle = 314.1592653589793  [2] circle = 172.7875959474386  [3] rectangle = 50  [4] trapezoid = 19.5
```

</br>

### 3. Handling user input

- 사용자의 입력을 받아 처리할 수 있도록 구현

#### Result

- Node.js의 `readline`을 활용하여 사용자의 입력에 따라 결과를 출력하도록 구현했습니다.
- 유효한 도형의 이름을 입력했는지 확인하는 함수를 구현하여 유효하지 않은 도형 이름 입력 시 경고문을 출력하도록 하였습니다.

```
// 입력 형식
> circle 2, rectangle 10 5
```

![image](https://user-images.githubusercontent.com/85419343/215369602-20ab2656-ea0f-4346-8b00-c94f5568c88e.png)

</br>

### 4. Document Debugging

- [정리한 문서 바로가기](https://github.com/jaypedia/codesquad-precourse/blob/main/Mission1/Debugging.md)
- 소프트웨어에서 버그의 의미와 유래, VS Code에서 디버깅하는 방법을 정리하였습니다.
  </br>

---

## Learning Checkpoint

- [x] Node.js를 활용하여 JavaScript 개발을 할 수 있다.
- [x] 함수의 역할은 한 가지에 집중하고 있다.
- [x] 일관된 변수명과 함수 이름을 짓고 있다.
- [x] 함수는 늘 동일한 입력값에 동일한 출력을 보장한다.
- [x] 개발 과정에서 breakpoint나 'debugger;' 키워드를 사용해서 디버깅을 했다.
