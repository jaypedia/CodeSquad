// (1) 0부터 256 미만의 정수형 10진수를 2진수 배열로 변환하는 함수
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

console.log(getExponents(10, 2));

function dec2bin(decimal) {
  const exponents = getExponents(decimal, 2);
  const arrLength = exponents[0] + 1;
  const answer = Array(arrLength).fill(0);

  for (let i = 0; i < exponents.length; i++) {
    answer[exponents[i]] = 1;
  }

  return answer;
}

console.log(getExponents(10, 2));
console.log(dec2bin(10));

// (2) 2진수 배열을 정수형 10진수로 변환하는 함수
function bin2dec(binary) {
  const exponents = binary.map((v, i) => v * i);
  const answer = Array(binary.length).fill(2);
  return answer
    .map((v, i) => (exponents[i] ? v ** exponents[i] : v * 0))
    .reduce((a, b) => a + b);
}

console.log(bin2dec([0, 1, 0, 1]));

// (3) 10진수 2개를 인자로 받아서 각각을 2진수로 변환 후 더한 값을 16진수로 변환하는 함수
const { byteAdder } = require('./1-3.js');

function dec2binAdd2hex(dec1, dec2) {
  const result = byteAdder(dec2bin(dec1), dec2bin(dec2));
  // 16진수로 변환
}

console.log(dec2binAdd2hex(10, 10));
