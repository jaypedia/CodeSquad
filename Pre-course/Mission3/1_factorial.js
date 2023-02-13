const calculateFactorials = (number) => {
  const result = [1];
  if (number === 0) return result;

  let cur = 1;
  for (let i = 1; i <= number; i++) {
    cur *= i;
    result.push(cur);
  }

  return result;
};

const calculateFactorialsRecursive1 = (number) => {
  const result = [];

  const factorial = (number) => {
    if (number <= 0) {
      result.push(1);
      return 1;
    }

    const cur = number * factorial(number - 1);
    result.push(cur);
    return cur;
  };

  factorial(number);
  return result;
};

const calculateFactorialsRecursive2 = (number) => {
  const factorial = (number) => {
    if (number <= 0) return 1;
    return number * factorial(number - 1);
  };

  const result = [];

  for (let i = 0; i <= number; i++) {
    result.push(factorial(i));
  }

  return result;
};

const test = () => {
  console.log(calculateFactorials(4));
  console.log(calculateFactorialsRecursive1(4));
  console.log(calculateFactorialsRecursive2(4));
};

test();
