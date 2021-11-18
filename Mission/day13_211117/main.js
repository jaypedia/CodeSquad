// List
const $newListForm = document.querySelector('form[data-new-list-form]');
const $newListInput = document.querySelector('input[data-new-list-input]');
const $newListBtn = document.querySelector('.btn.create.aside');
const $taskList = document.querySelector('.task-list');

// Task
const $newTaskForm = document.querySelector('form[data-new-task-form]');
const $newTaskBtn = document.querySelector('.btn.create.main');
const $newTaskInput = document.querySelector('input[data-new-task-input]');
const $todoList = document.querySelector('.todo-list');

function paintDate() {
  const $month = document.querySelector('.month');
  const $date = document.querySelector('.date');
  const $day = document.querySelector('.day');
  const today = new Date();
  const dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  $month.textContent = monthNames[today.getMonth()];
  $date.textContent = today.getDate();
  $day.textContent = dayNames[today.getDay()];
}

paintDate();

// List
function addListHandler(e) {
  e.preventDefault();
  const newListName = $newListInput.value;
  createList(newListName);
  $newListInput.value = '';
  $newListInput.focus();
}

function createList(newListName) {
  const newList = document.createElement('li');
  newList.setAttribute('class', 'list-name');
  newList.textContent = newListName;
  $taskList.appendChild(newList);
}

// Task
function addTaskHandler(e) {
  e.preventDefault();
  const newTaskName = $newTaskInput.value;
  createTask(newTaskName);
  $newTaskInput.value = '';
  $newTaskInput.focus();
}

function createTask(newTaskName) {
  const newTask = document.createElement('div');
  newTask.setAttribute('class', 'task');
  newTask.innerHTML = `
  <input type="checkbox" id="task4" />
  <label for="task4">
    <span class="custom-checkbox"></span>
    ${newTaskName}
  </label>`;

  $todoList.appendChild(newTask);
}

$newListForm.addEventListener('submit', addListHandler);
$newTaskForm.addEventListener('submit', addTaskHandler);
$newTaskBtn.addEventListener('click', addTaskHandler);
