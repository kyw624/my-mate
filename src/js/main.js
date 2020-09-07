let defaultListArray = [];
let customListArray = [];
let itemArray = [];
const defaultList = document.querySelector('.nav__default-list');
const customList = document.querySelector('.nav__custom-list');
const contentList = document.querySelector('.content-list');
const newListButton = document.querySelector('.new-list-button');
const newItemButton = document.querySelector('.new-item-button');
const menuBar = document.querySelector('#hamburger');
const sideBar = document.querySelector('.side-bar');
const deleteButton = document.querySelector('.content-info-button.delete');
const resetButton = document.querySelector('.content-info-button.reset');

function init() {
  loadList();
  menuBar.addEventListener('click', toggleNav);
  newListButton.addEventListener('click', createForm);
  newItemButton.addEventListener('click', createForm);
  deleteButton.addEventListener('click', createModal);
  resetButton.addEventListener('click', createModal);
}

function toggleNav() {
  if (menuBar.checked) {
    sideBar.classList.add('clicked');
  } else {
    sideBar.classList.remove('clicked');
  }
}

function loadList() {
  const defaultListValue = localStorage.getItem('DEFAULT_LIST');
  const customListValue = localStorage.getItem('CUSTOM_LIST');
  const renderInitList = [defaultList, customList, contentList];
  const currentListName = document.querySelector('.content-info-title');

  if (currentListName.textContent === '') {
    currentListName.textContent = 'Important';
  }

  if (currentListName.textContent === 'Important') {
    document.querySelector('.new-item-wrap').classList.add('hide');
  }

  if (
    currentListName.textContent === 'Important' ||
    currentListName.textContent === 'Tasks'
  ) {
    document.querySelector('.content-info-button.delete').classList.add('hide');
  }

  renderInitList.forEach((item) => renderInit(item));

  if (defaultListValue === null) {
    const id = new Date().getTime();
    localStorage.setItem(
      'DEFAULT_LIST',
      JSON.stringify([
        { id, name: 'Important' },
        { id: id + 1, name: 'Tasks' },
      ])
    );
  }
  if (customListValue === null) {
    localStorage.setItem('CUSTOM_LIST', JSON.stringify([]));
  }

  const defaultListParse = JSON.parse(localStorage.getItem('DEFAULT_LIST'));
  const customListParse = JSON.parse(localStorage.getItem('CUSTOM_LIST'));

  defaultListParse.forEach((item) => {
    if (localStorage.getItem(item.name) === null) {
      localStorage.setItem(item.name, JSON.stringify([]));
    }
    appendItem(item.name, item.id, defaultList, item.heart, item.state);
  });

  customListParse.forEach((item) => {
    if (localStorage.getItem(item.name) === null) {
      localStorage.setItem(item.name, JSON.stringify([]));
    }
    appendItem(item.name, item.id, customList, item.heart, item.state);
  });

  loadItem();
}

function loadItem() {
  const importantValue = localStorage.getItem('Important');

  if (importantValue !== null) {
    const importantParse = JSON.parse(importantValue);
    importantParse.forEach((item) => {
      appendItem(item.value, item.id, contentList, item.heart, item.state);
    });
  }
}

function renderInit(item) {
  while (item.hasChildNodes()) {
    item.removeChild(item.firstChild);
  }
}

function createForm(e) {
  const target = e.currentTarget;
  const parent = target.parentElement;
  const form = document.createElement('form');
  const input = document.createElement('input');
  input.type = 'text';

  if (target.classList.contains('new-list-button')) {
    form.classList.add('new-list-form');
    input.classList.add('new-list-input');
  } else {
    form.classList.add('new-item-form');
    input.classList.add('new-item-input');
  }

  form.append(input);
  parent.append(form);
  input.focus();

  form.addEventListener('submit', addItem);
  input.addEventListener('focusout', focusOutInput);
}

function addItem(e) {
  e.preventDefault();

  let target;
  const parent = e.target.parentElement;

  if (parent.classList.contains('new-list-wrap')) {
    target = parent.previousElementSibling.children[1];
  } else {
    target = parent.nextElementSibling;
  }

  const input = e.target.firstChild;
  const value = input.value.trim();

  if (target === customList) {
    const mixList = defaultListArray.concat(customListArray);
    let flag;

    mixList.forEach((list) => {
      if (list.name === value) {
        flag = true;
        return;
      }
    });

    if (flag) {
      input.value = '중복된 리스트명입니다.';
      return;
    }
  }

  if (value != false) {
    const id = new Date().getTime();

    appendItem(value, id, target);

    input.value = '';
    input.blur();
  }
}

