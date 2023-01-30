const fs = require('fs');

const inputData = fs.readFileSync('/dev/stdin').toString().split('\n');

const totalCount = Number(inputData[0]);

const calculatePoints = () => {
  const points = [];
  for (let i = 1; i <= totalCount; i++) {
    const cur = inputData[i];
    let curPoint = 0;
    let totalPoint = 0;
    for (const ox of cur) {
      if (ox === 'X') {
        curPoint = 0;
        continue;
      }
      curPoint++;
      totalPoint += curPoint;
    }
    points.push(totalPoint);
    totalPoint = 0;
    curPoint = 0;
  }
  return points;
};

const print = calculatePoints().reduce((acc, cur) => {
  acc += `${cur}\n`;
  return acc;
}, '');

console.log(print);
