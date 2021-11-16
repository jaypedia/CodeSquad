// 성적관리 프로그램 : 데이터 분석하고 다시 표현하기

class GradeManagement {
  constructor(grade) {
    this.grade = grade;
  }

  // 평균
  getMean() {
    const mean =
      this.grade.reduce((acc, cur) => acc + cur, 0) / this.grade.length;
    return mean.toFixed(2);
  }

  // 편차(deviation) : 변량 - 평균, 각 변량들이 평균에서 얼마나 떨어져 있는지 알려주는 지표
  // 편차의 제곱의 합
  getSumofSquareOfDeviation() {
    const m = this.getMean();

    /*
    for (let i = 0; i < this.grade.length; i++) {
      sumOfsquareOfDeviation += (this.grade[i] - m) ** 2;
    }
    */

    let sumOfsquareOfDeviation = this.grade.reduce(
      (a, b) => a + (b - m) ** 2,
      0
    );

    return sumOfsquareOfDeviation;
  }

  // 분산(variance) : 편차의 제곱의 평균 (편차의 합이 0이 되지 않도록 대안으로 편차를 제곱함)
  getVariance() {
    const ssd = this.getSumofSquareOfDeviation();
    const variance = ssd / this.grade.length;
    return variance;
  }

  // 표준편차(standard deviation) : 분산에 루트를 씌운 값
  getStandardDeviation() {
    const v = this.getVariance();
    const sd = Math.sqrt(v);
    return sd.toFixed(2);
  }

  // Z-Score : 평균이 0이고 표준편차가 1인 정규분포의 확률변수, 평균값에서 표준편차의 몇 배 정도 떨어져 있다는 것을 평가하는 수치
  // Z-score를 가지고 표준정규분포표를 참조하여 비율을 구한다.
  getZScore(score1, score2) {
    const m = this.getMean();
    const s = this.getStandardDeviation();
    const z1 = ((score1 - m) / s).toFixed(2);
    const z2 = ((score2 - m) / s).toFixed(2);
    return `z1 [${z1}], z2 [${z2}]`;
  }
}

const studentsGrades = [
  89.23, 82.03, 71.56, 78.82, 85.05, 84.44, 67.53, 71.7, 77.97, 73.77, 84.25,
  67.01, 73.78, 64.19, 89.89, 90.32, 73.21, 75.35, 83.22, 74.01,
];
const grades = new GradeManagement(studentsGrades);

function manageGrade(grades) {
  console.log(`# 학생들의 평균 점수 : ${grades.getMean()}`);
  console.log(`# 점수의 표준편차 : ${grades.getStandardDeviation()}`);
  console.log(`# Z-Score : ${grades.getZScore(70, 80)}`);
}

console.log(manageGrade(grades));
