const $listContainer = document.querySelector('.list-container');
const $list = document.querySelector('.list');
const $ul = document.querySelector('ul');

function listSetup(element) {
  let timeout = null;
  element.onmouseover = function () {
    timeout = setTimeout(() => {
      $ul.classList.remove('invisible');
    }, 1000);
  };

  // $list의 범위를 벗어나게 되면 바로 $ul이 안보이게 됨
  //   element.onmouseleave = function () {
  //     clearTimeout(timeout);
  //     timeout = setTimeout(() => {
  //       $ul.classList.add('invisible');
  //     }, 500);
  //   };

  // $ul의 범위를 벗어나게 되면 $ul이 안보이게 됨
  // 그런데 커서를 $list의 밖으로 leave 하게 되는 경우에는 $ul이 사라지지 않음
  $ul.onmouseleave = function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      $ul.classList.add('invisible');
    }, 500);
  };
}

// DOMContentLoaded : 브라우저가 HTML을 전부 읽고 DOM 트리를 완성하는 즉시 발생
// 이미지 파일(<img>)이나 스타일시트 등의 기타 자원은 기다리지 않음
// DOM이 준비된 것을 확인한 후 원하는 DOM 노드를 찾아 핸들러를 등록해 인터페이스를 초기화할 때 활용
document.addEventListener('DOMContentLoaded', listSetup($list));

// mouseover
// mouseenter
// mousemove
