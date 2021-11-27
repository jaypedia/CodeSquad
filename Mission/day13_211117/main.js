const $ = selector => document.querySelector(selector);
const CLASSNAME = {
  EDIT_BUTTON: 'edit-button',
  EDIT_FIN_BUTTON: 'edit-finish-button',
  HIDDEN: 'hidden',
  LIST_NAME: 'list-name',
  ACTIVE_LIST: 'active-list',
};

const $taskList = $('[data-lists]');
const $newListForm = $('[data-new-list-form]');
const $newListInput = $('[data-new-list-input]');
const $newListBtn = $('[data-new-list-button]');
const $deleteListBtn = $('[data-delete-list-button]');

const $main = $('[data-main]');
const $taskCount = $('[data-task-count]');
const $todoList = $('[data-todo-list]');
const $newTaskForm = $('[data-new-task-form]');
const $newTaskInput = $('[data-new-task-input]');
const $newTaskBtn = $('[data-new-task-button]');
const $taskTemplate = $('#task-template');
const $clearTaskBtn = $('[data-clear-complete-tasks-button]');

const $month = $('.month');
const $date = $('.date');
const $day = $('.day');
const $time = $('.time');

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
    $taskCount.classList.remove('invisible');
    $todoList.classList.remove('invisible');
    renderTaskCount(selectedList);
    clearElement($todoList);
    renderTask(selectedList);
  } else {
    $taskCount.classList.add('invisible');
    $todoList.classList.add('invisible');
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
    listElement.classList.add(CLASSNAME.LIST_NAME);
    listElement.textContent = list.name;
    if (list.id === Number(selectedListId)) {
      listElement.classList.add(CLASSNAME.ACTIVE_LIST);
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
    const $taskName = taskElement.querySelector('.task-name');
    const $deleteTaskBtn = taskElement.querySelector(
      '[data-delete-task-button]'
    );
    const $modifyTaskBtn = taskElement.querySelector(
      '[data-modify-task-button]'
    );
    const $modifyForm = taskElement.querySelector('[data-modify-form]');
    const $modifyTaskInput = taskElement.querySelector(
      '[data-modify-task-input]'
    );
    let newInput = task.name;

    setAttribuesToTask({
      task,
      $checkbox,
      $label,
      $taskName,
      $deleteTaskBtn,
      $modifyTaskBtn,
      $modifyForm,
    });

    $deleteTaskBtn.addEventListener('click', deleteTaskHandler);

    $modifyTaskBtn.addEventListener('click', e => {
      if (e.target.className.includes(CLASSNAME.EDIT_BUTTON)) {
        editHandler({
          $modifyForm,
          $taskName,
          $modifyTaskInput,
          $modifyTaskBtn,
          task,
        });
        $modifyTaskInput.focus();
      } else if (e.target.className.includes(CLASSNAME.EDIT_FIN_BUTTON)) {
        // span을 button 태그로 바꾸고 이부분 return으로 바꾸기
        editFinishHandler({ $modifyForm, $taskName, $modifyTaskBtn });
        modifyTaskHandler(e, newInput);
        render();
      }
    });

    $modifyForm.addEventListener('submit', e => {
      e.preventDefault();
      editFinishHandler({ $modifyForm, $taskName, $modifyTaskBtn });
      modifyTaskHandler(e, newInput);
      render();
    });

    $modifyTaskInput.addEventListener('input', e => {
      newInput = e.target.value;
    });

    $todoList.appendChild(taskElement);
    //  taskElement.scrollIntoView({ block: 'center', behavior: 'smooth' });
  });
}

function setAttribuesToTask({
  task,
  $checkbox,
  $label,
  $taskName,
  $deleteTaskBtn,
  $modifyTaskBtn,
  $modifyForm,
}) {
  const { id, complete, name } = task;
  $checkbox.id = id;
  $checkbox.checked = complete;
  $label.htmlFor = id;
  $taskName.innerHTML = name;
  $deleteTaskBtn.id = id;
  $modifyTaskBtn.id = id;
  $modifyForm.id = id;
  $modifyForm.classList = CLASSNAME.HIDDEN;
}

function editHandler({
  $modifyForm,
  $taskName,
  $modifyTaskInput,
  $modifyTaskBtn,
  task,
}) {
  $modifyForm.classList.remove(CLASSNAME.HIDDEN);
  $taskName.classList.add(CLASSNAME.HIDDEN);
  $modifyTaskInput.value = task.name;
  $modifyTaskBtn.classList.remove(CLASSNAME.EDIT_BUTTON);
  $modifyTaskBtn.classList.add(CLASSNAME.EDIT_FIN_BUTTON);
  return;
}

function editFinishHandler({ $modifyForm, $taskName, $modifyTaskBtn }) {
  $modifyForm.classList.add(CLASSNAME.HIDDEN);
  $taskName.classList.remove(CLASSNAME.HIDDEN);
  $modifyTaskBtn.classList.add(CLASSNAME.EDIT_BUTTON);
  $modifyTaskBtn.classList.remove(CLASSNAME.EDIT_FIN_BUTTON);
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
  if (e.target.tagName === 'INPUT' && e.target.type === 'checkbox') {
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

function modifyTaskHandler(e, newInput) {
  const selectedList = lists.find(list => list.id === +selectedListId);
  selectedList.tasks.map(task => {
    if (task.id === +e.target.id) {
      task.name = newInput;
      save();
    }
  });
}

$newListForm.addEventListener('submit', addListHandler);
$newListBtn.addEventListener('click', addListHandler);
$newTaskForm.addEventListener('submit', addTaskHandler);
$newTaskBtn.addEventListener('click', addTaskHandler);

$taskList.addEventListener('click', selectListHandler);
$deleteListBtn.addEventListener('click', deleteListHandler);
$todoList.addEventListener('click', taskCountHandler);
$clearTaskBtn.addEventListener('click', clearTaskHander);
