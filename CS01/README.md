# CS01

##### Study : 2022.1.3 ~ 1.9

##### Review :

---

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

---

### 🤔 더 나아가는 질문

#### ❔ 큰 비트(Most Significant Bit)를 좌측에 배치하는 것과 우측에 배치하는 것의 차이는?

##### Endianness (엔디언)

- 컴퓨터의 메모리와 같은 1차원의 공간에 여러 개의 연속된 대상을 배열하는 방법

##### Byte order

- 컴퓨터는 데이터를 메모리에 저장할 때 byte 단위로 나눠서 저장한다. 데이터는 대부분 4byte나 8byte로 구성된다. 이렇게 **연속되는 byte를 순서대로 저장**해야 하는데, 이것을 **byte order**라고 한다.
- byte가 저장되는 순서에 따라 **big endian, little endian** 두 가지 방식으로 나눌 수 있다.
  - 이 둘은 단지 저장해야 할 큰 데이터를 어떻게 나누어 저장하는가에 따른 차이일 뿐이다.
  - 어떤 방식이 더 우수하다고 단정지을 수 없다.

![image](https://user-images.githubusercontent.com/85419343/148687594-5a625018-31c4-48ff-b4fd-f77d321c9a0d.png)

##### Big endian

- 사람이 숫자를 쓰는 방법과 같이, 큰 단위의 바이트가 앞에 오는 방법
- 낮은 주소에 높은 바이트(MSB)부터 저장
- 평소 숫자를 사용하는 선형 방식과 같기 때문에 메모리에 저장된 순서 그대로 읽을 수 있고 이해하기 쉬움
- 네트워크를 통해 데이터를 전송할 때 사용
  - 역사적으로 Routing이 전화를 거는 식으로 접두 부호로 이루어졌기 때문
  - 이 영향으로 많은 프로토콜과 몇몇 파일 포맷이 big endian 사용
- 소프트웨어의 debug를 편하게 해 준다는 장점 : 사람이 숫자를 읽고 쓰는 방법과 같기 때문에 디버깅 과정에서 메모리의 값을 보기 편함

##### Little endian

- 낮은 주소에 낮은 바이트(LSB, Least Significant Bit)부터 저장하는 방식
- 숫자를 거꾸로 읽어야 함
- 대부분의 Intel CPU 계열에서 이 방식으로 데이터 저장 (Intel format)
  - Intel 기반 시스템에서 socket 통신을 할 때에는 byte 순서에 신경 써서 데이터 전달해야 함
- 물리적으로 데이터를 조작하거나 산술 연산을 수행할 때에는 이 방식이 더 효율적
  - 메모리에 저장된 값의 하위 바이트들만 사용할 때 별도의 계산이 필요하지 않음
- 가산기가 덧셈을 하는 과정은 LSB로부터 시작하여 자리 올림을 계산해야 하므로, 첫 번째 바이트가 LSB인 little endian에서는 가산기 설계가 좀 더 단순해짐
  - Big endian에서는 가산기가 덧셈을 할 때 마지막 바이트에서 시작해서 첫 번째 바이트까지 역방향으로 진행되어야 함
  - 그러나 오늘날의 프로세서는 여러 개의 바이트를 동시에 읽어들여 동시에 덧셈을 수행하는 구조를 갖고 있어 두 엔디언 사이에 사실상 차이가 없음

##### My opinion

- 이번 미션은 Little endian 방식으로 해결해야 했다. 즉 LSB가 좌측에, MSB가 우측에 배치된다.
- Little endian 방식을 사용하면 연산을 배열의 맨 마지막 인덱스에서 할 필요 없이 맨 앞에서 시작하면 된다. 즉 0번째 인덱스부터 계산을 시작할 수 있어서 로직이 비교적 간단해질 수 있다.

#### ❔ 16진수를 2진법으로 변환하는 함수를 만든다면 어떤 구조가 될까?

- 각 16진수를 **4자리의 이진수**로 변환한다.

```
Hexadecimal number : 9     A      F

Binary number :    1001   1010   1111

```

- **2진수에서는 n자리 숫자가 2^n개의 숫자를 표현할 수 있다.** 즉, 4개의 2진수로는 2^4이므로 16개의 다른 숫자를 만들어 낼 수 있다.
- **16진수는 한 자리 수가 16개의 숫자를 표현할 수 있다.** 그래서 16진수와 2진수 사이의 변환은 쉽다.

---

### Reference

https://ko.wikihow.com/2%EC%A7%84%EC%88%98%EB%A5%BC-16%EC%A7%84%EC%88%98%EB%A1%9C-%EB%B0%94%EA%BE%B8%EB%8A%94-%EB%B2%95

https://illustrationprize.com/ko/363-hexadecimal-to-binary-amp-binary-to-hexadecimal-conversion-methods.html

https://ko.wikihow.com/16%EC%A7%84%EC%88%98%EB%A5%BC-2%EC%A7%84%EC%88%98%EC%99%80-10%EC%A7%84%EC%88%98%EB%A1%9C-%EB%B3%80%ED%99%98%ED%95%98%EB%8A%94-%EB%B2%95

https://tcpschool.com/c/c_refer_endian

https://ko.wikipedia.org/wiki/%EC%97%94%EB%94%94%EC%96%B8

https://en.wikipedia.org/wiki/Endianness
