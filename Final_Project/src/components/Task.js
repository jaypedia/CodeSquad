import { listStorage } from '../utils/LocalStorage.js';
import { CLASSNAME } from '../utils/Classname.js';
import clearElement from '../utils/ClearElement.js';

export default class TaskComponent {
  // $target : <div class="my-todo-list"></div>
  constructor({ $target }) {
    this.$target = $target;
    this.myTaskContainer = this.createTaskContainer();
    this.displayDateTime = this.displayDateTime();
    this.selectedList = listStorage.getSelectedList();
    this.renderTaskPercent = this.renderTaskPercent(this.selectedList);
    this.renderTask = this.renderTask(this.selectedList);
  }

  createTaskContainer() {
    const $main = document.createElement('main');
    const $info = document.createElement('div');
    $info.classList = 'info';
    const $infoDate = document.createElement('p');
    $infoDate.className = 'info__date';
    $infoDate.innerHTML = `<span class="month"></span>
    <span class="date"></span>
    <span class="day"></span>
    <span class="time"></span>`;
    const $infoTaskCount = document.createElement('p');
    $infoTaskCount.className = 'info__task-count';

    const $todoInnerContainer = document.createElement('div');
    $todoInnerContainer.className = 'todo-inner-container';

    const $todoList = document.createElement('div');
    $todoList.className = 'todo-list';
    const $manageTask = document.createElement('div');
    $manageTask.className = 'manage-task';
    const $newTaskCreator = document.createElement('div');
    $newTaskCreator.className = 'new-task-creator';

    const $clearCompletedTask = document.createElement('div');
    $clearCompletedTask.className = 'clear-completed-task';
    const $clearCompletedTaskBtn = document.createElement('button');
    $clearCompletedTaskBtn.className = 'btn';
    $clearCompletedTaskBtn.classList.add('clear');
    $clearCompletedTaskBtn.title = 'Clear completed task';
    $clearCompletedTaskBtn.innerHTML = '<i class="fas fa-broom"></i>';
    $clearCompletedTask.appendChild($clearCompletedTaskBtn);

    const $newTaskForm = document.createElement('form');
    const $newTaskInput = document.createElement('input');
    $newTaskInput.className = 'new';
    $newTaskInput.classList.add('task');
    $newTaskInput.type = 'text';
    $newTaskInput.placeholder = 'New task';
    $newTaskInput.maxLength = '50';
    const $newTaskBtn = document.createElement('button');
    $newTaskBtn.className = 'btn';
    $newTaskBtn.classList.add('create');
    $newTaskBtn.classList.add('main');
    $newTaskBtn.innerHTML = '<i class="fas fa-plus-circle"></i>';

    $newTaskForm.appendChild($newTaskInput);
    $newTaskForm.appendChild($newTaskBtn);

    const $notifyTask = document.createElement('span');
    $notifyTask.className = 'notify';
    $notifyTask.classList.add('task');

    $newTaskCreator.appendChild($newTaskForm);
    $manageTask.appendChild($newTaskCreator);
    $manageTask.appendChild($clearCompletedTask);
    $todoInnerContainer.appendChild($todoList);
    $todoInnerContainer.appendChild($manageTask);
    $todoInnerContainer.appendChild($notifyTask);
    $info.appendChild($infoDate);
    $info.appendChild($infoTaskCount);
    $main.appendChild($info);
    $main.appendChild($todoInnerContainer);
    this.$target.appendChild($main);
  }

  displayDateTime() {
    const $month = document.querySelector('.month');
    const $date = document.querySelector('.date');
    const $day = document.querySelector('.day');
    const $time = document.querySelector('.time');

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
    console.log('dis');
  }

  timeInterval() {
    setInterval(this.displayDateTime, 1000);
  }

  renderTaskPercent(selectedList) {
    if (!selectedList) return;
    const $infoTaskCount = document.querySelector('.info__task-count');
    const taskCount = selectedList.tasks.length;
    if (!taskCount) {
      $taskCount.textContent = '';
      return;
    }
    const completeTasksCount = selectedList.tasks.filter(
      task => task.complete
    ).length;
    const percentageOfCompletedTask = Math.round(
      (completeTasksCount / taskCount) * 100
    );
    $infoTaskCount.textContent = `${percentageOfCompletedTask}%`;
  }

  renderTask(selectedList) {
    if (!selectedList) return;
    selectedList.tasks.forEach(task => {
      const $todoList = document.querySelector('.todo-list');
      const $task = document.createElement('div');
      $task.className = 'task';
      const $checkbox = document.createElement('input');
      $checkbox.type = 'checkbox';
      const $label = document.createElement('label');
      const $customCheckbox = document.createElement('span');
      $customCheckbox.className = 'custom-checkbox';
      const $creationTime = document.createElement('span');
      $creationTime.className = 'creation-time';
      const $taskName = document.createElement('span');
      $taskName.className = 'task-name';

      const $taskModifyForm = document.createElement('form');
      const $taskModifyInput = document.createElement('input');
      $taskModifyInput.type = 'text';
      const $taskModifyBtn = document.createElement('button');
      $taskModifyBtn.className = 'modify';
      $taskModifyBtn.classList.add('icon');
      $taskModifyBtn.classList.add('hidden');
      $taskModifyBtn.classList.add('edit-button');
      $taskModifyBtn.innerHTML = `<i class="fas fa-feather-alt"></i>`;
      const $taskDeleteBtn = document.createElement('button');
      $taskDeleteBtn.className = 'delete';
      $taskDeleteBtn.classList.add('icon');
      $taskDeleteBtn.classList.add('hidden');
      $taskDeleteBtn.innerHTML = `<i class="fas fa-trash-alt"></i>`;

      $taskModifyForm.appendChild($taskModifyInput);
      $label.appendChild($customCheckbox);
      $label.appendChild($creationTime);
      $label.appendChild($taskName);
      $task.appendChild($checkbox);
      $task.appendChild($label);
      $task.appendChild($taskModifyForm);
      $task.appendChild($taskModifyBtn);
      $task.appendChild($taskDeleteBtn);
      $todoList.appendChild($task);

      setAttribuesToTask({
        task,
        $checkbox,
        $label,
        $taskName,
        $taskDeleteBtn,
        $taskModifyBtn,
        $taskModifyForm,
        $creationTime,
      });
    });

    function setAttribuesToTask({
      task,
      $checkbox,
      $label,
      $taskName,
      $taskDeleteBtn,
      $taskModifyBtn,
      $taskModifyForm,
      $creationTime,
    }) {
      const { id, time, complete, name } = task;
      $checkbox.id = id;
      $checkbox.checked = complete;
      $label.htmlFor = id;
      $taskName.innerHTML = name;
      $taskDeleteBtn.id = id;
      $taskModifyBtn.id = id;
      $taskModifyForm.id = id;
      $taskModifyForm.classList = CLASSNAME.HIDDEN;
      $creationTime.innerHTML = time;
    }
  }
}
