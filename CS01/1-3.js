// 1-3. 8-bit Adder (Byte Adder)

const { fullAdder } = require('./1-2.js');

function byteAdder(byteA, byteB) {
  const answer = [];
  let carryBit = 0;

  for (let i = 0; i < byteA.length; i++) {
    const resultBit = fullAdder(byteA[i], byteB[i], carryBit);
    answer.push(+resultBit[0]);
    carryBit = resultBit[1];
  }

  answer.push(carryBit);
  return answer;
}

// 입력으로 들어오는 byteA, byteB 배열의 길이는 같다고 가정
// 비트의 순서는 낮은 자리가 배열의 앞 인덱스에 오도록 함
const byteA = [1, 1, 0, 1, 1, 0, 1, 0]; //  01011011
const byteB = [1, 0, 1, 1, 0, 0, 1, 1]; //  11001101

console.log(`
    ${byteAdder(byteA, byteB)}
`);

module.exports = { byteAdder };

// 추가 미션 : 8비트 뿐만 아니라, 4비트나 16비트도 처리 가능한 함수 만들기

function setBitLength(a, b) {
  let [short, long] = [a, b];
  if (a.length > b.length) [short, long] = [b, a];
  short = short.concat(Array(long.length - short.length).fill(0));

  return [short, long];
}

console.log(setBitLength([1, 1, 0, 1], [1, 1]));

function upgradedByteAdder(byteA, byteB) {
  const [a, b] = setBitLength(byteA, byteB);
  const answer = [];
  let carryBit = 0;

  for (let i = 0; i < a.length; i++) {
    const [sum, carry] = fullAdder(a[i], b[i], carryBit);
    answer.push(+sum);
    carryBit = carry;
  }

  answer.push(carryBit);
  return answer;
}

console.log(upgradedByteAdder([1, 1, 0, 1], [1, 1]));
