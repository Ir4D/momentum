'use strict';

import playList from './playList.js';

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
const audio = new Audio();
const play = document.querySelector('.play');
const playNext = document.querySelector('.play-next');
const playPrev = document.querySelector('.play-prev');
let isPlay = false;
let playNum = 0;
const playListLength = playList.length;
const playArr = document.getElementsByTagName('li');
const playListContainer = document.querySelector('.play-list');


const dateVars = {
  'en': 'en-US',
  'ru': 'ru-RU'
}
let timeOfDayNum;
const placeHolderVars = {
  'en': '[Enter name]',
  'ru': '[Введите имя]'
}
const weatherVars = {
  'city': {
    'en': 'Minsk',
    'ru': 'Минск'
  },
  'speed': {
    'en': 'Wind speed',
    'ru': 'Скорость ветра'
  },
  'speedUnit': {
    'en': 'm/s',
    'ru': 'м/с'
  },
  'humidity': {
    'en': 'Humidity',
    'ru': 'Влажность'
  }
}
const greetingTranslation = {
  'en': ['Good night,', 'Good morning,', 'Good afternoon,', 'Good evening,'],
  'ru': ['Доброй ночи,', 'Доброе утро,', 'Добрый день,', 'Добрый вечер,']
}
const selectLang = document.querySelector('.lang');

playList.forEach(elem => {
  const li = document.createElement('li');
  li.classList.add('play-item');
  li.classList.add('play-item__play');
  li.textContent = elem.title;
  playListContainer.append(li);
});


/* show current time */
function showTime() {
  time.textContent = new Date().toLocaleTimeString();
  setTimeout(showTime, 1000);
}
showTime();

/* show date: 'Tuesday, 14 February' */
function showDate() {
  // date.textContent = new Date().toLocaleDateString('en-GB', dateOptions);
  date.textContent = new Date().toLocaleDateString(dateVars[selectLang.value], dateOptions);
  setTimeout(showDate, 100);
}
showDate();

/* time of the day: morning, afternoon, evening, night */
function getTimeOfDay() {
  const hours = new Date().getHours();
  let timeOfDay;
  if (0 <= hours/6 && hours/6 < 1) {
    timeOfDay = 'night';
    timeOfDayNum = 0;
  } else if (1 <= hours/6 && hours/6 < 2) {
    timeOfDay = 'morning';
    timeOfDayNum = 1;
  } else if (2 <= hours/6 && hours/6 < 3) {
    timeOfDay = 'afternoon';
    timeOfDayNum = 2;
  } else if (3 <= hours/6 && hours/6 < 4) {
    timeOfDay = 'evening';
    timeOfDayNum = 3;
  };
  // greeting.textContent = `Good ${timeOfDay},`;
  setTimeout(getTimeOfDay, 1000);
  return timeOfDay;
}
getTimeOfDay();

/* add user name and city to the storage */
function setLocalStorage() {
  localStorage.setItem('userName', userName.value);
  // localStorage.setItem('city', city.value);
}
window.addEventListener('beforeunload', setLocalStorage);

function setCity() {
  localStorage.setItem('city', city.value);
}
city.addEventListener('change', setCity);

function getLocalStorage() {
  if (localStorage.getItem('userName')) {
    userName.value = localStorage.getItem('userName');
  } else {
    userName.placeholder = placeHolderVars[selectLang.value];
  }

  if (localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
  } else {
    // city.value = 'Minsk';
    city.value = weatherVars['city'][selectLang.value];
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
    // city.value = 'Minsk';
    city.value = weatherVars['city'][selectLang.value];
  }
  // const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=0fe1a130729e5592daaf209c9d35966d&units=metric`;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${selectLang.value}&appid=0fe1a130729e5592daaf209c9d35966d&units=metric`;
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
    // wind.textContent = `Wind speed: ${Math.floor(data.wind.speed)} m/s`;
    wind.textContent = `${weatherVars['speed'][selectLang.value]}: ${Math.floor(data.wind.speed)} ${weatherVars['speedUnit'][selectLang.value]}`;
    // humidity.textContent = `Humidity: ${Math.floor(data.main.humidity)}%`;
    humidity.textContent = `${weatherVars['humidity'][selectLang.value]}: ${Math.floor(data.main.humidity)}%`;
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
  // quote.textContent = data[quoteNumber].text;
  // author.textContent = data[quoteNumber].author;
  if (selectLang.value === 'en') {
    quote.textContent = data[quoteNumber].en.text;
    author.textContent = data[quoteNumber].en.author;
  } else if (selectLang.value === 'ru') {
    quote.textContent = data[quoteNumber].ru.text;
    author.textContent = data[quoteNumber].ru.author;
  }

}
getQuotes();
changeQuote.addEventListener('click', getQuotes);


