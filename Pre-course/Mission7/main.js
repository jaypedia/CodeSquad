const $ = (selector) => document.querySelector(selector);
const CLASSNAME = {
  EDIT_BUTTON: 'edit-button',
  EDIT_FIN_BUTTON: 'edit-finish-button',
  HIDDEN: 'hidden',
  LIST_NAME: 'list-name',
  ACTIVE_LIST: 'active-list',
};
const PROGRSSBAR_MARGIN = 2;

const $taskList = $('[data-lists]');
const $newListForm = $('[data-new-list-form]');
const $newListInput = $('[data-new-list-input]');
const $newListBtn = $('[data-new-list-button]');
const $taskSettingBtn = $('[data-task-setting-button]');
const $listSettingBtn = $('[data-list-setting-button]');

const $main = $('[data-main]');
const $taskCount = $('[data-task-count]');
const $todoList = $('[data-todo-list]');
const $newTaskForm = $('[data-new-task-form]');
const $newTaskInput = $('[data-new-task-input]');
const $newTaskBtn = $('[data-new-task-button]');
const $taskTemplate = $('#task-template');
const $clearTaskBtn = $('[data-clear-complete-tasks-button]');
const $progress = $('[data-progress]');
const $progressBar = $('[data-progress-bar]');
const $completedTaskTitle = $('[data-completed-task-title]');
const $completedTasks = $('[data-completed-tasks]');
const $manageTask = $('[data-manage-task]');
const $completedTaskCount = $('[data-completed-task-count]');
const $completedTaskBtn = $('[data-completed-task-btn]');

const $listLetterCounter = $('[data-list-letter-counter]');
const $taskLetterCounter = $('[data-task-letter-counter]');

const $notifyList = $('[data-notify-list]');
const $notifyTask = $('[data-notify-task]');

const $month = $('.month');
const $date = $('.date');
const $day = $('.day');
const $time = $('.time');

const $modal = $('[data-modal]');
const $modalCheckBtn = $('[data-modal-check-button]');
const $modalCancelBtn = $('[data-modal-cancel-button]');
const $modalNotice = $('[data-modal-notice]');
const $modalTaskName = $('[data-modal-task-name]');

const $headerListBtns = $('[data-header-list-btns]');
const $editListBtn = $('[data-edit-list-btn]');
const $deleteListBtn = $('[data-delete-list-btn]');

const LOCAL_STORAGE_LIST_KEY = 'task.lists';
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'selected.selectedListId';
const LOCAL_STORAGE_COMPLETED_TASK_KEY = 'task.completed';
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);
let completedTasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_COMPLETED_TASK_KEY)) || [];

function displayDateTime() {
  const today = new Date();

  $month.textContent = today.toString().slice(4, 7);
  $date.textContent = today.getDate();
  $day.textContent = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
  }).format(today);

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

  const selectedList = lists.find((list) => list.id === +selectedListId);
  if (selectedListId) {
    $progress.classList.remove('invisible');
    $todoList.classList.remove('invisible');
    renderTaskCount(selectedList);
    clearElement($todoList);
    renderTask(selectedList);
    if (selectedList.tasks.length) {
      $notifyTask.classList.add('hidden');
    } else {
      $notifyTask.classList.remove('hidden');
      $notifyTask.textContent = '+ Add your task';
    }
  } else {
    $progress.classList.add('invisible');
    $todoList.classList.add('invisible');
    $notifyTask.classList.remove('invisible');
    $notifyTask.textContent = 'Select your list';
  }
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function renderList() {
  lists.length ? $notifyList.classList.add('hidden') : $notifyList.classList.remove('hidden');
  lists.forEach((list) => {
    const listElement = document.createElement('li');
    listElement.dataset.listId = list.id;
    listElement.classList.add(CLASSNAME.LIST_NAME);
    listElement.textContent = list.listname;
    if (list.id === Number(selectedListId)) {
      listElement.classList.add(CLASSNAME.ACTIVE_LIST);
    }
    const taskCountElement = document.createElement('span');
    taskCountElement.classList.add('task-count-circle');
    taskCountElement.textContent = list.tasks.length;
    listElement.appendChild(taskCountElement);
    $taskList.appendChild(listElement);
  });
}

