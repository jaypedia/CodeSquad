// [Mission] 괄호문법 검사기
// 배열 모양의 문자열을 파싱하기

// 1. 모든 숫자는 배열의 모양에 따라 괄호('[]')에 의해 감싸져 있다.
// 2. 괄호는 중첩되서 표현되며, 무한대로 될 수 있다.

// 요구사항 : 객체 분석 정보를 출력하기
// 배열의 중첩된 깊이를 분석하고, 원소의 개수를 출력한다.
const data1 = '[1,2, [3,4], [5], [6,[7,[8]]]]';
const data2 = '[1,2,[3,4,[5,6],7,[8,[9,91]],10],11,12]';
const data3 = '[1,2,[3,4,[5,[6]]]]';

// Get array's depth
const array = JSON.parse(data3);
console.log(array);

function getArrayDepth(data) {
  for (let i = 1; i < 3; i++) {
    console.log(array.flat(i));
    // if (JSON.stringify(array.flat(i)) === JSON.stringify(array.flat(Infinity)))
    //   return i;
    if (array.flat(i).join('') === array.flat(Infinity).join('')) return i;
  }
}
console.log(getArrayDepth(data3));

// Recursive approach
// If the current item is an Array, determine the max depth of its children and add 1.
function getArrayDepth(data) {
  const arr = JSON.parse(data);
  return Array.isArray(arr) ? 1 + Math.max(...arr.map(getArrayDepth)) : 0;
}
console.log(getArrayDepth(data1));

// Recursive approach 2

// The number of the array elements
function getNumberOfArray(data) {
  return data.split(',').length;
}
console.log('elementsNum : ', getNumberOfArray(data2));
