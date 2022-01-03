// Half Adder & Full Adder

import { AND, XOR, OR } from './1-1.js';

function halfAdder(bitA, bitB) {
  const sum = XOR(bitA, bitB);
  const carry = AND(bitA, bitB);
  const answer = [sum, carry];

  return answer;
}

function fullAdder(bitA, bitB, carryBit) {
  const first = halfAdder(bitA, bitB);
  const sum1 = first[0];
  const carry1 = first[1];

  const second = halfAdder(sum1, carryBit);
  const sum2 = second[0];
  const carry2 = second[1];

  const sum = sum2;
  const carry = OR(carry1, carry2);

  const answer = [sum, carry];

  return answer;
}

const bitA = true;
const bitB = false;
const carryBit = true;

console.log(`
    ✔️ halfAdder ${halfAdder(bitA, bitB)}
    ✔️ fullAdder ${fullAdder(bitA, bitB, carryBit)}
`);
