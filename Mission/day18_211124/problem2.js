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
        return (fruitCount.grape += 1);
      case 'apple':
        return (fruitCount.apple += 1);
      case 'orange':
        return (fruitCount.orange += 1);
      case 'banana':
        return (fruitCount.banana += 1);
      case 'kiwi':
        return (fruitCount.kiwi += 1);
      case 'strawberry':
        return (fruitCount.strawberry += 1);
    }
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
