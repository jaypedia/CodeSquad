const fs = require('fs');

const number = Number(fs.readFileSync('/dev/stdin').toString());

const makeStarTree = (number) => {
  let tree = '';
  for (let i = 1; i <= number; i++) {
    tree += '*'.repeat(i);
    if (i !== number) tree += '\n';
  }
  return tree;
};

const starTree = makeStarTree(number);

console.log(starTree);
