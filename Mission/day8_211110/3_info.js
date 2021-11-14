// 3. 배열 분석 정보를 출력한다.

// [접근 방법]
// 1. 빈 객체를 만들어놓는다.
const result = { type: 'root', child: [] };
const currentStack = [];
result.child.push(currentStack);
console.log(JSON.stringify(result, null, 2));

// Cannot understood
// const _stack = [];
// if (el.type === 'array') _stack.push(el);
// _stack[_stack.length - 1].child.push(el);

// 트리 자료구조?

function parseArray(data) {}
