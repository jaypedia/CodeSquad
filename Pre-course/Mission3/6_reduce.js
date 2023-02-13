const myReduce = (array, callback, initialValue) => {
  let result = initialValue;
  for (const value of array) {
    result = callback(result, value);
  }
  return result;
};

const test = () => {
  // Pass sum function
  const sum = (acc, cur) => acc + cur;
  const result1 = myReduce([1, 2, 3, 4, 5], sum, 0);
  console.log(result1); // 15

  // Pass callback function
  const callback = (acc, cur) => {
    acc.set(cur, ~~acc.get(cur) + 1);
    return acc;
  };
  const map = new Map();
  const result2 = myReduce([1, 1, 1, 2, 2, 3], callback, map);
  console.log(result2); // Map(3) { 1 => 3, 2 => 2, 3 => 1 }
};

test();
