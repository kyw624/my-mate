function init() {
  paintClock();
  paintDate();
  setInterval(paintClock, 1000);
}

function paintClock() {
  const clockContainer = document.querySelector('.header__clock');
  const currentTime = getDate('time');

  clockContainer.textContent = currentTime;
}

function paintDate() {
  const dateContainer = document.querySelector('.content__info-date');
  const currentDate = getDate('date');

  dateContainer.textContent = currentDate;
}

function getDate(type) {
  const currentDate = new Date();
  let result;

  if (type === 'time') {
    const hour = addZero(currentDate.getHours());
    const minute = addZero(currentDate.getMinutes());
    const second = addZero(currentDate.getSeconds());

    result = `${hour}:${minute}:${second}`;

    // 날짜 넘어가면 갱신
    if (result === '00:00:00') {
      paintDate();
    }
  } else {
    const DAY_LIST = ['일', '월', '화', '수', '목', '금', '토'];

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const date = currentDate.getDate();
    const day = currentDate.getDay();

    result = `${year}. ${month}. ${date}.(${DAY_LIST[day]})`;
  }

  return result;
}

function addZero(timeValue) {
  if (timeValue < 10) {
    return `0${timeValue}`;
  }
  return timeValue;
}

init();
