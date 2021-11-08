// Array의 reduce 메서드처럼 동작하는 myReduce 메서드 만들기

const arr = [1, 2, 3, 4, 5];

const myReduce = (arr, callback, initialValue) => {
  let result = initialValue;
  for (value of arr) {
    result = callback(result, value);
  }
  return result;
};

const sum = (prev, next) => prev + next;
const multiply = (prev, next) => prev * next;

// test
const answer1 = myReduce(arr, sum, 0);
console.log(answer1);

const answer2 = myReduce(arr, multiply, 1);
console.log(answer2);
