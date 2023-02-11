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

function timeConversion(s) {
  const amOrPm = s.slice(-2);
  let [hour, min, sec] = s.slice(0, -2).split(':').map(Number);
  if (hour === 12 && amOrPm === 'AM') hour = 0;
  if (hour < 12 && amOrPm === 'PM') hour += 12;
  return [hour, min, sec].reduce((acc, cur, i) => {
    acc += cur.toString().padStart(2, '0');
    if (i !== 2) acc += ':';
    return acc;
  }, '');
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const s = readLine();

  const result = timeConversion(s);

  ws.write(result + '\n');

  ws.end();
}
