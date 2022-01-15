// 1/13 시도한 코드(미완성)

class InputProcessor {
  constructor() {
    this.readline;
    this.A = {};
    this.B = {};
  }

  init() {
    this.setReadLine();
    this.getUserInput();
  }

  setReadLine() {
    this.readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    this.readline.setPrompt(`📍 ENTER COORDINATES > `);
  }

  getUserInput() {
    this.readline.prompt();
    this.readline
      .on('line', line => {
        // line에서 입력한 좌표 개수에 따라서 다른 클래스를 호출하도록 설계
        this.getCoordinates(line);
        this.readline.prompt();
      })
      .on('close', () => process.exit());
  }

  getCoordinates(line) {
    // 객체 아닌 이차원 배열에 저장하는 식으로 변경
    const arr = line.split('-')[0].slice(1).split(',');
    this.A['x1'] = +arr[0];
    this.A['y1'] = parseInt(arr[1]);
    console.log(this.A);
  }
}

// 공통된 속성을 가지고 있는 클래스 (Super Class)
class Calculator {}

// 콘솔에 출력을 담당
class Printer {}

// 직선 계산
class Edge {
  constructor(A, B) {
    this.x1 = A.x;
    this.x2 = B.x;
    this.y1 = A.y;
    this.y2 = B.y;
  }

  calculate() {
    return Math.sqrt((this.x1 - this.x2) ** 2 + (this.y1 - this.y2) ** 2);
  }
}

const inputProcessor = new InputProcessor();
inputProcessor.init();
