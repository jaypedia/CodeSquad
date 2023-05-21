# Mission 6. 성적 관리 프로그램

## Description

- 주어진 데이터를 분석하고 다시 표현합니다.
- 학생들의 점수 통계를 가지고 데이터의 분포를 확인할 수 있는 프로그램을 만듭니다.
- 함수는 역할이 명확하고 재사용 가능한 형태로 만듭니다.

## Result

```js
class GradeManager {
  constructor(grade) {
    this.grade = grade;
  }

  // 1. 평균
  getMean() {}

  // 2. 편차
  getDeviation() {}

  // 3. 편차의 제곱의 합
  getSumOfSquareOfDeviation() {}

  // 4. 분산
  getVariance() {}

  // 5. 표준편차
  getStandardDeviation() {}

  // 6. z-score
  getZScore(score) {}

  // 7. 확률
  getPercentage(score) {}

  // 8. 두 정수 사이에 속할 확률
  getPercentageBetweenScores(score1, score2) {}
}
```
