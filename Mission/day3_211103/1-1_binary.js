// 2021-11-14
// 2진수 돌아가며 말하기 게임

// ⭐ 문제 1 : T개의 숫자까지 M명이 말한다고 할 때, 이를 모두 출력하기

function game1(notation, t) {
  let answer = [];
  const num = parseInt('1' + '0'.repeat(t - 1), notation);

  for (let i = 0; i < num; i++) {
    let arr = i.toString(notation).split('');
    arr.forEach(v => answer.push(v));
  }

  return answer;
}

console.log(game1(2, 4)); // ["0", "1", "1", "0", "1", "1", "1", "0", "0", "1", "0", "1", "1", "1", "0", "1", "1", "1"]
// console.log(game1(10, 2));

// ⭐ 문제 2 : 길동이 차례 숫자 맞추기 + 문제 3 : n진수까지 되는 프로그램
// 게임에 참가하는 인원 people
// 길동이의 순서 order

function game2(notation, t, people, order) {
  let speak = [];
  let answer = [];

  const num = parseInt('1' + '0'.repeat(t - 1), notation);

  for (let i = 0; i < num; i++) {
    let arr = i.toString(notation).split('');
    arr.forEach(v => speak.push(v));
  }

  let index = order - 1;

  for (let i = 0; i < speak.length; i++) {
    if (index <= speak.length && speak[index]) {
      answer.push(speak[index]);
      index += people;
    }
  }

  return answer;
}

// console.log(game2(2, 4, 5, 2)); // 게임 참여 인원 5, 길동이 순서 2
// console.log(game2(16, 2, 5, 5));

// 길동이가 말해야 하는 순서와 숫자를 함께 알려 주는 프로그램
function game3(notation, t, people, order) {
  let speak = [];
  let answer = {};

  const num = parseInt('1' + '0'.repeat(t - 1), notation);

  for (let i = 0; i < num; i++) {
    let arr = i.toString(notation).split('');
    arr.forEach(v => speak.push(v));
  }

  let index = order - 1;

  for (let i = 0; i < speak.length; i++) {
    if (index <= speak.length && speak[index]) {
      answer[`${index + 1}번째`] = speak[index];
      index += people;
    }
  }

  return answer;
}

console.log(game3(2, 4, 5, 2));
// console.log(game3(10, 2, 7, 3));

// 2021-11-17
// Refactoring using class
class BinaryGame {
  constructor(notation, t, people, order) {
    this.notation = notation;
    this.t = t;
    this.people = people;
    this.order = order;
  }

  makeNum() {
    return parseInt('1' + '0'.repeat(this.t - 1), this.notation);
  }

  speak() {
    let speak = [];
    const num = this.makeNum();

    for (let i = 0; i < num; i++) {
      let arr = i.toString(this.notation).split('');
      arr.forEach(v => speak.push(v));
    }

    return speak;
  }

  tellOrder() {
    let answer = {};
    let index = this.order - 1;
    const speakArr = this.speak();
    const length = speakArr.length;

    for (let i = 0; i < length; i++) {
      if (index <= length && speakArr[index]) {
        answer[`${index + 1}번째`] = speakArr[index];
        index += this.people;
      }
    }

    return answer;
  }
}

// test
const binaryGame = new BinaryGame(2, 4, 5, 2);
console.log(binaryGame.speak());
console.log(binaryGame.tellOrder());
