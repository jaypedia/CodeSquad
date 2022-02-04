const storage = window.localStorage;
const LIST_KEY = 'task.lists';
const SELECTED_LIST_ID_KEY = 'selected.selectedListId';

const listStorage = {
  getAllLists: () => {
    const lists = JSON.parse(storage.getItem(LIST_KEY));
    if (!lists || lists.length === 0) return [];
    return lists;
  },

  getSelectedListId: () => {
    const selectedListId = storage.getItem(SELECTED_LIST_ID_KEY);
    return selectedListId;
  },

  getSelectedList: () => {
    const allLists = listStorage.getAllLists();
    const selectedListId = listStorage.getSelectedListId();
    const selectedList = allLists.filter(list => list.id === +selectedListId);
    return selectedList[0];
  },

  save: () => {
    // 중복
    const allLists = listStorage.getAllLists();
    const selectedListId = listStorage.getSelectedListId();
    storage.setItem(LIST_KEY, allLists);
    storage.setItem(SELECTED_LIST_ID_KEY, selectedListId);
  },
};

export { listStorage };
