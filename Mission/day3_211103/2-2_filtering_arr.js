// 2-2. 배열 거르기
// 1) 특수기호가 있는 아이디 제외
// 2) 아이디에서 숫자 제거

// 특수문자 포함 여부를 알아내, 특수문자가 있는 요소를 제거하는 함수
function checkSpecial(arr) {
  let answer = [];
  const special_pattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
  for (let i = 0; i < arr.length; i++) {
    if (special_pattern.test(arr[i]) === false) {
      answer.push(arr[i]);
    }
  }
  return answer;
}

// 숫자를 제거할 수 있는 함수
function removeNum(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].replace(/[0-9]/g, '');
  }
  return arr;
}

function solution(arr) {
  let answer = [];
  const special_pattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
  for (let i = 0; i < arr.length; i++) {
    if (special_pattern.test(arr[i]) === false) {
      answer.push(arr[i]);
    }
  }
  for (let i = 0; i < answer.length; i++) {
    answer[i] = answer[i].replace(/[0-9]/g, '');
  }
  return answer;
}

const people = [
  'ww66',
  'd&sd56',
  'honux5',
  'sarah#',
  'hea3d',
  'zello',
  '5lucas',
];
console.log(solution(people)); // [ 'ww', 'honux', 'head', 'zello', 'lucas' ]
