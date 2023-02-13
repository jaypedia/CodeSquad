// 각 학생들의 평균 점수를 구하는 함수
const calcAverage = (grades) => {
  return grades.reduce((acc, cur) => {
    const sum = cur.reduce((acc, cur) => acc + cur, 0);
    acc.push(sum / cur.length);
    return acc;
  }, []);
};

// 각 학생 별 최고 점수의 평균 점수를 구하는 함수
const calcHighestAverage = (grades) => {
  const sum = grades.reduce((acc, cur) => {
    const max = Math.max(...cur);
    acc += max;
    return acc;
  }, 0);
  return sum / grades.length;
};

const test = () => {
  const grades = [
    [88, 76, 77],
    [33, 44, 44],
    [90, 100, 94],
    [30, 44, 98, 10, 50],
  ];
  console.log(calcAverage(grades));
  console.log(calcHighestAverage(grades));
};

test();
