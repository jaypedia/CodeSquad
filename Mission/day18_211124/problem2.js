/*
문제 2. 마우스 이동정보 기록
* 리스트 안에서 마우스를 이동할때마다 그 횟수를 기록한다.
* mousemove이벤트가 발생할때마다 기록하지 않고, 500ms 마다 한 번씩만 기록된다.
* 기록정보는 마우스가 움직일때마다 계속 업데이트 된다.
*/

const $listContainer = document.querySelector('.list-container');
const $list = document.querySelector('.list');
const $ul = document.querySelector('ul');
const $li = document.querySelectorAll('.fruits li');
const $fruitCount = document.querySelector('.fruit-count');

function listSetup(element) {
  let timeout;
  element.onmouseenter = function () {
    timeout = setTimeout(() => {
      $ul.classList.remove('invisible');
    }, 1000);
  };

  $listContainer.onmouseleave = function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      $ul.classList.add('invisible');
    }, 500);
  };

  const fruitCount = {
    grape: 0,
    apple: 0,
    orange: 0,
    banana: 0,
    kiwi: 0,
    strawberry: 0,
  };

  function countFunc(fruit) {
    switch (fruit) {
      case 'grape':
        fruitCount.grape += 1;
        break;
      case 'apple':
        fruitCount.apple += 1;
        break;
      case 'orange':
        fruitCount.orange += 1;
        break;
      case 'banana':
        fruitCount.banana += 1;
        break;
      case 'kiwi':
        fruitCount.kiwi += 1;
        break;
      case 'strawberry':
        fruitCount.strawberry += 1;
        break;
    }

    return fruitCount[fruit];
  }

  let timer;
  $ul.addEventListener('mousemove', e => {
    if (e.target.tagName === 'LI' && !timer) {
      timer = setTimeout(() => {
        timer = null;
        const fruit = e.target.textContent;
        countFunc(fruit);
        displayFruitsCount(fruit);
      }, 500);
    }
  });

  function displayFruitsCount(fruit) {
    const myFruit = $fruitCount.querySelector(`.${fruit}`);

    if (myFruit) {
      myFruit.innerHTML = `${fruit} : ${fruitCount[fruit]}`;
    } else {
      const newFruit = document.createElement('li');
      newFruit.classList.add(fruit);
      newFruit.innerHTML = `${fruit} : ${fruitCount[fruit]}`;
      $fruitCount.appendChild(newFruit);
    }
  }
}

document.addEventListener('DOMContentLoaded', listSetup($list));
