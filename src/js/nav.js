const menuBar = document.querySelector('#hamburger');
const sideBar = document.querySelector('.side-bar');
const newListBtn = document.querySelector('.new-list-button');

function addList(e) {
  e.preventDefault();
  const value = e.target.value;
  const ul = document.querySelector('.nav__custom-list');
  const li = document.createElement('li');
  const itemName = document.createElement('span');
  const itemCount = document.createElement('span');

  li.classList.add('nav__custom-item item-wrap');
  itemName.classList.add('item-name');
  itemName.innerHTML = value;
  itemCount.classList.add('item-count');

  li.appendChild(itemName);
  li.appendChild(itemCount);
  ul.appendChild(li);
}

function appearInputBox() {
  const newListForm = document.querySelector('.new-list-form');
  const newListInput = document.createElement('input');

  newListInput.type = 'text';
  newListInput.classList.add('new-list-input');
  newListForm.appendChild(newListInput);
  newListInput.focus();

  if (newListInput.value) {
    newListForm.addEventListener('submit', addList);
  }
  newListInput.addEventListener('focusout', focusOutInput);
}

function focusOutInput() {
  const newListForm = document.querySelector('.new-list-form');
  const newListInput = document.querySelector('.new-list-input');
  const nav = document.querySelector('.nav');

  if (!newListInput.value) {
    newListInput.style.animation = '.3s disAppearInput';
    setTimeout(() => {
      newListForm.removeChild(newListInput);
    }, 250);
  }

  newListInput.blur();
}

function toggleNav() {
  if (menuBar.checked) {
    sideBar.classList.add('clicked');
  } else {
    sideBar.classList.remove('clicked');
  }
}

function init() {
  menuBar.addEventListener('click', toggleNav);
  newListBtn.addEventListener('click', appearInputBox);
}

init();
