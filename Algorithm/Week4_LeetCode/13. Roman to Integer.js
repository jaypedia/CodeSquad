/**
 * @param {string} s
 * @return {number}
 */

var romanToInt = function (s) {
  const roman = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };
  let int = 0;

  for (let i = 0; i < s.length; i++) {
    const cur = s[i];
    const next = s[i + 1];
    const curNum = roman[cur];
    const nextNum = roman[next] || 0;
    if (curNum >= nextNum) {
      int += curNum;
      continue;
    }
    int += nextNum - curNum;
    i++;
  }

  return int;
};
