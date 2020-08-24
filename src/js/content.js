const newItemBtn = document.querySelector('.new-item-button');

function appendList(e) {
  e.preventDefault();
  const newItemInput = document.querySelector('.new-item-input');
  const value = newItemInput.value.trim();

  if (value != false) {
    const ul = document.querySelector('.content-list');
    const li = document.createElement('li');
    const buttonWrap = document.createElement('div');
    const taskItem = document.createElement('span');
    const taskFavorite = document.createElement('span');
    const taskDelBtn = document.createElement('span');

    li.classList.add('content-item-wrap');
    buttonWrap.classList.add('content-item', 'button-wrap');
    taskItem.classList.add('content-item');
    taskFavorite.classList.add('content-item', 'favorite-item');
    taskDelBtn.classList.add('content-item', 'delete-item');

    taskItem.innerHTML = value;
    taskFavorite.innerHTML = '⭐';
    taskDelBtn.innerHTML = '❎';

    buttonWrap.append(taskFavorite);
    buttonWrap.append(taskDelBtn);
    li.append(taskItem);
    li.append(buttonWrap);
    ul.append(li);
  }

  newItemInput.value = '';
  newItemInput.blur();
}

function appearInputBox() {
  const newItemWrap = document.querySelector('.new-item-wrap');
  const newItemForm = document.createElement('form');
  const newItemInput = document.createElement('input');

  newItemForm.classList.add('new-item-form');
  newItemInput.type = 'text';
  newItemInput.classList.add('new-item-input');
  newItemForm.append(newItemInput);
  newItemWrap.append(newItemForm);
  newItemInput.focus();

  newItemForm.addEventListener('submit', appendList);
  newItemInput.addEventListener('focusout', focusOutTaskInput);
}

function focusOutTaskInput() {
  const newItemForm = document.querySelector('.new-item-form');
  const newItemInput = document.querySelector('.new-item-input');

  if (!newItemInput.value) {
    removeTaskInput(newItemForm);
  }

  newItemInput.blur();
}

function removeTaskInput(form) {
  const newItemWrap = document.querySelector('.new-item-wrap');
  form.firstChild.style.animation = 'disAppearInputBox .3s';
  setTimeout(() => {
    newItemWrap.removeChild(form);
  }, 250);
}

function init() {
  newItemBtn.addEventListener('click', appearInputBox);
}

init();
