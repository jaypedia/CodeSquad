// ⭐ 문제 1 : T개의 숫자까지 M명이 말한다고 할 때, 이를 모두 출력하기
// 1번 문제에서는 people parameter가 쓰이지는 않는다.

function solution(notation, t, people) {
  let answer = [];
  // 여기서 num을 계산하는 방식은 2진법을 기준으로 하였다.
  // 진법이 바뀔 경우 이 방식이 옳지 않을 수 있다.
  const num = parseInt('1' + '0'.repeat(t - 1), 2);

  for (let i = 0; i < num; i++) {
    let arr = i.toString(notation).split('');
    arr.forEach(v => answer.push(v));
  }
  return answer;
}

console.log(solution(2, 4, 2)); // ["0", "1", "1", "0", "1", "1", "1", "0", "0", "1", "0", "1", "1", "1", "0", "1", "1", "1"]

// 궁금한 점
// n개의 숫자까지 -=> 이것을 자릿수로 해석했는데 맞는가?

// 약 1시간 10분만에 문제 3개 모두 해결!
// 못 풀 줄 알았던 문제도, 차근차근 해보니 풀림
// 다른 사람것도 봐야겠다
