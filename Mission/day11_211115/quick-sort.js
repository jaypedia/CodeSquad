// Quick sort Algorithm
// 2021-11-17
// https://morioh.com/p/b0deaa623ac4 사이트 도식 참고

function quickSort(arr) {
  // 배열의 길이가 1보다 작거나 같으면 정렬할 필요가 없으므로 바로 리턴
  if (arr.length <= 1) return arr;

  // 배열의 맨 왼쪽 요소를 pivot으로 설정
  // 맨 끝 요소를 pivot으로 설정한다면 arr[arr.length - 1]
  // for문의 조건을 let i = 0; i < arr.length - 1; i++으로 바꿔 주면 된다.
  const pivot = arr[0];
  console.log('PIVOT', pivot);

  // Partitioning
  const left = [];
  const right = [];

  // 뽑은 pivot을 기준으로, arr을 돌면서 pivot보다 arr의 요소가 작으면 완쪽으로
  // pivot보다 arr의 요소가 크면 오른쪽으로
  // pivot과 같다면 어느 쪽으로 가든지 상관 없음
  // pivot의 인덱스가 0이었으니 for문은 그 다음 요소부터 돌려야 하므로 i = 1부터 돌린다.
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) left.push(arr[i]);
    else right.push(arr[i]);
  }

  console.log('LEFT', left);
  console.log('RIGHT', right);

  // 재귀함수
  // left 배열을 quickSort 함수의 파라미터로 전달
  // right 배열 역시 quickSort 함수의 파라미터로 전달
  // 모든 배열이 정렬될 때까지 왼쪽과 오른쪽을 각각 반복한다.
  // 배열을 계속 쪼개서(Divide and Conquer) 배열의 요소가 0개나 1개가 되어서 그걸 반환할 때까지.
  // left - pivot - right 를 연결
  return quickSort(left).concat(pivot, quickSort(right));
}

function testCase() {
  const data = [5, 10, 8, 4, 8, 9, 3, 6];
  console.log(data);
  console.log(quickSort(data));
}
testCase();
