/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
  const isNegative = x < 0;
  let str = x.toString();
  if (isNegative) str = str.slice(1);
  const reversed = Number(str.split('').reverse().join(''));
  if (reversed > 2 ** 31 - 1) return 0;
  if (isNegative) return -reversed;
  return reversed;
};
