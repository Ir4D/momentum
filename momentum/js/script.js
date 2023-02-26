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
const settingsVars = {
  'time': {
    'en': 'Time',
    'ru': 'Время'
  },
  'date': {
    'en': 'Date',
    'ru': 'Дата'
  },
  'greeting': {
    'en': 'Greeting',
    'ru': 'Приветствие'
  },
  'quote': {
    'en': 'Quote',
    'ru': 'Цитата'
  },
  'weather': {
    'en': 'Weather',
    'ru': 'Погода'
  },
  'audio': {
    'en': 'Audio',
    'ru': 'Аудио'
  },
  'todolist': {
    'en': 'ToDo List',
    'ru': 'Список задач'
  },
  'language': {
    'en': 'Language',
    'ru': 'Язык'
  },
  'imgsrc': {
    'en': 'Image Source',
    'ru': 'Источник изображений'
  },
  'imgtag': {
    'en': 'Image Tag',
    'ru': 'Тэг изображений'
  },
  'placeholderTag': {
    'en': 'Enter tag for API',
    'ru': 'Введите тэг'
  }
}
const selectLang = document.querySelector('.lang');
const headingTime = document.querySelector('.heading-time');
const headingDate = document.querySelector('.heading-date');
const headingGreeting = document.querySelector('.heading-greeting');
const headingQuote = document.querySelector('.heading-quote');
const headingWeather = document.querySelector('.heading-weather');
const headingAudio = document.querySelector('.heading-audio');
const headingTodolist = document.querySelector('.heading-todolist');
const headingLang = document.querySelector('.heading-lang');
const headingImgSrc = document.querySelector('.heading-image');
const headingImgTag = document.querySelector('.heading-tag');
const inputTag = document.querySelector('.tag-input');
const setImage = document.querySelector('.set-image');
const todoVars = {
  'heading': {
    'en': 'Todo List',
    'ru': 'Список задач'
  },
  'text': {
    'en': 'Add a todo to get started',
    'ru': 'Добавьте задачу, чтобы начать'
  },
  'new': {
    'en': 'New Todo',
    'ru': 'Новая задача'
  }
}

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
  date.textContent = new Date().toLocaleDateString(dateVars[selectLang.value], dateOptions);
  setTimeout(showDate, 100);
}
showDate();

/* time of the day: morning, afternoon, evening, night */
let timeOfDay;
function getTimeOfDay() {
  const hours = new Date().getHours();
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
  setTimeout(getTimeOfDay, 1000);
  return timeOfDay;
}
getTimeOfDay();

/* add user name and city to the storage */
function setLocalStorage() {
  localStorage.setItem('userName', userName.value);
}
window.addEventListener('beforeunload', setLocalStorage);

function setCity() {
  localStorage.setItem('city', city.value);
}
city.addEventListener('change', setCity);

function setTag() {
  localStorage.setItem('tag', inputTag.value);
}
inputTag.addEventListener('change', setTag);

function setImageSrc() {
  localStorage.setItem('imgsrc', setImage.value);
}
setImage.addEventListener('change', setImageSrc);

function getLocalStorage() {
  if (localStorage.getItem('userName')) {
    userName.value = localStorage.getItem('userName');
  } else {
    userName.placeholder = placeHolderVars[selectLang.value];
  }
  if (localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
  } else {
    city.value = weatherVars['city'][selectLang.value];
  }
  if (localStorage.getItem('tag')) {
    inputTag.value = localStorage.getItem('tag');
  } else {
    inputTag.value = timeOfDay;
  }
  if (localStorage.getItem('imgsrc')) {
    setImage.value = localStorage.getItem('imgsrc');
    setBg();
  } else {
    setImage.value = 'github';
  }
}
window.addEventListener('load', getLocalStorage);

/* background renew */
function getRandomNum() {
  randomNum = Math.floor(Math.random() * 20 + 1);
  return randomNum;
}
getRandomNum()

async function getLinkToImageUnsplash() {
  const img = new Image();
  let tag = inputTag.value;
  const data = await fetch(`https://api.unsplash.com/photos/random?orientation=landscape&query=${tag}&client_id=B7uai_qStZx9jfAqxjJakxsJ5GEop8rDT-cQS4dZ_M0`);
  const result = await data.json();
  img.src = `${result.urls.regular}`;
  img.onload = () => {
    body.style.backgroundImage = `url('${result.urls.regular}')`;
  }
}

