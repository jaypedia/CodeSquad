// 도형의 넓이를 구하는 getArea 함수 구현
function getArea(command, a, b, h) {
  switch (command) {
    case 'circle':
      if (!b) {
        return Math.pow(a, 2) * Math.PI;
      } else {
        let area = 0;
        for (let i = 1; i <= b; i++) {
          area += Math.pow(i, 2) * Math.PI;
        }
        return area;
      }
    case 'rect':
      return a * b;
    case 'trapezoid':
      return ((a + b) * h) / 2;
    default:
      console.log('올바른 값을 입력해주세요.');
  }
}

console.log(getArea('circle', 10));
console.log(getArea('circle', 1, 5));
console.log(getArea('rect', 10, 5));
console.log(getArea('trapezoid', 5, 8, 3));
console.log(getArea('hello', 5, 8, 3));
