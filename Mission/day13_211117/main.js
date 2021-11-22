// List
const $taskList = document.querySelector('[data-lists]');
const $newListForm = document.querySelector('[data-new-list-form]');
const $newListInput = document.querySelector('[data-new-list-input]');
const $newListBtn = document.querySelector('[data-new-list-button]');
const $deleteListBtn = document.querySelector('[data-delete-list-button]');

// Task
const $taskCount = document.querySelector('[data-task-count]');
const $todoList = document.querySelector('[data-todo-list]');
const $newTaskForm = document.querySelector('[data-new-task-form]');
const $newTaskInput = document.querySelector('[data-new-task-input]');
const $newTaskBtn = document.querySelector('[data-new-task-button]');
const $taskTemplate = document.getElementById('task-template');
const $clearTaskBtn = document.querySelector(
  '[data-clear-complete-tasks-button]'
);

// Date
const $month = document.querySelector('.month');
const $date = document.querySelector('.date');
const $day = document.querySelector('.day');
const $time = document.querySelector('.time');

// Local Storage
const LOCAL_STORAGE_LIST_KEY = 'task.lists';
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'selected.selectedListId';
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);

function displayDateTime() {
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

  const hour = today.getHours().toString().padStart(2, '0');
  const minute = today.getMinutes().toString().padStart(2, '0');
  const second = today.getSeconds().toString().padStart(2, '0');
  $time.innerHTML = `${hour}:${minute}:${second}`;
}

displayDateTime();
setInterval(displayDateTime, 1000);

function render() {
  clearElement($taskList);
  renderList();

  const selectedList = lists.find(list => list.id === +selectedListId);
  if (selectedListId) {
    $taskCount.style.display = '';
    $todoList.style.display = '';
    renderTaskCount(selectedList);
    clearElement($todoList);
    renderTask(selectedList);
  } else {
    $taskCount.style.display = 'none';
    $todoList.style.display = 'none';
  }
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function renderList() {
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

function renderTaskCount(selectedList) {
  const incompleteTasksCount = selectedList.tasks.filter(
    task => task.complete === false
  ).length;
  const taskString = incompleteTasksCount === 1 ? 'task' : 'tasks';
  $taskCount.textContent = `${incompleteTasksCount} ${taskString} remaining`;
}

function renderTask(selectedList) {
  selectedList.tasks.forEach(task => {
    const taskElement = document.importNode($taskTemplate.content, true);
    const $checkbox = taskElement.querySelector('input');
    const $label = taskElement.querySelector('label');
    const $deleteTaskBtn = taskElement.querySelector(
      '[data-delete-task-button]'
    );
    $checkbox.id = task.id;
    $checkbox.checked = task.complete;
    $label.htmlFor = task.id;
    $label.append(task.name);
    $deleteTaskBtn.id = task.id;
    $deleteTaskBtn.addEventListener('click', deleteTaskHandler);

    $todoList.appendChild(taskElement);
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

function createList(newListName) {
  return {
    id: Date.now(),
    name: newListName,
    tasks: [],
  };
}

function createTask(newTaskName) {
  return { id: Date.now(), name: newTaskName, complete: false };
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

function selectListHandler(e) {
  if (e.target.tagName === 'LI') {
    selectedListId = e.target.dataset.listId;
  }
  saveAndRender();
}

function addTaskHandler(e) {
  e.preventDefault();
  const newTaskName = $newTaskInput.value;
  if (newTaskName === null || newTaskName === '') return;
  const task = createTask(newTaskName);
  $newTaskInput.value = '';
  const selectedList = lists.find(list => list.id === +selectedListId);
  selectedList.tasks.push(task);
  saveAndRender();
  $newTaskInput.focus();
}

function deleteListHandler() {
  localStorage.removeItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);
  lists = lists.filter(list => list.id !== Number(selectedListId));
  selectedListId = null;
  saveAndRender();
}

function taskCountHandler(e) {
  if (e.target.tagName === 'INPUT') {
    const selectedList = lists.find(list => list.id === +selectedListId);
    const checkedTask = selectedList.tasks.find(
      task => task.id === +e.target.id
    );
    checkedTask.complete = e.target.checked;
    renderTaskCount(selectedList);
    save();
  }
}

function clearTaskHander() {
  const selectedList = lists.find(list => list.id === +selectedListId);
  selectedList.tasks = selectedList.tasks.filter(
    task => task.complete === false
  );
  saveAndRender();
}

function deleteTaskHandler(e) {
  const selectedList = lists.find(list => list.id === +selectedListId);
  selectedList.tasks = selectedList.tasks.filter(
    task => task.id !== +e.target.id
  );
  saveAndRender();
}

$newListForm.addEventListener('submit', addListHandler);
$newListBtn.addEventListener('click', addListHandler);
$newTaskForm.addEventListener('submit', addTaskHandler);
$newTaskBtn.addEventListener('click', addTaskHandler);

$taskList.addEventListener('click', selectListHandler);
$deleteListBtn.addEventListener('click', deleteListHandler);
$todoList.addEventListener('click', taskCountHandler);
$clearTaskBtn.addEventListener('click', clearTaskHander);