function renderTaskCount(selectedList) {
  const taskCount = selectedList.tasks.length;
  if (!taskCount) {
    $taskCount.textContent = '0%';
    $progressBar.style.width = '1%';
    return;
  }
  const completeTasksCount = selectedList.tasks.filter((task) => task.complete).length;
  const percentageOfCompletedTask = Math.round((completeTasksCount / taskCount) * 100);
  $taskCount.textContent = `${percentageOfCompletedTask}%`;
  $progressBar.style.width = percentageOfCompletedTask
    ? `${percentageOfCompletedTask - PROGRSSBAR_MARGIN}%`
    : '0%';
}

function renderTask(selectedList) {
  selectedList.tasks.forEach((task) => {
    const taskElement = document.importNode($taskTemplate.content, true);
    const $task = taskElement.querySelector('.task');
    const $checkbox = taskElement.querySelector('input');
    const $label = taskElement.querySelector('label');
    const $taskName = taskElement.querySelector('.task-name');
    const $deleteTaskBtn = taskElement.querySelector('[data-delete-task-button]');
    const $modifyTaskBtn = taskElement.querySelector('[data-modify-task-button]');
    const $modifyForm = taskElement.querySelector('[data-modify-form]');
    const $modifyTaskInput = taskElement.querySelector('[data-modify-task-input]');
    const $creationTime = taskElement.querySelector('[data-creation-time]');

    let newInput = task.taskname;

    setAttribuesToTask({
      task,
      $checkbox,
      $label,
      $taskName,
      $deleteTaskBtn,
      $modifyTaskBtn,
      $modifyForm,
      $creationTime,
    });

    $task.addEventListener('mouseover', () => {
      $modifyTaskBtn.classList.remove('hidden');
      $deleteTaskBtn.classList.remove('hidden');
    });

    $task.addEventListener('mouseout', () => {
      $modifyTaskBtn.classList.add('hidden');
      $deleteTaskBtn.classList.add('hidden');
    });

    $deleteTaskBtn.addEventListener('click', (e) => {
      openModalToDelete(e, task.taskname, deleteTaskHandler, 'task');
    });

    $modifyTaskBtn.addEventListener('click', (e) => {
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
        editFinishHandler({ $modifyForm, $taskName, $modifyTaskBtn });
        modifyTaskHandler(e, newInput);
        render();
      }
    });

    $modifyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      editFinishHandler({ $modifyForm, $taskName, $modifyTaskBtn });
      modifyTaskHandler(e, newInput);
      render();
    });

    $modifyTaskInput.addEventListener('input', (e) => {
      newInput = e.target.value;
    });

    /*
    $modifyTaskInput.addEventListener('focusout', e => {
      editFinishHandler({ $modifyForm, $taskName, $modifyTaskBtn });
      modifyTaskHandler(e, newInput);
      render();
    });
    */

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
  $creationTime,
}) {
  const { id, time, complete, taskname } = task;
  $checkbox.id = id;
  $checkbox.checked = complete;
  $label.htmlFor = id;
  $taskName.innerHTML = taskname;
  $deleteTaskBtn.id = id;
  $modifyTaskBtn.id = id;
  $modifyForm.id = id;
  $modifyForm.classList = CLASSNAME.HIDDEN;
  $creationTime.innerHTML = time;
}

function editHandler({ $modifyForm, $taskName, $modifyTaskInput, $modifyTaskBtn, task }) {
  $modifyForm.classList.remove(CLASSNAME.HIDDEN);
  $taskName.classList.add(CLASSNAME.HIDDEN);
  $modifyTaskInput.value = task.taskname;
  $modifyTaskBtn.classList.remove(CLASSNAME.EDIT_BUTTON);
  $modifyTaskBtn.classList.add(CLASSNAME.EDIT_FIN_BUTTON);
  return;
}

