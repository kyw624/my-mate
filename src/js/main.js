// let DEFAULT_LS = { Important: [], Tasks: [] };
let DEFAULT_LS = localStorage.getItem('DEFAULT_LS');
let CUSTOM_LS = localStorage.getItem('CUSTOM_LS');
let defaultListArray = [];
let customListArray = [];
let itemArray = [];
const newListButton = document.querySelector('.new-list-button');
const newItemButton = document.querySelector('.new-item-button');

function init() {
  loadItems();
}

function loadItems() {
  const defaultValue = localStorage.getItem('DEFAULT_LS');
  const customValue = localStorage.getItem('CUSTOM_LS');

  console.log(defaultValue);
  console.log(customValue);

  if (defaultValue !== null) {
    const defaultParse = JSON.parse(defaultValue);
    console.log(defaultParse);
  }

  if (customValue !== null) {
    const customParse = JSON.parse(customValue);
    console.log(customParse);
  }

  // if (DEFAULT_LS !== null) {
  //   const defaultValues = JSON.parse(localStorage.getItem('DEFAULT_LS'))[
  //     'Important'
  //   ];
  // } else {
  //   localStorage.setItem(
  //     'DEFAULT_LS',
  //     JSON.stringify({ Important: [], Tasks: [] })
  //   );
  // }

  // // listArr.forEach((x) => renderInit(x));
  // const defaultParse = JSON.parse(localStorage.getItem('DEFAULT_LS'));
  // const test = Object.keys(defaultParse);

  // test.forEach((x) => appendItem(x));
  // addList(DEFAULT_LS);

  // if (!isEmpty(CUSTOM_LS)) {
  //   appendList(CUSTOM_LS);
  // }

  // if (!isEmpty(defaultValues)) {
  //   appendItem(DEFAULT_LS);
  // }
}

function renderInit(item) {
  while (item.hasChildNodes()) {
    item.remove(item.firstChild);
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
    // timestamp로 id 설정.
    // const id = new Date().getTime();

    // appendItem(value.trim(), id, target);
    appendItem(value.trim(), target);

    input.value = '';
    input.blur();
  }
}

function appendItem(
  value,
  target = document.querySelector('.nav__default-list')
) {
  const li = document.createElement('li');
  const id = new Date().getTime();
  let obj;
  console.log(`target: ${target}`);

  li.id = id;

  if (target === null) {
    const name = document.createElement('span');
    const count = document.createElement('span');

    li.classList.add('nav__default-item', 'item-wrap');
    name.classList.add('item-name');
    count.classList.add('item-count');

    li.append(name);
    li.append(count);

    obj = {
      id,
      name: value,
    };
    defaultListArray.push(obj);
    console.log(`obj: ${obj}`);
  } else if (target.classList.contains('content-list')) {
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
    // List
    const name = document.createElement('span');
    const count = document.createElement('span');

    li.classList.add('nav__custom-item', 'item-wrap');
    name.classList.add('item-name');
    count.classList.add('item-count');

    name.innerHTML = value;

    li.append(name);
    li.append(count);

    obj = {
      id,
      name: value,
    };
    customListArray.push(obj);
  }
  target.append(li);
  saveItem();
}

function saveItem() {
  console.log(`defaultListArray: ${defaultListArray}`);
  console.log(`customListArray: ${customListArray}`);

  console.log(customListArray);

  defaultListArray.forEach((x) => {
    localStorage.setItem('DEFAULT_LS', (x.name = [x]));
  });
  // customListArray.forEach((x) => {
  //   localStorage.setItem('CUSTOM_LS', JSON.stringify((x.name = [x])));
  // });
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
