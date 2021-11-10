// 네 명의 학생에 대한 과목 점수
const grades = [
  [88, 76, 77],
  [33, 44, 44],
  [90, 100, 94],
  [30, 44, 98, 10, 50],
];

// 각 학생의 평균점수를 구하는 함수
function getAvg(grades) {
  const avg = [];
  let sum = 0;
  for (let i = 0; i < grades.length; i++) {
    for (let j = 0; j < grades[i].length; j++) {
      sum += grades[i][j];
    }
    avg.push(sum / grades[i].length);
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
  return sum / grades.length;
}

console.log(highestAvg(grades));
