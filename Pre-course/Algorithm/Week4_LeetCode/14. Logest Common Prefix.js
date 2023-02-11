/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  let prefix = '';
  strs.sort((a, b) => a.length - b.length);
  for (let i = 0; i < strs[0].length; i++) {
    const cur = strs[0][i];
    for (let j = 1; j < strs.length; j++) {
      if (strs[j][i] !== cur) return prefix;
    }
    prefix += cur;
  }
  return prefix;
};
