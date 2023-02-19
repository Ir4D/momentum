'use strict';

const time = document.querySelector('.time');
const date = document.querySelector('.date');
const dateOptions = {weekday: 'long', month: 'long', day: 'numeric'};
const greeting = document.querySelector('.greeting');
const userName = document.querySelector('.name');
const body = document.querySelector('body');
let randomNum;
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity')
const city = document.querySelector('.city');
const weatherError = document.querySelector('.weather-error');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');
let quoteNumber;

/* show current time */
function showTime() {
  time.textContent = new Date().toLocaleTimeString();
  setTimeout(showTime, 1000);
}
showTime();

/* show date: 'Tuesday, 14 February' */
function showDate() {
  date.textContent = new Date().toLocaleDateString('en-GB', dateOptions);
  setTimeout(showDate, 1000);
}
showDate();

/* time of the day: morning, afternoon, evening, night */
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
getTimeOfDay();

/* add user name and city to the storage */
function setLocalStorage() {
  localStorage.setItem('userName', userName.value);
  localStorage.setItem('city', city.value);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem('userName')) {
    userName.value = localStorage.getItem('userName');
  }
  if (localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
  } else {
    city.value = 'Minsk';
  }
}
window.addEventListener('load', getLocalStorage);

/* background renew */
function getRandomNum() {
  randomNum = Math.floor(Math.random() * 20 + 1);
  return randomNum;
}
getRandomNum()

function setBackground() {
  const img = new Image();
  let timeOfDay = getTimeOfDay();
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

/* background slider */
function getSlideNext() {
  if (randomNum == 20) {
    randomNum = 1;
  } else {
    randomNum++;
  }
  setBackground();
}
slideNext.addEventListener('click', getSlideNext);

function getslidePrev() {
  if (randomNum == 1) {
    randomNum = 20;
  } else {
    randomNum--;
  }
  setBackground();
}
slidePrev.addEventListener('click', getslidePrev);

/* weather widget */
async function getWeather() {
  if (city.value === '') {
    city.value = 'Minsk';
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=0fe1a130729e5592daaf209c9d35966d&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.cod == '404' || !city.value === ' ') {
    console.log('Not found');
    weatherError.textContent = `Error! City not found for '${city.value}'!`;
    weatherIcon.style.display = 'none';
    temperature.textContent = '';
    weatherDescription.textContent = '';
    wind.textContent = '';
    humidity.textContent = '';
  } else {
    weatherError.textContent = '';
    weatherIcon.style.display = 'inline';
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.floor(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `Wind speed: ${Math.floor(data.wind.speed)} m/s`;
    humidity.textContent = `Humidity: ${Math.floor(data.main.humidity)}%`;
  }
}
city.addEventListener('change', getWeather);
window.addEventListener('load', () => {
  getWeather()
});

/* quote of the day */
function getQuoteNumber(dataLength) {
  quoteNumber = Math.floor(Math.random() * dataLength);
  return quoteNumber;
}

async function getQuotes() {  
  const quotes = 'data.json';
  const res = await fetch(quotes);
  const data = await res.json();
  getQuoteNumber(data.length);
  quote.textContent = data[quoteNumber].text;
  author.textContent = data[quoteNumber].author;
}
getQuotes();
changeQuote.addEventListener('click', getQuotes);
