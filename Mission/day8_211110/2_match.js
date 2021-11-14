// 2021-11-11
// 2. 괄호 개수 분석하기
// 괄호가 매칭에 문제가 있는 경우, 오류내용을 출력한다.

function solution(data) {
  const arr = data.split('');

  // 배열에서 특정 값 개수 구하는 방법들 : for, filter, reduce
  // reduce 내부에서 비교의 결과(true or false)를 숫자(1 or 0)으로 자동 형변환하여 cnt에 누적
  let open = arr.reduce((cnt, element) => cnt + ('[' === element), 0);
  let close = arr.reduce((cnt, element) => cnt + (']' === element), 0);

  if (open === close) return '괄호의 개수가 일치합니다.';
  else if (open > close) return '여는 괄호의 개수가 더 많습니다.';
  else if (open < close) return '닫는 괄호의 개수가 더 많습니다.';
}

const data1 = '[1,2,[3,4,[5,[6]]';
const data2 = '[1,2,[3,4,[5,[6]]]]]]';
const data3 = '[1,2,[3,4,[5,[6]]]]';

console.log(solution(data1));
console.log(solution(data2));
console.log(solution(data3));

// stack 이용
// 괄호가 ]으로 시작될 경우를 처리
