let defaultListArray = [];
let customListArray = [];
let itemArray = [];
const defaultList = document.querySelector('.nav__default-list');
const customList = document.querySelector('.nav__custom-list');
const newListButton = document.querySelector('.new-list-button');
const newItemButton = document.querySelector('.new-item-button');

function init() {
  loadItems();
}

function loadItems() {
  const defaultValue = localStorage.getItem('DEFAULT_LS');
  const customValue = localStorage.getItem('CUSTOM_LS');
  const renderInitList = [defaultList, customList];
  let defaultParse;
  let customParse;

  renderInitList.forEach((x) => renderInit(x));

  if (defaultValue === null) {
    localStorage.setItem(
      'DEFAULT_LS',
      JSON.stringify([
        { id: '', Important: [] },
        { id: '', Tasks: [] },
      ])
    );
  }
  defaultParse = JSON.parse(localStorage.getItem('DEFAULT_LS'));

  defaultParse.forEach((item) =>
    appendItem(Object.keys(item)[1], item.id, defaultList)
  );

  if (customValue === null) {
    localStorage.setItem('CUSTOM_LS', JSON.stringify([]));
  }
  customParse = JSON.parse(localStorage.getItem('CUSTOM_LS'));

  customParse.forEach((item) =>
    appendItem(Object.keys(item)[1], item['id'], customList)
  );
}

function renderInit(item) {
  while (item.hasChildNodes()) {
    item.removeChild(item.firstChild);
  }
}

function isEmpty(instance) {
  // 빈 배열
  if (instance.constructor === Array) {
    if (instance.length === 0) {
      return true;
    }
    return false;
  }
  // 빈 객체
  else if (instance.constructor === Object) {
    if (Object.keys(instance).length === 0) {
      return true;
    }
    return false;
  } else {
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
  const target = e.target.parentElement.previousElementSibling;
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
  let obj = {};

  if (id === '') {
    id = new Date().getTime();
  }

  li.id = id;
  if (target.classList.contains('content-list')) {
    // Item
    const task = document.createElement('span');
    const buttonWrap = document.createElement('div');
    const favoriteButton = document.createElement('span');
    const deleteButton = document.createElement('span');

    li.classList.add('content-item-wrap');
    task.classList.add('content-item');
    buttonWrap.classList.add('content-item', 'button-wrap');
    favoriteButton.classList.add('content-item', 'favorite-item');
    deleteButton.classList.add('content-item', 'delete-item');

    task.innerHTML = value;
    favoriteButton.innerHTML = '⭐';
    deleteButton.innerHTML = '❎';

    buttonWrap.append(favoriteButton);
    buttonWrap.append(deleteButton);
    li.append(task);
    li.append(buttonWrap);

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

      obj['id'] = id;
      obj[value] = [];

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

      obj['id'] = id;
      obj[value] = [];

      customListArray.push(obj);
    }
    // li.addEventListener('click', changeList);
  }
  target.append(li);

  saveItem(target);
}

function changeList() {}

function saveItem(target) {
  if (target.classList.contains('content-list')) {
  } else {
    if (target === defaultList) {
      localStorage.setItem('DEFAULT_LS', JSON.stringify(defaultListArray));
    } else {
      localStorage.setItem('CUSTOM_LS', JSON.stringify(customListArray));
    }
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

newListButton.addEventListener('click', createForm);
newItemButton.addEventListener('click', createForm);