/* audio player */
const playLittle = document.querySelectorAll('.play-item');
const audioPlayer = document.querySelector('.audio-player');
const songName = document.querySelector('.song-name');
for (let i = 0; i < playLittle.length; i++) {
  playLittle[i].addEventListener('click', playAudioList(i));
}

function playAudio() {
  document.querySelectorAll('.play-item').forEach(n => {
    n.classList.remove('item-active');
  });
  audio.src = playList[playNum].src;
  playArr[playNum].classList.add('item-active');
  songName.textContent = playList[playNum].title;
  audio.currentTime = 0;
  toggleBtn();
  toggleBtnMin();
  if (!isPlay) {
    audio.play();
    isPlay = true;
  } else {
    audio.pause();
    isPlay = false;
  }
  if (!isPlay) {
    playLittle[playNum].classList.remove('play-item__pause');
  }
}

function toggleBtn() {
  play.classList.toggle('pause');
}

function toggleBtnMin() {
  for (let i = 0; i < playLittle.length; i++) {
    if (playLittle[i].classList.contains('play-item__pause')) {
      playLittle[i].classList.remove('play-item__pause');
    }
    if (i == playNum) {
      playLittle[i].classList.toggle('play-item__pause');
    }
  }
}

function playNextAudio() {
  if (playNum == (playListLength - 1)) {
    playNum = 0;
  } else {
    playNum++;
  }
  if (!isPlay) {
    play.classList.add('pause');
  } 
  isPlay = false;
  playAudio();
  toggleBtn();
}

function playPrevAudio() {
  if (playNum == 0) {
    playNum = playListLength - 1;
  } else {
    playNum--;
  }
  if (!isPlay) {
    play.classList.add('pause');
  } 
  isPlay = false;
  playAudio();
  toggleBtn();
}

function playAudioList(i) {
  return function() {
    if (isPlay && i == playNum) {
      audio.pause();
      isPlay = false;
      toggleBtn();
      playLittle[i].classList.remove('play-item__pause');
    } else if (!isPlay) {
      playNum = i;
      playAudio();
    } else {
      playNum = i;
      isPlay = false;
      toggleBtn();
      playAudio();
    }
  };
}

play.addEventListener('click', playAudio);
playNext.addEventListener('click', playNextAudio);
playPrev.addEventListener('click', playPrevAudio);
audio.addEventListener('ended', playNextAudio);


/* advanced audio player */
const timeline = audioPlayer.querySelector('.timeline');
const volumeSlider = audioPlayer.querySelector('.volume-slider');

audio.addEventListener("loadeddata", () => {
  audioPlayer.querySelector('.time-audio .length').textContent = getTimeCode(audio.duration);
  audio.volume = .50;
}, 
false);

timeline.addEventListener('click', event => {
  audio.currentTime = event.offsetX / parseInt(window.getComputedStyle(timeline).width) * audio.duration;
}, 
false);

volumeSlider.addEventListener('click', event => {
  audio.volume = event.offsetX / parseInt(window.getComputedStyle(volumeSlider).width);
  audioPlayer.querySelector('.volume-percentage').style.width = audio.volume * 100 + '%';
}, 
false);

setInterval(() => {
  audioPlayer.querySelector('.progress').style.width = audio.currentTime / audio.duration * 100 + '%';
  audioPlayer.querySelector('.time-audio .current').textContent = getTimeCode(audio.currentTime);
}, 
500);

audioPlayer.querySelector('.volume').addEventListener('click', () => {
  const volume = audioPlayer.querySelector('.volume-container .volume');
  audio.muted = !audio.muted;
  if (audio.muted) {
    volume.classList.remove('volume-icon');
    volume.classList.add('volume-icon__muted');
  } else {
    volume.classList.add('volume-icon');
    volume.classList.remove('volume-icon__muted');
  }
});

function getTimeCode(number) {
  let sec = parseInt(number);
  let min = parseInt(sec / 60);
  sec -= min * 60;
  const hour = parseInt(min / 60);
  min -= hour * 60;
  if (hour === 0) return `${min}:${String(sec % 60).padStart(2, 0)}`;
  return `${String(hour).padStart(2, 0)}:${min}:${String(sec % 60).padStart(2, 0)}`;
}


/* language change */
selectLang.addEventListener('change', changeLangURL);

function changeLangURL() {
  let language = selectLang.value;
  location.href = window.location.pathname + '#' + language;
  location.reload();
}

function changeLang() {
  let langHash = window.location.hash;
  langHash = langHash.substr(1);
  if (langHash != 'en' && langHash != 'ru') {
    location.href = window.location.pathname + '#' + 'en';
    location.reload();
  }
  selectLang.value = langHash;
  greeting.innerHTML = greetingTranslation[langHash][timeOfDayNum];
}
changeLang();


// localStorage.clear();