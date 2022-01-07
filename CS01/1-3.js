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
