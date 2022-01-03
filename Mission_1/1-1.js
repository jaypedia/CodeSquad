// 1-1. Digital Logic Gate Functions

const and = (bitA, bitB) => bitA && bitB;

const or = (bitA, bitB) => bitA || bitB;

const nand = (bitA, bitB) => !and(bitA, bitB); // Not and gate
// const nand = (bitA, bitB) => !(bitA && bitB);

const nor = (bitA, bitB) => !or(bitA, bitB); // Not or gate
// const nor = (bitA, bitB) => !(bitA || bitB);

const xor = (bitA, bitB) => (!bitA && bitB) || (bitA && !bitB); // Exclusive Or gate
// const xor = (bitA, bitB) => bitA !== bitB ? true : false;

module.exports = { and, or, xor };
