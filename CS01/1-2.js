// 1-2. Half Adder & Full Adder

const { and, or, xor } = require('./1-1.js');

const getSum = (bitA, bitB) => xor(bitA, bitB);
const getCarry = (bitA, bitB) => and(bitA, bitB);

const halfAdder = (bitA, bitB) => [getSum(bitA, bitB), getCarry(bitA, bitB)];

const fullAdder = (bitA, bitB, carry) => {
  const [firstSum, firstCarry] = halfAdder(bitA, bitB);
  const [secondSum, secondCarry] = halfAdder(firstSum, carry);
  const carryBit = or(firstCarry, secondCarry);
  return [secondSum, carryBit];
};

module.exports = { fullAdder };