function appendItem(value, id, target, heart = false, state = 'doing') {
  const li = document.createElement('li');
  let obj;
  li.id = id;

  if (target === contentList) {
    // Item
    const currentList = document.querySelector('.content-info-title')
      .textContent;
    const task = document.createElement('span');
    const buttonWrap = document.createElement('div');
    const importantBtn = document.createElement('span');
    const deleteBtn = document.createElement('span');

    li.classList.add('content-item-wrap', 'item-wrap');
    task.classList.add('content-item', 'todo');
    buttonWrap.classList.add('content-item', 'button-wrap');
    importantBtn.classList.add('content-item', 'important-item');
    deleteBtn.classList.add('content-item', 'delete-item');

    if (state === 'doing') {
      task.classList.remove('done');
    } else {
      task.classList.add('done');
    }

    if (heart === true) {
      importantBtn.classList.add('clicked');
    } else {
      importantBtn.classList.remove('clicked');
    }

    importantBtn.textContent = '🤍';
    task.textContent = value;
    deleteBtn.textContent = '❌';

    buttonWrap.append(importantBtn);
    buttonWrap.append(deleteBtn);
    li.append(task);
    li.append(buttonWrap);

    li.addEventListener('click', toggleItem);
    importantBtn.addEventListener('click', toggleItem);
    deleteBtn.addEventListener('click', deleteItem);

    obj = {
      id,
      value,
      heart,
      state,
    };
    itemArray.push(obj);
  } else {
    // List
    const name = document.createElement('span');
    const count = document.createElement('span');

    name.classList.add('item-name');
    count.classList.add('item-count');

    name.textContent = value;
    if (JSON.parse(localStorage.getItem(value)) === null) {
      count.textContent = 0;
    } else {
      count.textContent = JSON.parse(localStorage.getItem(value)).length;
    }

    li.append(name);
    li.append(count);

    obj = {
      id,
      name: value,
    };

    li.addEventListener('click', changeList);

    if (target === defaultList) {
      // Deafult List
      li.classList.add('nav__default-item', 'item-wrap');
      defaultListArray.push(obj);
    } else {
      // Custom List
      li.classList.add('nav__custom-item', 'item-wrap');
      customListArray.push(obj);
    }
  }
  target.append(li);

  saveItem(target);
}

function deleteItem(e) {
  e.stopPropagation();

  const btn = e.target;
  const li = btn.parentElement.parentElement;
  const ul = li.parentElement;
  let cleanArray = [];

  cleanArray = itemArray.filter((item) => {
    return parseInt(li.id) !== item.id;
  });

  itemArray = cleanArray;

  const listName = document.querySelector('.content-info-title').textContent;

  if (listName === 'Important') {
    const listParse = JSON.parse(localStorage.getItem('DEFAULT_LIST')).concat(
      JSON.parse(localStorage.getItem('CUSTOM_LIST'))
    );

    listParse.forEach((list) => {
      const parse = JSON.parse(localStorage.getItem(list.name));

      parse.forEach((item, index) => {
        if (parseInt(li.id) === item.id) {
          parse.splice(index, 1);
          localStorage.setItem(list.name, JSON.stringify(parse));
          return;
        }
      });
    });
  } else {
    let importantParse = JSON.parse(localStorage.getItem('Important'));

    importantParse.forEach((item, index) => {
      if (parseInt(li.id) === item.id) {
        importantParse.splice(index, 1);
      }
    });

    localStorage.setItem('Important', JSON.stringify(importantParse));
  }

  ul.removeChild(li);
  saveItem(contentList);
}

