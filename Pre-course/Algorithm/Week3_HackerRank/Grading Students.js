'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function (inputStdin) {
  inputString += inputStdin;
});

process.stdin.on('end', function () {
  inputString = inputString.split('\n');

  main();
});

function readLine() {
  return inputString[currentLine++];
}

// Solution 1
function gradingStudents(grades) {
  return grades.map((v) => {
    return v >= 38 && v % 5 >= 3 ? (Math.floor(v / 5) + 1) * 5 : v;
  });
}

// Solution 2
function gradingStudents(grades) {
  const result = [];
  grades.forEach((grade) => {
    if (grade < 38) result.push(grade);
    else {
      const nextMultipleOf5 = Math.ceil(grade / 5) * 5;
      const diff = nextMultipleOf5 - grade;
      if (diff < 3) result.push(nextMultipleOf5);
      else result.push(grade);
    }
  });
  return result;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const gradesCount = parseInt(readLine().trim(), 10);

  let grades = [];

  for (let i = 0; i < gradesCount; i++) {
    const gradesItem = parseInt(readLine().trim(), 10);
    grades.push(gradesItem);
  }

  const result = gradingStudents(grades);

  ws.write(result.join('\n') + '\n');

  ws.end();
}
