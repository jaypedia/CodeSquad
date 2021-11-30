export default class TaskComponent {
  // $target : <div class="my-todo-list"></div>
  constructor({ $target }) {
    this.$target = $target;
    this.myTaskContainer = this.createTaskContainer();
  }

  initTask() {}

  createTaskContainer() {
    const $main = document.createElement('main');
    const $info = document.createElement('div');
    $info.classList = 'info';
    const $infoDate = document.createElement('p');
    $infoDate.className = 'info__date';
    $infoDate.innerHTML = `<span class="month">${'Nov'}</span>
    <span class="date">${'30'}</span>
    <span class="day">${'Tuesday'}</span>
    <span class="time">${'00:00:00'}</span>`;
    const $infoTaskCount = document.createElement('p');
    $infoTaskCount.className = 'info__task-count';
    $infoTaskCount.innerHTML = `${'33'}%`;

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
}
