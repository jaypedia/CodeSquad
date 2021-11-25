const $listContainer = document.querySelector('.list-container');
const $list = document.querySelector('.list');
const $ul = document.querySelector('ul.fruits');
const $li = document.querySelectorAll('.fruits li');
const $fruitCount = document.querySelector('.fruit-count');

// *****  Show and hide fruits list
let timeout;
function showFruitsList() {
  timeout = setTimeout(() => {
    $ul.classList.remove('invisible');
  }, 1000);
}

function hideFruitsList() {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    $ul.classList.add('invisible');
  }, 500);
}

$list.addEventListener('mouseenter', showFruitsList);
$listContainer.addEventListener('mouseleave', hideFruitsList);

// **** Record the number of fruits
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
    createNewFruitElement(fruit);
  }
}

function createNewFruitElement(fruit) {
  const newFruit = document.createElement('li');
  newFruit.classList.add(fruit);
  newFruit.innerHTML = `${fruit} : ${fruitCounter[fruit]}`;
  $fruitCount.appendChild(newFruit);
}
