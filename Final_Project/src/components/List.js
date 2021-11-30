export default class ListComponent {
  // $target : <div class="my-todo-list"></div>
  constructor({ $target }) {
    this.$target = $target;
    this.myListContainer = this.createListContainer();
  }

  initList() {}

  createListContainer() {
    const $aside = document.createElement('aside');

    const $myLists = document.createElement('div');
    $myLists.className = 'my-list';
    const $notifyList = document.createElement('span');
    $notifyList.className = 'notify';
    $notifyList.classList.add('list');
    $notifyList.textContent = '+ Add your list first';
    const $list = document.createElement('ul');
    $list.className = 'task-list';

    const $manageList = document.createElement('div');
    $manageList.className = 'manage-list';
    const $listCreator = document.createElement('div');
    $listCreator.className = 'new-list-creator';
    const $newListForm = document.createElement('form');
    const $newListInput = document.createElement('input');
    $newListInput.className = 'new';
    $newListInput.classList.add('list');
    $newListInput.type = 'text';
    $newListInput.placeholder = 'New list';
    $newListInput.maxLength = '15';
    const $newListBtn = document.createElement('button');
    $newListBtn.className = 'btn';
    $newListBtn.classList.add('create');
    $newListBtn.classList.add('aside');
    $newListBtn.innerHTML = '<i class="fas fa-plus-circle"></i>';

    $newListForm.appendChild($newListInput);
    $newListForm.appendChild($newListBtn);
    $listCreator.appendChild($newListForm);
    $manageList.appendChild($listCreator);
    $myLists.appendChild($notifyList);
    $myLists.appendChild($list);
    $aside.appendChild($myLists);
    $aside.appendChild($manageList);

    this.$target.appendChild($aside);
  }
}
