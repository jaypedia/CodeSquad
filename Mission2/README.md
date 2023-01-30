# Mission 2. Number System

> 2021.11.3

## Description

- 진법을 변환하는 함수를 구현해보며 프로그래밍에서의 숫자 체계(number system)을 배웁니다.

</br>

## Requirements

- 사람들이 돌아가면서 숫자를 하나씩 말하는 게임인 `N진수 돌아가며 말하기 게임`을 구현합니다.
- 최대 숫자 개수 전까지의 숫자 개수까지 말할 수 있습니다.
  - 예를 들어 2진법이고 4자리의 숫자가 최대라면, `1000` 전까지인 `111`까지 말할 수 있게 됩니다.
- 특정 사람의 순서가 주어지면, 해당 순서일 때 말해야 하는 숫자를 모두 출력합니다.

</br>

## Result

### parameters

- 전달해야 하는 인자가 4개로 많기 때문에 [Clean Code의 원칙](https://github.com/ryanmcdermott/clean-code-javascript#function-arguments-2-or-fewer-ideally)을 따라 object를 이용하고, destructuring syntax를 활용하였습니다.

```
진법 : base
최대 숫자 자릿수 : max
참가 인원 : people
특정 사람의 순서 : order
```

### Core logic

```js
const numberGame = ({ base, max, people, order }) => {
  const player = [];
  const result = [];

  const limit = 10 ** (max - 1);
  const maxNumber = parseInt(limit, base);

  for (let i = 0; i < maxNumber; i++) {
    const number = i.toString(base);
    const arr = number.split('');
    arr.forEach((v) => {
      result.push(v);
      const lastIndex = result.length - 1;
      const isOrder = lastIndex % people === order - 1;
      if (isOrder) player.push(v);
    });
  }

  return `All numbers: ${result.join(',')}\nNumbers spoken by person #${order}: ${player.join(
    ','
  )}`;
};
```

- JavaScript built-in function인 `parseInt`와 `toString`을 활용하여 진법을 전환할 수 있도록 구현했습니다.
- 예를 들어 2진법이고 4자리 숫자가 최대일 때 (max가 4일 때) `1000`이 최대 숫자인데, 이것을 10진법으로 바꿔 주어야 합니다. 따라서 `parseInt(1000, 2)`로 계산하여 8을 얻을 수 있습니다. 8을 최댓값으로 하여 loop를 돌면서 0부터 7까지 각 숫자를 `toString` 메서드를 활용해 base 진법에 맞게 변환합니다.

### [`parseInt()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt)

- `parseInt`는 첫 번째 인수를 문자열로 변환하고, 그 문자열을 파싱한 후, 정수나 `NaN`을 반환합니다.

#### Parameters

- `string`: 정수로 시작하는 문자열입니다. 문자열 앞에 있는 공백은 무시됩니다.
- `radix(optional)`: `string`의 기수(밑)을 나타내는 2에서 36 사이의 정수입니다. 2와 36의 범위를 벗어나는 수를 입력할 경우 함수는 `NaN`을 반환합니다. 0을 전달하거나 전달하지 않을 경우 `string`의 값을 기반으로 radix가 10 또는 16으로 유추됩니다. 선행하는 공백과 +/- 기호가 제거된 문자열이 `0x`나 `0X`로 시작하는 경우 radix는 16으로 설정되고, 그 외 다른 값으로 시작하는 경우 10으로 설정됩니다.

### [`Number.prototype.toString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toString)

- 지정된 숫자 값을 문자열로 반환합니다.
- radix(optional)을 전달할 수 있습니다. 기본값은 10이며 2에서 36 사이의 정수를 전달하면 해당 진법에 맞는 숫자로 변환됩니다.

  </br>

---

## Learning Checkpoint

- [x] 진법을 이해한다.
- [x] JavaScript로 진법을 변환하는 방법을 안다.
- [x] 배열을 순회하고 요소를 추가/삭제하는 방법을 안다.
