const clockContainer = document.querySelector('.header__clock');

const addZero = (timeValue) => {
  if (timeValue < 10) {
    return `0${timeValue}`;
  }
  return timeValue;
};

const getTime = () => {
  const currentDate = new Date();
  const hour = addZero(currentDate.getHours());
  const minute = addZero(currentDate.getMinutes());
  const second = addZero(currentDate.getSeconds());

  return `${hour}:${minute}:${second}`;
};

const paintClock = () => {
  const currentTime = getTime();
  clockContainer.innerHTML = currentTime;
};

const init = () => {
  paintClock();
  setInterval(paintClock, 1000);
};

init();
