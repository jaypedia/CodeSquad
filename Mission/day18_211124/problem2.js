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

  const fruitCounter = {};

  let timer;
  $ul.addEventListener('mousemove', e => {
    if (e.target.tagName === 'LI' && !timer) {
      timer = setTimeout(() => {
        timer = null;
        const fruit = e.target.textContent;
        displayFruitsCount(fruit);
      }, 500);
    }
  });

  function displayFruitsCount(fruit) {
    const myFruit = $fruitCount.querySelector(`.${fruit}`);

    if (myFruit) {
      fruitCounter[fruit]++;
      myFruit.innerHTML = `${fruit} : ${fruitCounter[fruit]}`;
    } else {
      fruitCounter[fruit] = 1;
      const newFruit = document.createElement('li');
      newFruit.classList.add(fruit);
      newFruit.innerHTML = `${fruit} : ${fruitCounter[fruit]}`;
      $fruitCount.appendChild(newFruit);
    }
  }
}

document.addEventListener('DOMContentLoaded', listSetup($list));