function renderCompletedTask() {
  clearElement($completedTasks);
  renderCompletedTaskCount();
  completedTasks.forEach((task) => {
    const $listElement = document.createElement('div');
    const $checkIcon = document.createElement('span');
    const $listName = document.createElement('span');
    const $taskName = document.createElement('span');
    const $revertBtn = document.createElement('button');
    const $deleteBtn = document.createElement('button');
    $checkIcon.className = 'check-icon';
    $checkIcon.innerHTML = `<i class="fas fa-check-circle"></i>`;
    $listElement.className = 'completed-task';
    $listName.innerHTML = task.listname;
    $listName.className = 'completed-list-name';
    $taskName.className = 'completed-task-name';
    $taskName.innerHTML = task.taskname;
    $revertBtn.className = 'revert-completed-task-btn';
    $deleteBtn.className = 'delete-completed-task-btn';
    $revertBtn.innerHTML = `<i class="fas fa-reply" id=${task.listid}></i>`;
    $deleteBtn.innerHTML = `<i class="fas fa-trash" id=${task.taskid}></i>`;
    $listElement.appendChild($checkIcon);
    $listElement.appendChild($listName);
    $listElement.appendChild($taskName);
    $listElement.appendChild($revertBtn);
    $listElement.appendChild($deleteBtn);
    $completedTasks.appendChild($listElement);

    $revertBtn.addEventListener('click', (e) => {
      revertCompletedTaskHandler(e, task.taskid, task.taskname, task.time);
    });
    $deleteBtn.addEventListener('click', (e) => {
      openModalToDelete(e, task.taskname, deleteCompletedTaskHandler, 'task');
    });
  });
}

function renderCompletedTaskCount() {
  $completedTaskCount.innerHTML = completedTasks.length;
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
  localStorage.setItem(LOCAL_STORAGE_COMPLETED_TASK_KEY, JSON.stringify(completedTasks));
}

function saveAndRender() {
  save();
  render();
}

render();

function createList(newListName) {
  return {
    id: Date.now(),
    listname: newListName,
    tasks: [],
  };
}

function createTask(time, newTaskName) {
  return { id: Date.now(), time: time, taskname: newTaskName, complete: false };
}

function createCompletedTask(listid, taskid, listname, taskname, time, complete) {
  return { listid, taskid, listname, taskname, time, complete };
}

function createRevertedTask(id, taskname, time) {
  return { id, taskname, time, complete: false };
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

  const now = new Date();
  const hour = now.getHours().toString().padStart(2, '0');
  const minute = now.getMinutes().toString().padStart(2, '0');
  const time = `${hour}:${minute}`;

  const task = createTask(time, newTaskName);
  $newTaskInput.value = '';
  const selectedList = lists.find((list) => list.id === +selectedListId);
  selectedList.tasks.push(task);
  saveAndRender();
  $newTaskInput.focus();
}

function deleteList() {
  localStorage.removeItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);
  lists = lists.filter((list) => list.id !== Number(selectedListId));
  selectedListId = null;
  saveAndRender();
}

function taskCountHandler(e) {
  if (e.target.tagName === 'INPUT' && e.target.type === 'checkbox') {
    const selectedList = lists.find((list) => list.id === +selectedListId);
    const checkedTask = selectedList.tasks.find((task) => task.id === +e.target.id);
    checkedTask.complete = e.target.checked;
    renderTaskCount(selectedList);
    save();
  }
}

function clearTaskHander() {
  const selectedList = lists.find((list) => list.id === +selectedListId);
  const completedTasksArr = selectedList.tasks.filter((task) => task.complete);
  completedTasksArr.forEach((v) => {
    let completedTask = createCompletedTask(
      +selectedListId,
      v.id,
      selectedList.listname,
      v.taskname,
      v.time,
      v.complete
    );
    completedTasks.push(completedTask);
  });
  selectedList.tasks = selectedList.tasks.filter((task) => task.complete === false);
  saveAndRender();
}

function deleteTaskHandler(e) {
  const selectedList = lists.find((list) => list.id === +selectedListId);
  selectedList.tasks = selectedList.tasks.filter((task) => task.id !== +e.target.id);
  saveAndRender();
}

function modifyTaskHandler(e, newInput) {
  const selectedList = lists.find((list) => list.id === +selectedListId);
  selectedList.tasks.map((task) => {
    if (task.id === +e.target.id) {
      task.taskname = newInput;
      save();
    }
  });
}

function taskSettingHandler() {
  $todoList.classList.toggle('hidden');
  $completedTasks.classList.toggle('hidden');
  $taskList.classList.toggle('hidden');
  $completedTaskTitle.classList.toggle('hidden');
  $progress.classList.toggle('hidden');
  $completedTaskCount.classList.toggle('hidden');
  $newListForm.classList.toggle('hidden');
  $manageTask.classList.toggle('hidden');
  if (lists.length === 0) {
    $notifyList.classList.toggle('hidden');
  }
  const selectedList = lists.find((list) => list.id === +selectedListId);
  if (selectedList.tasks.length === 0) {
    $notifyTask.classList.toggle('hidden');
  }
  renderCompletedTask();
}

