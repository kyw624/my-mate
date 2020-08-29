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

function init() {
  loadList();
  menuBar.addEventListener('click', toggleNav);
  newListButton.addEventListener('click', createForm);
  newItemButton.addEventListener('click', createForm);
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
    appendItem(item.name, item.id, defaultList);
  });

  customListParse.forEach((item) => {
    if (localStorage.getItem(item.name) === null) {
      localStorage.setItem(item.name, JSON.stringify([]));
    }
    appendItem(item.name, item.id, customList);
  });

  loadItem();
}

function loadItem() {
  const importantValue = localStorage.getItem('Important');

  if (importantValue !== null) {
    const importantParse = JSON.parse(importantValue);
    importantParse.forEach((item) => {
      appendItem(item.value, item.id, contentList);
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
    target = parent.previousElementSibling;
  } else {
    target = parent.nextElementSibling;
  }

  const input = e.target.firstChild;
  const value = input.value;

  if (value != false) {
    const id = new Date().getTime();

    appendItem(value.trim(), id, target);

    input.value = '';
    input.blur();
  }
}

function appendItem(value, id, target) {
  const li = document.createElement('li');
  let obj;
  li.id = id;

  if (target === contentList) {
    // Item
    const currentList = document.querySelector('.content-info-title').innerText;
    const task = document.createElement('span');
    const buttonWrap = document.createElement('div');
    const importantBtn = document.createElement('span');
    const deleteBtn = document.createElement('span');

    li.classList.add('content-item-wrap');
    task.classList.add('content-item');
    buttonWrap.classList.add('content-item', 'button-wrap');
    importantBtn.classList.add('content-item', 'important-item');
    deleteBtn.classList.add('content-item', 'delete-item');

    task.innerHTML = value;
    importantBtn.innerHTML = '⭐';
    deleteBtn.innerHTML = '❎';

    buttonWrap.append(importantBtn);
    buttonWrap.append(deleteBtn);
    li.append(task);
    li.append(buttonWrap);
    // li.addEventListener('click', clickItem);
    // li.addEventListener('click', deleteItem);

    obj = {
      id,
      value,
    };

    itemArray.push(obj);
  } else {
    if (target === defaultList) {
      // Deafult List 렌더링
      const name = document.createElement('span');
      const count = document.createElement('span');

      li.classList.add('nav__default-item', 'item-wrap');
      name.classList.add('item-name');
      count.classList.add('item-count');

      name.innerHTML = value;

      li.append(name);
      li.append(count);
      defaultList.append(li);

      obj = {
        id,
        name: value,
      };

      defaultListArray.push(obj);
    } else {
      // Custom List
      const name = document.createElement('span');
      const count = document.createElement('span');

      li.classList.add('nav__custom-item', 'item-wrap');
      name.classList.add('item-name');
      count.classList.add('item-count');

      name.innerHTML = value;

      li.append(name);
      li.append(count);
      customList.append(li);

      obj = {
        id,
        name: value,
      };
      customListArray.push(obj);
    }
    li.addEventListener('click', changeList);
  }
  target.append(li);

  saveItem(target);
}

function changeList(e) {
  const listName = e.currentTarget.firstChild.innerText;
  const listTitle = document.querySelector('.content-info-title');
  listTitle.innerHTML = listName;

  renderInit(contentList);
  itemArray = [];

  const targetList = JSON.parse(localStorage.getItem(listName));
  targetList.forEach((item) => appendItem(item.value, item.id, contentList));

  if (sideBar.classList.contains('clicked')) {
    sideBar.classList.remove('clicked');
  }
  menuBar.checked = false;
}

function saveItem(target) {
  if (target === contentList) {
    const currentList = document.querySelector('.content-info-title').innerText;
    localStorage.setItem(currentList, JSON.stringify(itemArray));
  }

  if (defaultListArray.length !== 0) {
    localStorage.setItem('DEFAULT_LIST', JSON.stringify(defaultListArray));
  }
  if (customListArray.length !== 0) {
    localStorage.setItem('CUSTOM_LIST', JSON.stringify(customListArray));
  }
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

// Run
init();