function toggleItem(e) {
  e.stopPropagation();

  const listName = document.querySelector('.content-info-title').textContent;

  if (e.currentTarget.classList.contains('important-item')) {
    // 하트 클릭
    const importantBtn = e.currentTarget;
    const li = importantBtn.parentElement.parentElement;

    itemArray.forEach((item, index) => {
      if (parseInt(li.id) === item.id) {
        item.heart = !item.heart;

        if (listName === 'Important') {
          if (!item.heart) {
            const ul = li.parentElement;

            itemArray.splice(index, 1);
          }

          const listParse = JSON.parse(
            localStorage.getItem('DEFAULT_LIST')
          ).concat(JSON.parse(localStorage.getItem('CUSTOM_LIST')));

          listParse.forEach((list) => {
            const parse = JSON.parse(localStorage.getItem(list.name));

            parse.forEach((obj) => {
              if (item.id === obj.id) {
                obj.heart = item.heart;
                localStorage.setItem(list.name, JSON.stringify(parse));
              }
            });
          });
        } else {
          let importantParse = JSON.parse(localStorage.getItem('Important'));

          if (item.heart) {
            importantParse.push(item);
          } else {
            importantParse.forEach((important, importantIndex) => {
              if (item.id === important.id) {
                importantParse.splice(importantIndex, 1);
              }
            });
          }

          localStorage.setItem('Important', JSON.stringify(importantParse));
        }
        return;
      }
    });
  } else {
    // li 클릭
    const li = e.currentTarget;

    itemArray.forEach((item) => {
      if (parseInt(li.id) === item.id) {
        item.state = item.state === 'doing' ? 'done' : 'doing';

        if (listName === 'Important') {
          const listParse = JSON.parse(
            localStorage.getItem('DEFAULT_LIST')
          ).concat(JSON.parse(localStorage.getItem('CUSTOM_LIST')));

          listParse.forEach((list) => {
            const parse = JSON.parse(localStorage.getItem(list.name));

            parse.forEach((obj) => {
              if (item.id === obj.id) {
                obj.state = item.state;
                localStorage.setItem(list.name, JSON.stringify(parse));
              }
            });
          });
        } else {
          let importantParse = JSON.parse(localStorage.getItem('Important'));

          importantParse.forEach((obj) => {
            if (item.id === obj.id) {
              obj.state = item.state;
              localStorage.setItem('Important', JSON.stringify(importantParse));
            }
          });
        }
      }
    });
  }

  saveItem(contentList);
  renderInit(contentList);

  itemArray = [];

  const parse = JSON.parse(localStorage.getItem(listName));

  parse.forEach((item) => {
    appendItem(item.value, item.id, contentList, item.heart, item.state);
  });
}

function updateCount() {
  const li = Array.from(
    document.querySelectorAll('.nav__default-list li')
  ).concat(Array.from(document.querySelectorAll('.nav__custom-list li')));

  li.forEach((element) => {
    const name = element.firstChild.textContent;

    element.lastChild.textContent = JSON.parse(
      localStorage.getItem(name)
    ).length;
  });
}

function changeList(e) {
  const listName = e.currentTarget.firstChild.textContent;
  const listTitle = document.querySelector('.content-info-title');

  if (listTitle.textContent === listName) {
    if (sideBar.classList.contains('clicked')) {
      sideBar.classList.remove('clicked');
    }
    menuBar.checked = false;

    return;
  }

  listTitle.textContent = listName;

  renderInit(contentList);
  itemArray = [];

  if (
    document.querySelector('.content-info-title').textContent === 'Important'
  ) {
    document.querySelector('.new-item-wrap').classList.add('hide');
  } else {
    document.querySelector('.new-item-wrap').classList.remove('hide');
  }

  if (
    document.querySelector('.content-info-title').textContent === 'Important' ||
    document.querySelector('.content-info-title').textContent === 'Tasks'
  ) {
    document.querySelector('.content-info-button.delete').classList.add('hide');
  } else {
    document
      .querySelector('.content-info-button.delete')
      .classList.remove('hide');
  }

  const targetList = JSON.parse(localStorage.getItem(listName));

  if (targetList !== null) {
    targetList.forEach((item) =>
      appendItem(item.value, item.id, contentList, item.heart, item.state)
    );
  }

  if (sideBar.classList.contains('clicked')) {
    sideBar.classList.remove('clicked');
  }
  menuBar.checked = false;
}

function saveItem(target) {
  if (target === contentList) {
    const currentList = document.querySelector('.content-info-title')
      .textContent;

    localStorage.setItem(currentList, JSON.stringify(itemArray));
  }

  if (defaultListArray.length !== 0) {
    localStorage.setItem('DEFAULT_LIST', JSON.stringify(defaultListArray));
  }

  if (customListArray.length !== 0) {
    const currentList = customListArray[customListArray.length - 1].name;
    localStorage.setItem('CUSTOM_LIST', JSON.stringify(customListArray));

    if (localStorage.getItem(currentList) === null) {
      localStorage.setItem(currentList, JSON.stringify([]));
    }
  }

  updateCount();
}

