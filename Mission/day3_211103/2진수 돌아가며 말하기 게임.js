// ⭐ 문제 1 : T개의 숫자까지 M명이 말한다고 할 때, 이를 모두 출력하기
// 1번 문제에서는 people parameter가 쓰이지는 않는다.

function solution(notation, t, people) {
  let answer = [];
  // 여기서 num을 계산하는 방식은 2진법을 기준으로 하였다. 진법이 바뀔 경우 이 방식이 옳지 않을 수 있다.
  const num = parseInt('1' + '0'.repeat(t - 1), 2);

  for (let i = 0; i < num; i++) {
    let arr = i.toString(notation).split('');
    arr.forEach(v => answer.push(v));
  }
  return answer;
}

console.log(solution(2, 4, 2)); // ["0", "1", "1", "0", "1", "1", "1", "0", "0", "1", "0", "1", "1", "1", "0", "1", "1", "1"]

// Poki's answer
const solution2 = (n, t, m, p) => {
  const binNumArr = Array.from({ length: t * m }, (v, i) => i.toString(n));
  const result = binNumArr.join('').split('');
  const myNumArr = findNumOnMyTurn(result, p);

  return `모든 숫자 : ${result}\np번째 사람이 말하게 될 숫자 : ${myNumArr}`;
};

const findNumOnMyTurn = (result, p) => {
  const myNumArr = [];

  for (let i = 0; i < result.length; i++) {
    if (i % p === 0) myNumArr.push(result[i]); // 나머지 연산자 활용
  }

  return myNumArr;
};

console.log(solution2(10, 2, 5, 2));
