// From Marco
// Stack으로 접근하는 방법

const data1 = '[1, 2, [3, 4], [5], 6, [7, [8]]]'; //정상
const data2 = '[1, 2, [3, 4, [5, 6, [7, [8]]]]'; //대괄호 쌍 맞지 않음
const data3 = '][[1, 2, [3, 4, [5, 6, [7, [8]]]]]'; // 대괄호 쌍은 맞으나 닫는 괄호가 여는 괄호보다 앞에 나옴
const data4 = '[1, 2]'; //정상

//[v] 1. 요구사항 : 객체 분석 정보를 출력
// 원소의 개수를 이런 식으로 출력? 하는 방법은 생각하지 못헀다.
// 재귀로 풀어낸다는 것이 알아야 할 점이다.
function countElement(data) {
  let count = 0;
  const recur = data => {
    data.forEach(array => {
      if (typeof array !== 'object') {
        count++;
      } else {
        recur(array);
      }
    });
    return count;
  };
  return recur(data);
}

function getDepth(data) {
  let depth = 0;
  let dataArray = data.split('');
  while (dataArray.pop() === ']') {
    depth++;
  }
  return depth;
}

//[v] 2. 요구사항 : 괄호가 매칭에 문제가 있는 경우 오류내용을 출력한다.
function checkBrackets(data) {
  //'['과 ']'의 개수의 쌍 체크
  let bracketNumber = 0;
  for (const i of data) {
    if (i === '[') {
      bracketNumber++;
    }
    if (i === ']') {
      bracketNumber--;
    }
  }
  if (bracketNumber !== 0) {
    return 'case1';
  }

  //'['과 ']'의 개수의 쌍은 맞아도, '['보다 ']'이 먼저 나오는 잘못된 경우 체크
  let bracketArray = [];
  for (const i of data) {
    if (i === '[') {
      bracketArray.push('[');
    }
    if (i === ']') {
      if (bracketArray.length === 0) {
        return 'case2';
      }
      bracketArray.pop();
    }
  }

  return true;
}

//run함수 : 위 함수들을 모아서 실행해주는 함수
function run(data) {
  console.log('★TEST CASE : ', data);
  try {
    const nestedData = JSON.parse(data);
    const count = countElement(nestedData);
    const depth = getDepth(data);
    console.log(
      `배열의 중첩된 깊이 수준은 ${depth}이며, 총 ${count}개의 원소가 포함되어 있습니다.`
    );
  } catch {
    if (checkBrackets(data) === 'case1') {
      console.log('괄호의 개수가 일치하지 않습니다.');
    } else if (checkBrackets(data) === 'case2') {
      console.log('괄호 개폐 전에 여는 괄호보다 닫는 괄호가 앞에 왔습니다.');
    }
  }
}

run(data1);
run(data2);
run(data3);
run(data4);
