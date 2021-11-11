// [Mission] 괄호문법 검사기
// 배열 모양의 문자열을 파싱하기

// 1. 모든 숫자는 배열의 모양에 따라 괄호('[]')에 의해 감싸져 있다.
// 2. 괄호는 중첩되서 표현되며, 무한대로 될 수 있다.

// 요구사항 : 객체 분석 정보를 출력하기
// 배열의 중첩된 깊이를 분석하고, 원소의 개수를 출력한다.

const data1 = '[1,2, [3,4], [5], [6,[7,[8]]]]'; // depth 4
const data2 = '[1,2,[3,4,[5,6],7,[8,[9,91]],10],11,12]'; // depth 3
const data3 = '[1,2,[3,4,[5,[6]]]]'; // depth 4
const data4 = '[1,2,[3,4,[5,6]]]'; // depth 3

// 💨💨💨 Get array's depth

// ⭐⭐⭐ My solution
// join('')이 아닌 JSON.stringify()를 사용해서 비교해야 한다.
// flat의 횟수 + 1 === 배열의 중첩된 깊이
function getArrayDepth(data) {
  const array = JSON.parse(data);
  console.log('💨💨💨Start : ', array);

  for (let i = 1; ; i++) {
    console.log(array.flat(i), array.flat(Infinity));

    if (JSON.stringify(array.flat(i)) === JSON.stringify(array.flat(Infinity)))
      return i + 1;

    // if (array.flat(i).join('') === array.flat(Infinity).join('')) return i;
  }
}
console.log('1st way : ', getArrayDepth(data1));

// ⭐⭐⭐ Recursive approach 1
let count = 1;
function getArrayDepth2(data) {
  const array = JSON.parse(data);
  const ingArr = JSON.stringify(array.flat(1));
  const flatArr = JSON.stringify(array.flat(Infinity));
  count++;

  return ingArr === flatArr ? count : getArrayDepth2(ingArr);
}

console.log('2nd way : ', getArrayDepth2(data4));

// ⭐⭐⭐ Recursive approach 2 (Unsolved)
// If the current item is an Array, determine the max depth of its children and add 1.
function getArrayDepth3(data) {
  const arr = JSON.parse(data);
  return Array.isArray(arr) ? 1 + Math.max(...arr.map(getArrayDepth3)) : 0;
}
console.log('3rd way : ', getArrayDepth3(data4)); // Uncaught SyntaxError: Unexpected token , in JSON at position 1

// ⭐⭐⭐ The number of the array elements
function getNumberOfArray(data) {
  return data.split(',').length;
}
console.log('elementsNum : ', getNumberOfArray(data2));
