import HeaderComponent from './components/Header.js';
import ListComponent from './components/List.js';
import TaskComponent from './components/Task.js';
// import Modal from './components/Modal.js';

export default class App {
  constructor($target) {
    this.$target = $target;
    this.$myTodoList = this.createMyTodoList();
    this.HeaderComponent = new HeaderComponent({ $target: this.$myTodoList });
    this.ListComponent = new ListComponent({ $target: this.$myTodoList });
    this.TaskComponent = new TaskComponent({ $target: this.$myTodoList });
  }

  setHeaderComponent(HeaderComponent) {
    this.HeaderComponent = HeaderComponent;
  }

  createMyTodoList() {
    const $myTodoList = document.createElement('div');
    $myTodoList.className = 'my-todo-list';

    this.$target.appendChild($myTodoList);

    return $myTodoList;
  }
}
