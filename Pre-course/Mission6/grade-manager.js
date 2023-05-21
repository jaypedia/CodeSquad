const { studentsGrades, SNDT } = require('./data.js');

class GradeManager {
  constructor(grade) {
    this.grade = grade;
  }

  getMean() {
    const mean = this.grade.reduce((acc, cur) => acc + cur, 0) / this.grade.length;
    return mean.toFixed(2);
  }

  getDeviation() {
    const mean = this.getMean();
    const deviationArr = this.grade.map((v) => (v - mean).toFixed(2));
    return deviationArr;
  }

  getSumOfSquareOfDeviation() {
    const deviationArr = this.getDeviation();
    const SQUARE_NUM = 2;
    let sumOfsquareOfDeviation = deviationArr.reduce((a, b) => a + b ** SQUARE_NUM, 0);
    return sumOfsquareOfDeviation;
  }

  getVariance() {
    const variance = this.getSumOfSquareOfDeviation() / this.grade.length;
    return variance;
  }

  getStandardDeviation() {
    const standardDeviation = Math.sqrt(this.getVariance());
    return standardDeviation.toFixed(2);
  }

  getZScore(score) {
    const zScore = ((score - this.getMean()) / this.getStandardDeviation()).toFixed(2);
    return zScore;
  }

  getPercentage(score) {
    let zScore = this.getZScore(score);
    const INDEX_NUM = 10;

    const getRow = (zScore) => {
      return zScore.toString().slice(0, 3) * INDEX_NUM;
    };

    const getCol = (zScore) => {
      return zScore.toString().slice(-1);
    };

    if (zScore < 0) {
      zScore = Math.abs(zScore);
      return ((1 - SNDT[getRow(zScore)][getCol(zScore)]) * 100).toFixed(2);
    } else {
      return (SNDT[getRow(zScore)][getCol(zScore)] * 100).toFixed(2);
    }
  }

  getPercentageBetweenScores(score1, score2) {
    const percentageOfScore1 = this.getPercentage(score1);
    const percentageOfScore2 = this.getPercentage(score2);

    if (score1 < score2) return (percentageOfScore2 - percentageOfScore1).toFixed(2);
    else return (percentageOfScore1 - percentageOfScore2).toFixed(2);
  }
}

const grades = new GradeManager(studentsGrades);

function test(grades) {
  console.log(`
  ************************* TEST ****************************
  # 학생들의 평균 점수 : ${grades.getMean()}점
  # 점수의 편차 : ${grades.getDeviation()}
  # 점수의 표준편차 : ${grades.getStandardDeviation()}
  # 70의 Z-Score : ${grades.getZScore(70)}
  ***********************************************************
  # 70점 이하일 확률 : ${grades.getPercentage(70)}%
  # 80점 이하일 확률 : ${grades.getPercentage(80)}%
  # 70점과 80점 사이에 속할 확률 : ${grades.getPercentageBetweenScores(70, 80)}%
  ***********************************************************
  # 90점 이하일 확률 : ${grades.getPercentage(90)}%
  # 100점 이하일 확률 : ${grades.getPercentage(100)}%
  # 90점과 100점 사이에 속할 확률 : ${grades.getPercentageBetweenScores(90, 100)}%
  `);
}

test(grades);
