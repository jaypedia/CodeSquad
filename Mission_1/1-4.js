// (1) 0부터 256 미만의 정수형 10진수를 2진수 배열로 변환하는 함수

function getExponents(decimal) {
  let i = 0;
  let num = decimal;
  const exponents = [];

  while (num > 0) {
    if (2 ** i < num) {
      i++;
    } else if (2 ** i === num) {
      exponents.push(i);
      return exponents;
    } else if (2 ** i > num) {
      exponents.push(i - 1);
      num = num - 2 ** (i - 1);
      i = 0;
    }
  }
  return exponents;
}

function dec2bin(decimal) {
  const exponents = getExponents(decimal);
  let n = exponents[0];
  const answer = Array(n + 1).fill(0);

  for (let i = 0; i < exponents.length; i++) {
    answer[exponents[i]] = 1;
  }

  return answer;
}

console.log(getExponents(10));
console.log(dec2bin(10));

// (2) 2진수 배열을 정수형 10진수로 변환하는 함수
function bin2dec(binary) {}
