const menuBar = document.querySelector('#hamburger');
const sideBar = document.querySelector('.side-bar');
const newListBtn = document.querySelector('.new-list-button');

function appendList(e) {
  e.preventDefault();
  const newListInput = document.querySelector('.new-list-input');
  const value = newListInput.value.trim();

  if (value != false) {
    const ul = document.querySelector('.nav__custom-list');
    const li = document.createElement('li');
    const itemName = document.createElement('span');
    const itemCount = document.createElement('span');
    li.classList.add('nav__custom-item', 'item-wrap');
    itemName.classList.add('item-name');
    itemName.innerHTML = value;
    itemCount.classList.add('item-count');

    li.append(itemName);
    li.append(itemCount);
    ul.append(li);
  }

  newListInput.value = '';
  newListInput.blur();
}

function appearInputBox() {
  const newListWrap = document.querySelector('.new-list-wrap');
  const newListForm = document.createElement('form');
  const newListInput = document.createElement('input');

  newListForm.classList.add('new-list-form');
  newListInput.type = 'text';
  newListInput.classList.add('new-list-input');
  newListForm.append(newListInput);
  newListWrap.append(newListForm);
  newListInput.focus();

  newListForm.addEventListener('submit', appendList);
  newListInput.addEventListener('focusout', focusOutListInput);
}

function focusOutListInput() {
  const newListForm = document.querySelector('.new-list-form');
  const newListInput = document.querySelector('.new-list-input');

  if (!newListInput.value) {
    removeListInput(newListForm);
  }

  newListInput.blur();
}

function toggleNav() {
  if (menuBar.checked) {
    sideBar.classList.add('clicked');
  } else {
    if (document.querySelector('.new-list-form')) {
      const newListForm = document.querySelector('.new-list-form');
      if (newListForm.hasChildNodes()) {
        removeListInput(newListForm);
      }
    }
    sideBar.classList.remove('clicked');
  }
}

function removeListInput(form) {
  const newListWrap = document.querySelector('.new-list-wrap');
  form.firstChild.style.animation = 'disAppearInputBox .3s';
  setTimeout(() => {
    newListWrap.removeChild(form);
  }, 250);
}

function init() {
  menuBar.addEventListener('click', toggleNav);
  newListBtn.addEventListener('click', appearInputBox);
}

init();
