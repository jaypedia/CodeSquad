// List
const $newListForm = document.querySelector('[data-new-list-form]');
const $newListInput = document.querySelector('[data-new-list-input]');
const $newListBtn = document.querySelector('[data-new-list-button]');
const $taskList = document.querySelector('[data-lists]');

// Task
const $newTaskForm = document.querySelector('[data-new-task-form]');
const $newTaskBtn = document.querySelector('[data-new-task-button]');
const $newTaskInput = document.querySelector('[data-new-task-input]');
const $todoList = document.querySelector('[data-todo-list]');

// Date
const $month = document.querySelector('.month');
const $date = document.querySelector('.date');
const $day = document.querySelector('.day');

// Button
const $deleteListBtn = document.querySelector('[data-delete-list-button]');

// Local Storage Key
const LOCAL_STORAGE_LIST_KEY = 'task.lists';
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'selected.selectedListId';
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);

function paintDate() {
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

function render() {
  clearElement($taskList);
  lists.forEach(list => {
    const listElement = document.createElement('li');
    listElement.dataset.listId = list.id;
    listElement.classList.add('list-name');
    listElement.textContent = list.name;
    if (list.id === Number(selectedListId)) {
      listElement.classList.add('active-list');
    }
    $taskList.appendChild(listElement);
  });
}

function save() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
  localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId);
}

function saveAndRender() {
  save();
  render();
}

render();

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function addListHandler(e) {
  e.preventDefault();
  const newListName = $newListInput.value;
  if (newListName === null || newListName === '') return;
  const list = createList(newListName);
  $newListInput.value = '';
  lists.push(list);
  saveAndRender();
  $newListInput.focus();
}

function createList(newListName) {
  return { id: Date.now(), name: newListName, tasks: [] };
}

function selectTaskHandler(e) {
  if (e.target.tagName === 'LI') {
    selectedListId = e.target.dataset.listId;
  }
  saveAndRender();
}

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

function deleteListHandler() {
  localStorage.removeItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);
  lists = lists.filter(list => list.id !== Number(selectedListId));
  selectedListId = null;
  saveAndRender();
}

$newListForm.addEventListener('submit', addListHandler);
$newTaskForm.addEventListener('submit', addTaskHandler);
$newTaskBtn.addEventListener('click', addTaskHandler);
$taskList.addEventListener('click', selectTaskHandler);
$deleteListBtn.addEventListener('click', deleteListHandler);
