'use strict';

const time = document.querySelector('.time');
const date = document.querySelector('.date');
const dateOptions = {weekday: 'long', month: 'long', day: 'numeric'};
const greeting = document.querySelector('.greeting');
const userName = document.querySelector('.name');
const body = document.querySelector('body');
let randomNum;

// show current time
function showTime() {
  time.textContent = new Date().toLocaleTimeString();
  setTimeout(showTime, 1000);
}

// show date: 'Tuesday, 14 February'
function showDate() {
  date.textContent = new Date().toLocaleDateString('en-GB', dateOptions);
  setTimeout(showDate, 1000);
}

// time of the day: morning, afternoon, evening, night
function getTimeOfDay() {
  const hours = new Date().getHours();
  let timeOfDay;
  if (0 <= hours/6 && hours/6 < 1) {
    timeOfDay = 'night';
  } else if (1 <= hours/6 && hours/6 < 2) {
    timeOfDay = 'morning';
  } else if (2 <= hours/6 && hours/6 < 3) {
    timeOfDay = 'afternoon';
  } else if (3 <= hours/6 && hours/6 < 4) {
    timeOfDay = 'evening';
  };
  greeting.textContent = `Good ${timeOfDay},`;
  setTimeout(getTimeOfDay, 1000);
  return timeOfDay;
}

// add user name to the storage
function setLocalStorage() {
  localStorage.setItem('userName', userName.value);
}

function getLocalStorage() {
  if (localStorage.getItem('userName')) {
    userName.value = localStorage.getItem('userName');
  }
}

showTime();
showDate();
getTimeOfDay();
window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);


// background renew

function getRandomNum() {
  randomNum = Math.floor(Math.random() * 20 + 1);
  console.log(randomNum);
  return randomNum;
}

getRandomNum()

function setBackground() {
  const img = new Image();
  let timeOfDay = getTimeOfDay();
  // let backgroundNum = randomNum;
  if (randomNum < 10) {
    randomNum = '0' + randomNum;
  };
  img.src = `https://raw.githubusercontent.com/Ir4D/stage1-tasks/assets/images/${timeOfDay}/${randomNum}.jpg`;
  img.onload = () => {
    body.style.backgroundImage = `url('https://raw.githubusercontent.com/Ir4D/stage1-tasks/assets/images/${timeOfDay}/${randomNum}.jpg')`;
  }
  return randomNum;
}

setBackground();

// background slider

const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');

function getSlideNext() {
  if (randomNum == 20) {
    randomNum = 1;
  } else {
    randomNum++;
  }
  setBackground();
  console.log(randomNum);
}

function getslidePrev() {
  if (randomNum == 1) {
    randomNum = 20;
  } else {
    randomNum--;
  }
  setBackground();
  console.log(randomNum);
}

slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getslidePrev);