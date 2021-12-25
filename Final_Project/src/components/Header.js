export default class HeaderComponent {
  constructor({ $target }) {
    this.$target = $target;
    this.myHeader = this.createHeader();
  }

  createHeader() {
    const $header = document.createElement('header');
    const $listSettingBtn = document.createElement('button');
    $listSettingBtn.innerHTML = `<i class="fas fa-circle list-setting"
      title="Delete List"></i>`;
    const $title = document.createElement('p');
    $title.textContent = 'My Todo List';
    $title.className = 'title';
    const $taskSettingBtn = document.createElement('button');
    $taskSettingBtn.innerHTML = `<i class="fas fa-circle task-setting"></i>`;
    $header.appendChild($listSettingBtn);
    $header.appendChild($title);
    $header.appendChild($taskSettingBtn);

    this.$target.appendChild($header);

    // Event Listener for listSettingBtn
  }
}
