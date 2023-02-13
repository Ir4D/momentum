'use strict';

const time = document.querySelector('.time');
const date = document.querySelector('.date');
const dateOptions = {weekday: 'long', month: 'long', day: 'numeric'};

function showTime() {
  time.textContent = new Date().toLocaleTimeString();
  setTimeout(showTime, 1000);
}

function showDate() {
  date.textContent = new Date().toLocaleDateString('en-GB', dateOptions);
  console.log(new Date().toLocaleDateString('en-GB', dateOptions));
  setTimeout(showDate, 1000);
}

showTime();
showDate();

// console.log(date.toLocaleDateString('en-GB', dateOptions));
// console.log(date.toLocaleDateString('ru-RU', dateOptions));
// console.log(date.toLocaleDateString('el', dateOptions));

