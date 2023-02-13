# Mission 3. Array

> 2021.11.3

## Description

- 프로그래밍할 때는 데이터를 잘 다뤄야 합니다. View 작업도 결국 데이터에 의해 변경되며, 렌더링됩니다.
- 자바스크립트의 대표적인 자료형인 배열과 객체를 다양하게 처리하는 연습을 하고, 고차함수를 직접 만들어 봅니다.

### 1. Factorial

- factorial이란 n이 자연수일 때, 1부터 n까지의 모든 자연수의 곱을 의미합니다. n factorial은 n!으로 표시합니다. ([참고](https://ko.javascript.info/task/factorial))

```js
n! = n * (n - 1) * (n - 2) * ...*1
```

- 임의의 숫자를 입력받아 1부터 해당 숫자까지의 factorial 값을 배열에 담아 반환하는 함수를 구현했습니다.

```js
// Using for loop
const calculateFactorials = (number) => {
  const result = [1];
  if (number === 0) return result;

  let cur = 1;
  for (let i = 1; i <= number; i++) {
    cur *= i;
    result.push(cur);
  }

  return result;
};

// Using recursion
const calculateFactorialsRecursive2 = (number) => {
  const factorial = (number) => {
    if (number <= 0) return 1;
    return number * factorial(number - 1);
  };

  const result = [];

  for (let i = 0; i <= number; i++) {
    result.push(factorial(i));
  }

  return result;
};
```

### 2. Filtering ID

- 특수문자가 포함되지 않은 id만 필터링하여 배열로 반환합니다. 이때 id에 숫자가 포함된 경우 해당 숫자를 제거한 후 배열에 포함시킵니다.

```js
// 특수문자가 포함되지 않은 문자열인지 판별하는 함수
const hasSpecialCharacters = (str) => {
  const regex = /[^A-Z0-9]/i;
  return regex.test(str);
};

// 문자열에서 숫자를 제거하는 함수
const removeNumber = (str) => {
  return str.replace(/[0-9]/g, '');
};
```

- 특수문자가 포함되었는지 확인하기 위해, 알파벳과 숫자 이외에 포함된 문자가 있을 경우 false를 반환하도록 하였습니다. 단, id는 영어로만 이루어졌다고 가정합니다.

```js
const filterId = (idArr) => {
  return idArr.reduce((acc, cur) => {
    if (hasSpecialCharacters(cur)) return acc;
    const idWithNumbersRemoved = removeNumber(cur);
    acc.push(idWithNumbersRemoved);
    return acc;
  }, []);
};
```

- 위에서 구현한 두 함수를 활용하여 id를 특정 조건에 따라 필터링하는 함수를 구현했습니다.

### 3. Average

```js
const grades = [
  [88, 76, 77],
  [33, 44, 44],
  [90, 100, 94],
  [30, 44, 98, 10, 50],
];
```

- 3개의 과목에 대한 학생들의 점수가 이차원 배열에 담아 주어집니다. 각 학생들의 평균 점수와 각 학생 별 최고 점수의 평균 점수를 구하는 함수를 구현했습니다.

```js
// 각 학생들의 평균 점수를 구하는 함수
const calcAverage = (grades) => {
  return grades.reduce((acc, cur) => {
    const sum = cur.reduce((acc, cur) => acc + cur, 0);
    acc.push(sum / cur.length);
    return acc;
  }, []);
};

// 각 학생 별 최고 점수의 평균 점수를 구하는 함수
const calcHighestAverage = (grades) => {
  const sum = grades.reduce((acc, cur) => {
    const max = Math.max(...cur);
    acc += max;
    return acc;
  }, 0);
  return sum / grades.length;
};
```

### 4. Find Number Value

- 객체에서 value가 `number` 타입인 요소의 key만 뽑아 배열로 반환합니다.
- 자바스크립트에서 제공하는 JSON 관련 메서드를 활용하여 구현했습니다. JSON과 관련해서는 [문서](https://github.com/jaypedia/CodeSquad/blob/main/Pre-course/Mission3/JSON.md)로 정리하였습니다.

```js
const findNumberValue = (obj) => {
  const answer = [];
  const obj = JSON.stringify(obj);
  JSON.parse(obj, (key, value) => {
    if (typeof value === 'number') answer.push(key);
  });
  return answer;
};
```

- 우선 중첩된 객체 형태의 데이터를 `JSON.stringify` 메서드를 사용해 직렬화 해줍니다.
- 이렇게 JSON 포맷의 문자열로 직렬화된 문자열을 `JSON.parse` 메서드를 사용해 역직렬화 해줍니다. 이때 두 번째 인수인 `reviver` 함수를 사용하면 데이터를 원하는대로 변경할 수 있습니다.

### 5. Find Target Value

- 객체를 순회하며 property에 접근해서 원하는 key나 value를 추출합니다.
- 배열 안에 객체가 있고, 그 객체는 배열 안에 또 객체가 있는 식으로 중첩되어 있습니다.
- type이 'sk'인 데이터에서 key가 'name'인 value만 뽑아서 배열로 만들어 출력합니다.

```js
const findTargetValue = (arr, keyName, targetValue, result = []) => {
  arr.forEach((obj) => {
    for (const key in obj) {
      if (obj[key] === targetValue) {
        result.push(obj[keyName]);
      }
      if (typeof obj[key] === 'object') {
        findTargetValue(obj[key], keyName, targetValue, result);
      }
    }
  });
  return result;
};

console.log(findTargetValue(data, 'name', 'sk')); // [ 'Yong', 'hary', 'solvin', 'hani', 'chulsu' ]
```

- 객체를 순회하기 위해 [`for...in`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in) 문을 사용했습니다.
- 중첩된 데이터를 순회하며 확인하기 위해 재귀를 사용했습니다.
  - 만약 데이터가 중첩되어 있다면 해당 데이터의 타입은 `object`이므로, 그때 함수를 재귀적으로 호출하여 탐색 작업을 계속합니다.
  - 만약 `obj[key]` 값이 `targetValue`와 일치한다면 `result` 배열에 `push`합니다.

### 6. Reduce

```js
const myReduce = (array, callback, initialValue) => {
  let result = initialValue;
  for (const value of array) {
    result = callback(result, value);
  }
  return result;
};
```

- 배열, 콜백 함수, 초깃값을 전달받아 결과를 반환하는 커스텀 Reduce 함수입니다.
- JavaScript의 `reduce`, `reduceRight`에 대한 자세한 설명은 JavaScript info의 [배열을 변경하는 메서드](https://ko.javascript.info/array-methods#ref-646) 편에 자세히 설명되어 있습니다.
