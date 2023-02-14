'use strict';

const time = document.querySelector('.time');
const date = document.querySelector('.date');
const dateOptions = {weekday: 'long', month: 'long', day: 'numeric'};
const greeting = document.querySelector('.greeting');
const hours = new Date().getHours();
const userName = document.querySelector('.name');

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
