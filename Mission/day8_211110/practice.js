function countElement(data) {
  let count = 0;
  const recur = data => {
    data.forEach(array => {
      if (typeof array !== 'object') count++;
      else recur(array);
    });
    return count;
  };
  return recur(data);
}
// 화살표 함수가 두개나 있어서 잘 와닿지 않는다. 어떻게 해석하면 될까?
