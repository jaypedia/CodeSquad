// 1. getArea 함수 : 도형의 넓이 구하기
function getArea(command, a, b, h) {
  switch (command) {
    case 'circle':
      if (!b) {
        return a * a * 3.14;
      } else {
        let area = 0;
        for (let i = 1; i <= b; i++) {
          area += i * i * 3.14;
        }
        return area;
      }
    case 'rect':
      return a * b;
    case 'trapezoid':
      return a + b * 0.5 * h;
  }
}

console.log(getArea('circle', 10));
console.log(getArea('circle', 1, 5));
console.log(getArea('rect', 10, 5));
console.log(getArea('trapezoid', 5, 8, 3));

// 2. logging : 프로그램의 수행 과정이나 결과를 기록하는 것
// 지금까지 호출된 함수가 무엇인지 알려주는 함수

// 3. 함수의 수행순서와 함수의 결과를 순서대로 함께 출력
