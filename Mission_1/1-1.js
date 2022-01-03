// Digital Logic Gate Function

export function AND(bitA, bitB) {
  if (bitA && bitB) return true;
  return false;
}

export function OR(bitA, bitB) {
  if (bitA || bitB) return true;
  return false;
}

function NAND(bitA, bitB) {
  if (bitA && bitB) return false;
  return true;
}

export function XOR(bitA, bitB) {
  if (bitA !== bitB) return true;
  return false;
}

const bitA = true;
const bitB = false;

console.log(`
    ********* TEST ********
    bitA : ${bitA}, bitB : ${bitB}

    AND : ${AND(bitA, bitB)}
    OR : ${OR(bitA, bitB)}
    NAND : ${NAND(bitA, bitB)}
    XOR : ${XOR(bitA, bitB)}
`);
