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
console.log(game1(16, 2));

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

console.log(game2(2, 4, 5, 2)); // 게임 참여 인원 5, 길동이 순서 2
console.log(game2(16, 2, 5, 5));

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
      answer[`${index}번째`] = speak[index];
      index += people;
    }
  }

  return answer;
}

console.log(game3(2, 4, 5, 2));
console.log(game3(16, 2, 5, 5));