function createModal(e) {
  const body = document.querySelector('body');
  const modal = document.querySelector('.modal');
  const type = e.target.textContent;

  if (modal) {
    const text = modal.firstChild.textContent;
    if (
      // 이미 띄워진 팝업창과 같을 경우
      (type === 'DELETE' && text.indexOf('제거') !== -1) ||
      (type === 'RESET' && text.indexOf('초기화') !== -1)
    ) {
      return;
    }
    body.removeChild(modal);
  }

  const container = document.createElement('div');
  const content = document.createElement('div');
  const buttonWrap = document.createElement('div');
  const yesBtn = document.createElement('div');
  const noBtn = document.createElement('div');

  container.classList.add('modal');
  content.classList.add('modal-content');
  buttonWrap.classList.add('modal-button-wrap');
  yesBtn.classList.add('modal-button', 'yes');
  noBtn.classList.add('modal-button', 'no');

  content.textContent = `${
    type === 'DELETE'
      ? '해당 리스트를 제거하시겠습니까?'
      : '현재 아이템들을 초기화하시겠습니까?'
  }`;
  yesBtn.textContent = 'YES';
  noBtn.textContent = 'NO';

  container.append(content);
  container.append(buttonWrap);
  buttonWrap.append(yesBtn);
  buttonWrap.append(noBtn);
  body.append(container);

  yesBtn.addEventListener('click', () => {
    getListOption(type);
    body.removeChild(container);
  });
  noBtn.addEventListener('click', () => {
    body.removeChild(container);
  });
}

function focusOutInput(e) {
  const input = e.target;
  const form = input.parentElement;

  if (!input.value) {
    removeForm(form);
  }

  input.blur();
}

function removeForm(form) {
  const parent = form.parentElement;
  const input = form.firstChild;

  input.style.animation = 'disAppearInputBox .3s';

  setTimeout(() => {
    parent.removeChild(form);
  }, 250);
}

function getListOption(type) {
  const currentListTitle = document.querySelector('.content-info-title');

  if (type === 'DELETE') {
    // 리스트 제거
    let importantParse = JSON.parse(localStorage.getItem('Important'));
    const ul = document.querySelector('.nav__custom-list');

    if (itemArray.length !== 0) {
      itemArray.forEach((current) => {
        importantParse.forEach((important, index) => {
          if (current.id === important.id) {
            importantParse.splice(index, 1);
          }
        });
      });
      localStorage.setItem('Important', JSON.stringify(importantParse));
    }

    const li = Array.from(ul.children).filter((li) => {
      if (li.firstChild.textContent === currentListTitle.textContent) {
        return li;
      }
    });

    ul.removeChild(li[0]);

    customListArray.forEach((list, index) => {
      if (list.name === currentListTitle.textContent) {
        customListArray.splice(index, 1);
        return;
      }
    });
    localStorage.removeItem(currentListTitle.textContent);

    saveItem(customListArray);
    renderInit(contentList);

    itemArray = [];
    currentListTitle.textContent = 'Important';

    JSON.parse(localStorage.getItem('Important')).forEach((item) => {
      appendItem(item.value, item.id, contentList, item.heart, item.state);
    });
  } else {
    // 리스트 초기화
    if (itemArray.length === 0) {
      return;
    }

    if (currentListTitle.textContent === 'Important') {
      const listParse = JSON.parse(localStorage.getItem('DEFAULT_LIST')).concat(
        JSON.parse(localStorage.getItem('CUSTOM_LIST'))
      );

      itemArray.forEach((target) => {
        listParse.forEach((list) => {
          const parse = JSON.parse(localStorage.getItem(list.name));

          parse.forEach((item) => {
            if (target.id === item.id) {
              item.heart = false;
            }
          });

          localStorage.setItem(list.name, JSON.stringify(parse));
        });
      });

      localStorage.setItem('Important', JSON.stringify([]));
    }

    itemArray = [];

    saveItem(contentList);
    renderInit(contentList);
  }
}

// Run
init();
