// 1. factorial function
function solution(n) {
  let arr = [];
  for (let i = 1; i <= n; i++) {
    arr.push(
      Array.from({ length: i })
        .fill(1)
        .map((item, index) => item * index + 1)
    );
  }

  // arr = [ [ 1 ], [ 1, 2 ], [ 1, 2, 3 ], [ 1, 2, 3, 4 ] ]

  let answer = [];
  for (let i = 0; i < arr.length; i++) {
    answer.push(multiply(arr[i]));
  }
  return answer;
}

// Method to calculate the product of the array
function multiply(arr) {
  let pro = 1;
  for (let i = 0; i < arr.length; i++) {
    pro = pro * arr[i];
  }
  return pro;
}

console.log(solution(4)); // [ 1, 2, 6, 24 ]