function revertCompletedTaskHandler(e, taskid, taskname, time) {
  const theList = lists.find((list) => list.id === +e.target.id);
  const revertedTask = createRevertedTask(taskid, taskname, time);
  theList.tasks.push(revertedTask);
  completedTasks = completedTasks.filter((task) => task.taskid !== revertedTask.id);
  renderCompletedTask();
  saveAndRender();
}

function deleteCompletedTaskHandler(e) {
  completedTasks = completedTasks.filter((task) => task.taskid !== +e.target.id);
  save();
  renderCompletedTask();
}

let timeout;
function showBtnHandler(target) {
  timeout = setTimeout(() => {
    target.classList.remove('hidden');
    target.classList.remove('disappear');
    target.classList.add('appear');
  }, 500);
}

function hideBtnHandler(target) {
  if (target.classList.contains('appear')) {
    target.classList.add('disappear');
    setTimeout(() => {
      target.classList.remove('appear');
      target.classList.add('hidden');
    }, 1000);
  }
}

function openModalToClearTaskBtn() {
  const selectedList = lists.find((list) => list.id === +selectedListId);
  const completedTasksArr = selectedList.tasks.filter((task) => task.complete);
  $modal.classList.remove('hidden');
  $modalTaskName.classList.add('hidden');
  $modalCancelBtn.addEventListener('click', () => {
    $modal.classList.add('hidden');
  });

  if (completedTasksArr.length === 0) {
    $modalNotice.innerHTML = 'There is no tasks to clear.';
    $modalCheckBtn.classList.add('hidden');
    return;
  }

  $modalNotice.innerHTML = 'Checked tasks are sent to Completed Tasks. Are you sure?';
  $modalCheckBtn.classList.remove('hidden');

  $modalCheckBtn.addEventListener('click', () => {
    clearTaskHander();
    $modal.classList.add('hidden');
  });
}

function openModalToDelete(e, name, callback, object) {
  $modal.classList.remove('hidden');
  $modalCheckBtn.classList.remove('hidden');
  $modalTaskName.classList.remove('hidden');

  $modalCancelBtn.addEventListener('click', () => {
    $modal.classList.add('hidden');
  });
  $modalNotice.innerHTML = `This ${object} will be permanently deleted. Are you sure?`;
  $modalCheckBtn.addEventListener('click', () => {
    callback(e);
    $modal.classList.add('hidden');
  });
  $modalTaskName.innerHTML = name;
}

function deleteListHandler(e) {
  if (selectedListId === null) {
    $modal.classList.remove('hidden');
    $modalTaskName.classList.add('hidden');
    $modalCancelBtn.addEventListener('click', () => {
      $modal.classList.add('hidden');
    });
    $modalNotice.innerHTML = 'There is no selected list to delete, or the list does not exist.';
    $modalCheckBtn.classList.add('hidden');
    return;
  }
  const selectedList = lists.find((list) => list.id === +selectedListId);
  openModalToDelete(e, selectedList.listname, deleteList, 'list');
}

$newListForm.addEventListener('submit', addListHandler);
$newListBtn.addEventListener('click', addListHandler);
$newTaskForm.addEventListener('submit', addTaskHandler);
$newTaskBtn.addEventListener('click', addTaskHandler);

$taskList.addEventListener('click', selectListHandler);
// $editListBtn.addEventListener('click', editListHandler);
$deleteListBtn.addEventListener('click', deleteListHandler);

$todoList.addEventListener('click', taskCountHandler);
$clearTaskBtn.addEventListener('click', openModalToClearTaskBtn);
$completedTaskBtn.addEventListener('click', taskSettingHandler);

$taskSettingBtn.addEventListener('mouseover', () => {
  showBtnHandler($completedTaskBtn);
});
$completedTaskBtn.addEventListener('mouseout', () => {
  hideBtnHandler($completedTaskBtn);
});

$listSettingBtn.addEventListener('mouseover', () => {
  showBtnHandler($headerListBtns);
});

$headerListBtns.addEventListener('mouseleave', () => {
  hideBtnHandler($headerListBtns);
});
