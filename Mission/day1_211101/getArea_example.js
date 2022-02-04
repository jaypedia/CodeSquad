// 비어 있는 배열 - 로깅을 위한 것들
const logArr = []; // 도형의 이름이 푸쉬되어 있는 배열
const logRes = []; // 도형의 넓이가 푸쉬되어 있는 배열

// 로깅
const printExecutionSequence = () => {
  let log = '';
  log = logArr
    .map((_, i) => `${logArr[i]} ${logRes[i]}`)
    .reduce((a, b) => `${a} / ${b}`, log); // log : initial value
  console.log(log);
};

// 각 도형의 넓이를 구하는 함수마다 호출
// 도형의 이름과 넓이를 전달받아 각각 logArr, logRes에 푸시함
const logExecution = (polygonName, polygonArea) => {
  logArr.push(polygonName);
  logRes.push(polygonArea);
};

// 원의 넓이를 구하는 함수
const getCircleArea = r => {
  let area = 0;
  area = Math.pow(r, 2) * Math.PI;
  logExecution('circle', area);
  return area;
};

// 원의 넓이의 합을 구하는 함수
const getTotalCircleArea = (n, area = 0) => {
  if (n === 0) {
    logExecution('circle', area);
    return area;
  }
  return getTotalCircleArea(n - 1, (area += Math.pow(n, 2) * Math.PI));
};

// 직사각형의 넓이를 구하는 함수
const getRectArea = (w, h) => {
  let area = 0;
  area = w * h;
  logExecution('rect', area);
  return area;
};

// 사다리꼴의 넓이를 구하는 함수
const getTrapezoidArea = (a, b, h) => {
  let area = 0;
  area = ((a + b) * h) / 2;
  logExecution('trapezoid', area);
  return area;
};

// Rest Parameter의 사용 : 배열 타입으로 매개변수들이 입력된다.
// 함수 안에서 함수를 호출하는 형태임.
const getArea = (polygon, ...params) => {
  let area = 0;
  switch (polygon) {
    case 'circle':
      area =
        2 === params.length
          ? getTotalCircleArea(params[1])
          : getCircleArea(params[0]);
      break;
    case 'rect':
      area = getRectArea(...params);
      break;
    case 'trapezoid':
      area = getTrapezoidArea(...params);
      break;
    default:
      console.log('Incorrect Parameters');
  }
  return area;
};

console.log(getArea('circle', 1, 3));
console.log(getArea('circle', 3));
console.log(getArea('rect', 3, 4));
console.log(getArea('trapezoid', 1, 2, 8));
console.log(getArea('hello', 1, 2, 8));
printExecutionSequence();
