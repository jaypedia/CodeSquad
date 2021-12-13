// 1. factorial function
/*
임의의 숫자 m 을 입력받아 1부터 m까지의 factorial 값을 배열로 담아 반환하는 함수
*/

// [방법 1] array method 활용
function solution(n) {
  let arr = [];
  // 이차원 배열 만들기
  for (let i = 1; i <= n; i++) {
    arr.push(
      Array.from({ length: i })
        .fill(1)
        .map((item, index) => item * index + 1)
    );
  }

  // arr = [ [ 1 ], [ 1, 1 ], [ 1, 1, 1 ], [ 1, 1, 1, 1 ] ] // fill(1)
  // arr = [ [ 1 ], [ 1, 2 ], [ 1, 2, 3 ], [ 1, 2, 3, 4 ] ] // map 적용했을때

  let answer = [];
  for (let i = 0; i < arr.length; i++) {
    answer.push(multiply(arr[i]));
  }
  return answer;
}

// 배열의 모든 원소의 곱을 구하는 함수
function multiply(arr) {
  let pro = 1;
  for (let i = 0; i < arr.length; i++) {
    pro = pro * arr[i];
  }
  return pro;
}

console.log(solution(4)); // [ 1, 2, 6, 24 ]

// [방법 2] 재귀함수의 활용 (By Hemudi) 2021.12.13
function calculate_sol(maxValue) {
  let resultArr = [];

  factorial(resultArr, maxValue);

  return resultArr;
}

function factorial(resultArr, currentNum) {
  if (currentNum === 1) {
    resultArr.push(1);
    return 1;
  }

  let currentValue = currentNum * factorial(resultArr, currentNum - 1);
  resultArr.push(currentValue);

  return currentValue;
}

console.log(calculate_sol(4));