async function getLinkToImageFlickr() {
  const img = new Image();
  let tag = inputTag.value;
  let randomPhotoNum = Math.floor(Math.random() * 100);
  const data = await fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=0f15ff623f1198a1f7f52550f8c36057&tags=${tag}&extras=url_l&format=json&nojsoncallback=1`);
  const result = await data.json();
  img.src = `${result.photos.photo[randomPhotoNum].url_l}`;
  img.onload = () => {
    body.style.backgroundImage = `url('${result.photos.photo[randomPhotoNum].url_l}')`;
  }
}

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
}

function setBg() {
  if (setImage.value === 'github') {
    setBackground();
  } else if (setImage.value === 'unsplash') {
    getLinkToImageUnsplash();
  } else if (setImage.value === 'flickr') {
    getLinkToImageFlickr();
  }
}
setBg();

inputTag.addEventListener('change', () => {
  setBg();
})

setImage.addEventListener('change', () => {
  setBg();
});


/* background slider */
function getSlideNext() {
  if (setImage.value === 'github') {
    if (randomNum == 20) {
      randomNum = 1;
    } else {
      randomNum++;
    }
    setBackground();
  } else if (setImage.value === 'unsplash') {
    getLinkToImageUnsplash();
  } else if (setImage.value === 'flickr') {
    getLinkToImageFlickr();
  }
}
slideNext.addEventListener('click', getSlideNext);

function getslidePrev() {
  if (setImage.value === 'github') {
    if (randomNum == 1) {
      randomNum = 20;
    } else {
      randomNum--;
    }
    setBackground();
  } else if (setImage.value === 'unsplash') {
    getLinkToImageUnsplash();
  } else if (setImage.value === 'flickr') {
    getLinkToImageFlickr();
  }
}
slidePrev.addEventListener('click', getslidePrev);

/* weather widget */
async function getWeather() {
  if (city.value === '') {
    city.value = weatherVars['city'][selectLang.value];
  }
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
    wind.textContent = `${weatherVars['speed'][selectLang.value]}: ${Math.floor(data.wind.speed)} ${weatherVars['speedUnit'][selectLang.value]}`;
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


/* Settings */
const settingsBtn = document.querySelector('.settings-icon');
const settings = document.querySelector('.settings');

settingsBtn.addEventListener('click', () => {
  settings.classList.toggle('open');
})

document.addEventListener('click', (e) => {
  const clickSettings = e.composedPath().includes(settings);
  const clickSettingsBtn = e.composedPath().includes(settingsBtn);
  if (!clickSettings && !clickSettingsBtn) {
    settings.classList.remove('open');
  }
})

function setSettingsLang() {
  headingTime.textContent = `${settingsVars['time'][selectLang.value]}`;
  headingDate.textContent = `${settingsVars['date'][selectLang.value]}`;
  headingGreeting.textContent = `${settingsVars['greeting'][selectLang.value]}`;
  headingQuote.textContent = `${settingsVars['quote'][selectLang.value]}`;
  headingWeather.textContent = `${settingsVars['weather'][selectLang.value]}`;
  headingAudio.textContent = `${settingsVars['audio'][selectLang.value]}`;
  headingTodolist.textContent = `${settingsVars['todolist'][selectLang.value]}`;
  headingLang.textContent = `${settingsVars['language'][selectLang.value]}`;
  headingImgSrc.textContent = `${settingsVars['imgsrc'][selectLang.value]}`;
  headingImgTag.textContent = `${settingsVars['imgtag'][selectLang.value]}`;
  inputTag.placeholder = `${settingsVars['placeholderTag'][selectLang.value]}`;
}
setSettingsLang();

const settingTime = document.querySelector('.set-time');
const settingDate = document.querySelector('.set-date');
const settingGreeting = document.querySelector('.set-greeting');
const settingQuote = document.querySelector('.set-quote');
const settingWeather = document.querySelector('.set-weather');
const settingAudio = document.querySelector('.set-audio');
const settingTodolist = document.querySelector('.set-todolist');

function hideTime() {
  settingTime.classList.toggle('switch-off');
  time.classList.toggle('hide');
  if (settingTime.classList.contains('switch-off')) {
    localStorage.setItem('currentTime', 'switch-off');
  } else {
    localStorage.setItem('currentTime', 'switch-on');
  }
}
settingTime.addEventListener('click', hideTime);

function hideDate() {
  settingDate.classList.toggle('switch-off');
  date.classList.toggle('hide');
  if (settingDate.classList.contains('switch-off')) {
    localStorage.setItem('currentDate', 'switch-off');
  } else {
    localStorage.setItem('currentDate', 'switch-on');
  }
}
settingDate.addEventListener('click', hideDate);

const greetingContainer = document.querySelector('.greeting-container');
function hideGreeting() {
  settingGreeting.classList.toggle('switch-off');
  greetingContainer.classList.toggle('hide');
  if (settingGreeting.classList.contains('switch-off')) {
    localStorage.setItem('currentGreeting', 'switch-off');
  } else {
    localStorage.setItem('currentGreeting', 'switch-on');
  }
}
settingGreeting.addEventListener('click', hideGreeting);

const quoteContainer = document.querySelector('.quote-container');
function hideQuote() {
  settingQuote.classList.toggle('switch-off');
  quoteContainer.classList.toggle('hide');
  if (settingQuote.classList.contains('switch-off')) {
    localStorage.setItem('currentQuote', 'switch-off');
  } else {
    localStorage.setItem('currentQuote', 'switch-on');
  }
}
settingQuote.addEventListener('click', hideQuote);

const weather = document.querySelector('.weather');
function hideWeather() {
  settingWeather.classList.toggle('switch-off');
  weather.classList.toggle('hide');
  if (settingWeather.classList.contains('switch-off')) {
    localStorage.setItem('currentWeather', 'switch-off');
  } else {
    localStorage.setItem('currentWeather', 'switch-on');
  }
}
settingWeather.addEventListener('click', hideWeather);

const player = document.querySelector('.player');
function hideAudio() {
  settingAudio.classList.toggle('switch-off');
  player.classList.toggle('hide');
  if (settingAudio.classList.contains('switch-off')) {
    localStorage.setItem('currentAudio', 'switch-off');
  } else {
    localStorage.setItem('currentAudio', 'switch-on');
  }
}
settingAudio.addEventListener('click', hideAudio);

const todoContainer = document.querySelector('.todo-container');
function hideTodo() {
  settingTodolist.classList.toggle('switch-off');
  todoContainer.classList.toggle('hide');
  if (settingTodolist.classList.contains('switch-off')) {
    localStorage.setItem('currentTodo', 'switch-off');
  } else {
    localStorage.setItem('currentTodo', 'switch-on');
  }
}
settingTodolist.addEventListener('click', hideTodo);

function getLocalStorageSettings() {
  if (localStorage.getItem('currentTime') == 'switch-off') {
    settingTime.classList.add('switch-off');
    time.classList.add('hide');
  } else {
      settingTime.classList.remove('switch-off');
      time.classList.remove('hide');
  }
  if (localStorage.getItem('currentDate') == 'switch-off') {
    settingDate.classList.add('switch-off');
    date.classList.add('hide');
  } else {
    settingDate.classList.remove('switch-off');
    date.classList.remove('hide');
  }
  if (localStorage.getItem('currentGreeting') == 'switch-off') {
    settingGreeting.classList.add('switch-off');
    greetingContainer.classList.add('hide');
  } else {
    settingGreeting.classList.remove('switch-off');
    greetingContainer.classList.remove('hide');
  }
  if (localStorage.getItem('currentQuote') == 'switch-off') {
    settingQuote.classList.add('switch-off');
    quoteContainer.classList.add('hide');
  } else {
    settingQuote.classList.remove('switch-off');
    quoteContainer.classList.remove('hide');
  }
  if (localStorage.getItem('currentWeather') == 'switch-off') {
    settingWeather.classList.add('switch-off');
    weather.classList.add('hide');
  } else {
    settingWeather.classList.remove('switch-off');
    weather.classList.remove('hide');
  }
  if (localStorage.getItem('currentAudio') == 'switch-off') {
    settingAudio.classList.add('switch-off');
    player.classList.add('hide');
  } else {
    settingAudio.classList.remove('switch-off');
    player.classList.remove('hide');
  }
  if (localStorage.getItem('currentTodo') == 'switch-off') {
    settingTodolist.classList.add('switch-off');
    todoContainer.classList.add('hide');
  } else {
    settingTodolist.classList.remove('switch-off');
    todoContainer.classList.remove('hide');
  }
}
window.addEventListener('load', getLocalStorageSettings);


/* Todo List */
const todoMenu = document.querySelector('.todo-menu');
const todoContent = document.querySelector('.todo-content');
const todoBtn = document.querySelector('.todo-btn');
const todoNew = document.querySelector('.todo-new');
const todoHeading = document.querySelector('.todo-heading');
const todoBox = document.querySelector('.todo-box');
const todoList = document.querySelector('.todo-list');
const todoText = document.querySelector('.todo-text');
let allTasks = [];

if (localStorage.getItem('allTasks')) {
  allTasks = JSON.parse(localStorage.getItem('allTasks'));
  allTasks.forEach(function (task) {
    const taskClass = task.done ? 'task-title task-done' : 'task-title';
    const taskChecked = task.done ? 'checked' : '';
    const taskTemplate = `<li id="${task.id}" class="todo-item task">
                            <div class="task-info">
                              <input type="checkbox" class="task-checkbox" ${taskChecked}>
                              <span class="${taskClass}">${task.text}</span>
                            </div>
                            <div class="task-delete"></div>
                            </li>`
    todoList.insertAdjacentHTML('beforeend', taskTemplate);
    todoContent.style.height = 'auto';
    todoNew.value = '';
  })
}

todoMenu.addEventListener('click', () => {
  todoContent.classList.toggle('open');
})

document.addEventListener('click', (e) => {
  const clicktodoContent = e.composedPath().includes(todoContent);
  const clicktodoMenu = e.composedPath().includes(todoMenu);
  if (!clicktodoContent && !clicktodoMenu) {
    todoContent.classList.remove('open');
  }
})

todoBtn.addEventListener('click', (e) => {
  todoBtn.style.display = 'none';
  todoNew.style.display = 'block';
  todoNew.focus();
})

getEmptyTodoList();

function addTask() {
  const taskText = todoNew.value;
  const newTask = {
    id: Date.now(),
    text: taskText,
    done: false,
  };
  allTasks.push(newTask);
  const taskClass = newTask.done ? 'task-title task-done' : 'task-title';
  const taskTemplate = `<li id="${newTask.id}" class="todo-item task">
                    <div class="task-info">
                      <input type="checkbox" class="task-checkbox">
                      <span class="${taskClass}">${newTask.text}</span>
                    </div>
                    <div class="task-delete"></div>
                  </li>`
  
  todoList.insertAdjacentHTML('beforeend', taskTemplate);
  todoContent.style.height = 'auto';
  todoNew.value = '';
  getEmptyTodoList();
  setTodolist()
}
todoNew.addEventListener('change', addTask);

function deleteTask(event) {
  if (event.target.classList != 'task-delete') return;
  const itemToDelete = event.target.closest('.task');
  const id = Number(itemToDelete.id);
  const index = allTasks.findIndex(function (task) {
    console.log(task.id);
    return (task.id === id);
  });
  allTasks.splice(index, 1);
  itemToDelete.remove();
  getEmptyTodoList();
  setTodolist()
}
todoList.addEventListener('click', deleteTask);

function doTask(event) {
  if (event.target.type == 'checkbox') {
    event.target.closest('.task').querySelector('.task-title').classList.toggle('task-done');
  }
  const id = Number(event.target.closest('.task').id);
  const task = allTasks.find(function (task) {
    return task.id === id;
  });
  task.done = !task.done;
  setTodolist();
}
todoList.addEventListener('click', doTask);

function getEmptyTodoList() {
  if (allTasks.length == 0) {
    todoBox.classList.remove('closed');
    todoBtn.style.display = 'flex';
    todoNew.style.display = 'none';
    todoContent.style.height = '220px';
  } else {
    todoNew.style.display = 'block';
    todoBox.classList.add('closed');
    todoContent.style.height = 'auto';
  }
}

function setTodolist() {
  localStorage.setItem('allTasks', JSON.stringify(allTasks));
}

function setTodoLang() {
  todoHeading.textContent = `${todoVars['heading'][selectLang.value]}`;
  todoText.textContent = `${todoVars['text'][selectLang.value]}`;
  todoBtn.textContent = `${todoVars['new'][selectLang.value]}`;
  todoNew.placeholder = `${todoVars['new'][selectLang.value]}`;
}
setTodoLang();

// localStorage.clear();