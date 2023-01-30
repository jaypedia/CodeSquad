// node.js의 file system 모듈을 불러온다.
const fs = require('fs');

// file system 모듈의 readFileSync 메서드를 이용해 동기적으로 해당 경로의 파일 전체를 읽어들인다.
// 백준에서는 '/dev/stdin' 경로에 테스트 케이스 파일이 있다.
// 읽어들인 정보는 toString 메서드로 문자열로 반환 후, split 메서드로 배열로 변환한다.
const inputData = fs.readFileSync('/dev/stdin').toString().split(' ');

const A = Number(inputData[0]);
const B = Number(inputData[1]);

console.log(A + B);
