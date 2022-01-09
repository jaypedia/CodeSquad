# CS01

## 1-4. Base converter (진법 변환기)

### (1) 10진수를 2진수 배열로 변환하는 함수

##### 1. 십진수를 **2의 n제곱의 합**으로만 나타낼 때, 지수만을 담은 배열을 만든다.

<img src="https://latex.codecogs.com/svg.image?10&space;=&space;2^3&space;&plus;&space;2^1" title="10 = 2^3 + 2^1" />
예를 들어 10은 위와 같은 수식으로 나타낼 수 있다. 여기서 지수만 담은 배열인 [3,1]을 출력하도록 하는 것이다.

```js
function getExponents(decimal, base) {
  let i = 0;
  let num = decimal;

  const exponents = [];

  while (num > 0) {
    if (base ** i < num) {
      i++;
    } else if (base ** i === num) {
      exponents.push(i);
      return exponents;
    } else if (base ** i > num) {
      exponents.push(i - 1);
      num = num - base ** (i - 1);
      i = 0;
    }
  }
  return exponents;
}
```

- 반복문 내부에 조건문을 두고, **2의 i제곱**과 **변환하고 싶은 숫자**를 비교해 로직을 수행하도록 했다.

```
   예시 : decimal이 10이고, base는 2일 때
  - num에 10을 할당, 10은 0보다 크므로 반복문 내부 로직 실행
  - 2 ** 0 < 10 이므로 i++ 하여 i는 1이 됨
  - 2 ** 1 < 10 ...
  - 2 ** 4 > 10 d이므로 exponents 배열에 4 - 1을 push
    - 10에서 2 ** 3을 빼 줘서 num은 2가 됨, i는 0으로 초기화
  - 2 ** 1 === 2 이므로 1을 push
  - 최종적으로 exponents 배열에 [3,1]이 담기게 됨
```

##### 2. 지수 배열을 이진법으로 변경하기

- dec2bin 함수의 역할은 지수가 담긴 배열 [3,1]을 변환해 비트가 담긴 배열 [0,1,0,1]을 출력하도록 하는 것이다.
- 10을 이진수로 바꾸면 1010이지만, 비트 순서는 낮은 자리가 배열의 앞에 오도록 표현한다. 이진수가 뒤집혀 있는 것처럼 보인다.

```js
function dec2bin(decimal) {
  const exponents = getExponents(decimal, 2);

  // 비트가 담긴 배열의 길이
  const arrLength = exponents[0] + 1;

  // 배열의 길이만큼의 0의 개수로 채워진 배열 만들기
  const answer = Array(arrLength).fill(0);

  // 지수가 담긴 배열의 길이만큼 for문 돌면서 지수가 담긴 배열의 원소를 인덱스로 활용해서 0을 1로 바꾼다.
  for (let i = 0; i < exponents.length; i++) {
    answer[exponents[i]] = 1;
  }

  return answer;
}
```

### (2) 2진수 배열을 10진수로 변환하는 함수

```js
function bin2dec(binary) {
  const exponents = binary.map((v, i) => v * i);
  const answer = Array(binary.length).fill(2);

  return answer
    .map((v, i) => (exponents[i] ? v ** exponents[i] : v * 0))
    .reduce((a, b) => a + b);
}
```

```
예시 : bin2dec([0, 1, 0, 1])

1. 우선 지수가 담긴 배열을 구한다.
binary.map((v, i) => v * i) 결과 [0, 1, 0, 3]

2. answer에는 binary 배열의 길이만큼 2를 채운다.
[2, 2, 2, 2]

3. exponents[i] 요소가 0이 아니면 지수를 곱해 주고, 0이면 0을 곱해 준다.
그것의 총합을 구한다.
2 * 0 + 2 ** 1 + 2 * 0 + 2 ** 3 = 0 + 2 + 0 + 8 = 10

```

### (3) 2진수 배열을 16진수로 변환하는 함수

- 16진법은 긴 이진수를 짧게 만들 수 있기 때문에 유용하다.
- 두 기수 모두 **2의 제곱수**이므로 십진수를 이진수로 바꾸는 것보단 간단하다.

##### 1. 2진수의 숫자를 4자리씩 묶는다.

##### 2. 4자리로 묶은 숫자에 2진수의 자리값을 곱한다.

##### 3. 곱한 값을 더하면 16진수가 된다.

```js
function bin2hex(binary) {
  const answer = [];
  const hexArr = ['A', 'B', 'C', 'D', 'E', 'F'];

  for (let i = 0; i < binary.length; i += 4) {
    // slice로 2진수 배열을 4개씩 잘라 준다.
    // reduce로 2진수의 자리값을 곱하고 더해 준다.
    let dec = binary.slice(i, i + 4).reduce((a, c, i) => a + c * 2 ** i);

    // 더한 값이 10 미만이면 그대로 answer 배열에 push하고,
    // 10 이상이면 10을 뺀 값을 hexArr의 인덱스로 사용해 얻어낸 값을 push한다.
    if (dec < 10) answer.push(dec);
    else answer.push(hexArr[dec - 10]);
  }

  return answer;
}
```

---

### 추가 미션 : 8비트 뿐만 아니라, 4비트나 16비트도 처리 가능한 함수 만들기

```js
function setBitLength(a, b) {
  let [short, long] = [a, b];
  if (a.length > b.length) [short, long] = [b, a];
  short = short.concat(Array(long.length - short.length).fill(0));

  return [short, long];
}
```

- a와 b, 두 배열의 길이가 다르므로 긴 배열의 길이를 기준으로 짧은 배열에 0을 채워서 길이를 맞춘다.

### 🤔 더 나아가는 질문

##### ❔ 바이트 순서를 큰 비트(Most Significant Bit)를 좌측으로 배치하는 것과 우측으로 배치하는 방식이 구현할 때 어떤 장점이 있는가?

##### ❔ 16진수를 2진법으로 변환하는 함수를 만든다면 어떤 구조가 될까?

---

### Reference

https://ko.wikihow.com/2%EC%A7%84%EC%88%98%EB%A5%BC-16%EC%A7%84%EC%88%98%EB%A1%9C-%EB%B0%94%EA%BE%B8%EB%8A%94-%EB%B2%95
