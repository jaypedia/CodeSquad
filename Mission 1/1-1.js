// Digital Logic Gate Function

function AND(bitA, bitB) {
  if (bitA && bitB) return true;
  return false;
}

function OR(bitA, bitB) {
  if (bitA || bitB) return true;
  return false;
}

function NAND(bitA, bitB) {
  if (bitA && bitB) return false;
  return true;
}

function XOR(bitA, bitB) {
  if (bitA !== bitB) return true;
  return false;
}

const bitA = true;
const bitB = false;

console.log(`
    ********* TEST ********
    bitA : true, bitB : false

    AND : ${AND(bitA, bitB)}
    OR : ${OR(bitA, bitB)}
    NAND : ${NAND(bitA, bitB)}
    XOR : ${XOR(bitA, bitB)}
`);
