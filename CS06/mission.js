const factorArr = num =>
  Array.from({ length: num }, (_, i) => i + 1).filter(v => !(num % v));

const factorSum = facArr => facArr.reduce((a, c) => a + c);

const getDiff = num => factorSum(factorArr(num)) - num;

const isPerfect = num => getDiff(num) === num;
const isAbundant = num => getDiff(num) > num;
const isDeficient = num => getDiff(num) < num;
const isPrime = num => factorArr(num).length === 2;
const isSquared = num => Number.isInteger(Math.sqrt(num));

const getType = num => {
  if (isPerfect(num)) return 'perfect';
  if (isAbundant(num)) return 'abundant';
  if (isDeficient(num)) return 'deficient';
};

const isPrimeOrSquared = num => {
  if (isPrime(num)) return 'prime';
  if (isSquared(num)) return 'squared';
  return '';
};

const classify = num => `${num} : ${getType(num)}, ${isPrimeOrSquared(num)}`;

// 🖨️ Print result
// 1. 반복문으로 작성 시
const printPADPS1 = (start, end) => {
  for (let i = start; i <= end; i++) {
    console.log(classify(i));
  }
};

// 2. map & forEach 활용시
const printPAPDS2 = (start, end) =>
  [...Array(end)]
    .map((_, i) => i + start)
    .forEach(n => console.log(classify(n)));

printPAPDS2(2, 99);
