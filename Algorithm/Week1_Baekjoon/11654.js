const fs = require('fs');

const inputData = fs.readFileSync('/dev/stdin').toString();

const ascii = inputData.charCodeAt();

console.log(ascii);
