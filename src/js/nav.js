const menuBar = document.querySelector('#hamburger');
const sideBar = document.querySelector('.side-bar');
// const newListBtn = document.querySelector('.new-list-button');

// function saveList(LS_NAME) {
//   localStorage.setItem(LS_NAME, '');
// }

// function appendList(task, count = 0, type = 'custom') {
//   const name = task;
//   const ul = document.querySelector(`.nav__${type}-list`);
//   const li = document.createElement('li');
//   const itemName = document.createElement('span');
//   const itemCount = document.createElement('span');
//   li.classList.add(`.nav__${type}-list`, 'item-wrap');
//   itemName.classList.add('item-name');
//   itemName.innerHTML = task;
//   itemCount.classList.add('item-count');
//   itemCount.innerHTML = count;
//   li.append(itemName);
//   li.append(itemCount);
//   ul.append(li);

//   saveList(name);
// }

// function addList(e) {
//   e.preventDefault();
//   const newListInput = document.querySelector('.new-list-input');
//   const value = newListInput.value.trim();

//   if (value != false) {
//     appendList(value);
//     newListInput.value = '';
//   }

//   newListInput.blur();
// }

// function appearInputBox() {
//   const newListWrap = document.querySelector('.new-list-wrap');
//   const newListForm = document.createElement('form');
//   const newListInput = document.createElement('input');

//   newListForm.classList.add('new-list-form');
//   newListInput.type = 'text';
//   newListInput.classList.add('new-list-input');
//   newListForm.append(newListInput);
//   newListWrap.append(newListForm);
//   newListInput.focus();

//   newListForm.addEventListener('submit', addList);
//   newListInput.addEventListener('focusout', focusOutListInput);
// }

// function focusOutListInput() {
//   const newListForm = document.querySelector('.new-list-form');
//   const newListInput = document.querySelector('.new-list-input');

//   if (!newListInput.value) {
//     removeListInput(newListForm);
//   }

//   newListInput.blur();
// }

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

// function removeListInput(form) {
//   const newListWrap = document.querySelector('.new-list-wrap');
//   form.firstChild.style.animation = 'disAppearInputBox .3s';
//   setTimeout(() => {
//     newListWrap.removeChild(form);
//   }, 250);
// }

// function loadList() {
//   let defaultArr = ['Important', 'Tasks'];

//   for (let i = 0; i < 2; i++) {
//     if (JSON.parse(localStorage.getItem(defaultArr[i])).length != false) {
//       appendList(
//         defaultArr[i],
//         JSON.parse(localStorage.getItem(defaultArr[i])).length,
//         'default'
//       );
//     }
//     appendList(defaultArr[i], 0, 'defualt');
//   }

//   if (localStorage.length >= 2) {
//     for (let i = 0; i < localStorage.length; i++) {
//       const key = localStorage.key(i);

//       if (key == 'Important' || key == 'Tasks' || key == 'OTelJS.ClientId') {
//         continue;
//       } else {
//         if (JSON.parse(localStorage.getItem(x)).length != false) {
//           appendList(key, JSON.parse(localStorage.getItem(x)).length);
//         } else {
//           appendList(key, 0);
//         }
//       }
//     }
//   }
// }

// function init() {
//   loadList();
// menuBar.addEventListener('click', toggleNav);
// newListBtn.addEventListener('click', appearInputBox);
// }

// init();
menuBar.addEventListener('click', toggleNav);
