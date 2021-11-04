// 네 명의 학생에 대한 과목 점수
const grades = [
  [88, 76, 77],
  [33, 44, 44],
  [90, 100, 94],
  [30, 44, 98],
];

// 각 학생의 평균점수를 구하는 함수
function getAvg(grades) {
  let avg = [];
  let sum = 0;
  for (let i = 0; i < grades.length; i++) {
    for (let j = 0; j < 3; j++) {
      sum += grades[i][j];
    }
    avg.push(sum / 3);
  }
  return avg;
}

console.log(getAvg(grades));

// 모든 학생의 최고 점수의 평균 점수를 구하는 함수
function highestAvg(grades) {
  let sum = 0;
  for (let i = 0; i < grades.length; i++) {
    grades[i] = grades[i].sort((a, b) => b - a);
    sum += grades[i][0];
  }
  return sum / 4;
}

console.log(highestAvg(grades));
