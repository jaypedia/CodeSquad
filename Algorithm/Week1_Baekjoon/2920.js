const fs = require('fs');

const inputData = fs.readFileSync('/dev/stdin').toString().trim();

const solution = () => {
  const ascending = '1 2 3 4 5 6 7 8';
  const descending = '8 7 6 5 4 3 2 1';
  if (inputData === ascending) return 'ascending';
  if (inputData === descending) return 'descending';
  return 'mixed';
};

const answer = solution();

console.log(answer);
