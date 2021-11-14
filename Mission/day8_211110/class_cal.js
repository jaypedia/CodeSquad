// Learn class with a simple example
class Calculator {
  constructor(previousOperand, currentOperand) {
    this.previousOperand = previousOperand;
    this.currentOperand = currentOperand;
  }

  add() {
    return this.previousOperand + this.currentOperand;
  }

  subract() {
    return this.previousOperand - this.currentOperand;
  }
}

const calculator = new Calculator(1, 3);
console.log(calculator.add());

// ES5 생성자 함수
const Calculator2 = function () {
  function constructor(previousOperand, currentOperand) {
    this.previousOperand = previousOperand;
    this.currentOperand = currentOperand;
  }

  Calculator2.prototype.add = function () {
    return this.previousOperand + this.currentOperand;
  };
};

const cal2 = new Calculator2(3, 5);
console.log(cal2.add());
