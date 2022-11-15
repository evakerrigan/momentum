const lang = {
  ru: {
    town: 'Минск',
    localeDate: 'ru-RU',
    greetingTextMorning: 'Доброе утро',
    greetingTextDay: 'Добрый день',
    greetingTextEvening: 'Добрый вечер',
    greetingTextNight: 'Доброй ночи',
    nameInputPlaceholder: '[Введите ваше имя...]',
    cityInputPlaceholder: '[Введите город...]',
    settingsInputPlaceholder: 'Введите тег...',
    todoInputPlaceholder: 'Добавить задачу...',
    humidityText: 'Влажность ',
    speedWindText: 'Скорость ветра: ',
    errorText: 'Вы ничего не ввели.',
    errorNotFoundText: 'Такой город не найден: ',
    quotes: 'js/RU-quotes.json',
    setTitle: 'Настройки',
    setLanguage: 'Язык',
    setAudio: 'Музыка',
    setWeather: 'Погода',
    setTime: 'Время',
    setDate: 'Дата',
    setGreeting: 'Приветствие',
    setQuote: 'Цитаты',
    setBackground: 'Фон',
    setTodo: 'Дела'    
  },
  en: {
    town: 'Minsk',
    localeDate: 'en-EN',
    greetingTextMorning: 'Good morning',
    greetingTextDay: 'Good afternoon',
    greetingTextEvening: 'Good evening',
    greetingTextNight: 'Good night',
    nameInputPlaceholder: '[Tell me your name...]', 
    cityInputPlaceholder: '[Enter city...]',
    settingsInputPlaceholder: 'Select tag...',
    todoInputPlaceholder: 'Add new task...',
    humidityText: 'Humidity ',
    speedWindText: 'SpeedWind ',
    errorText: 'You not enter.',
    errorNotFoundText: 'This city not found: ',
    quotes: 'js/EN-quotes.json',
    setTitle: 'Settings',
    setLanguage: 'Language',
    setAudio: 'Audio',
    setWeather: 'Weather',
    setTime: 'Time',
    setDate: 'Date',
    setGreeting: 'Greeting',
    setQuote: 'Quote',
    setBackground: 'Background',
    setTodo: 'Todo'
  }
}

import playList from './playList.js';
//console.log('0: ', playList);

const datePage = document.querySelector('.date');
const quote = document.querySelector('.quote');
let greetingTime = '';
let greetingText;
const author = document.querySelector('.author');
const greeting = document.querySelector('.greeting');

let langKey;
const setLangRu = document.querySelector('.set-lang-ru');
const setLangEn = document.querySelector('.set-lang-en');

const city = document.querySelector('.city');

if (localStorage.getItem('langStorage')) {
  getLocalStorageLang();
  if (langKey === 'ru') {
    setLangEn.classList.remove('active');
    setLangRu.classList.add('active');
  } else {
    setLangEn.classList.add('active');
    setLangRu.classList.remove('active');
  }
  allLangChange();
} else {
  langKey = 'ru';
  allLangChange();
}


function allLangChange() {
  getWeather();
  getQuotes();
  showDate();
  showGreetingText();
  changeSettingLang();
  document.querySelector('.todo-addtask').placeholder = lang[langKey].todoInputPlaceholder;
  document.querySelector('.name').placeholder = lang[langKey].nameInputPlaceholder;
  document.querySelector('.city').placeholder = lang[langKey].cityInputPlaceholder;
}

function changeSettingLang() {
  document.querySelector('.settings-title').textContent = `${lang[langKey].setTitle}`;
  document.querySelector('.set-language span').textContent = `${lang[langKey].setLanguage}`;
  document.querySelector('.set-audio span').textContent = `${lang[langKey].setAudio}`;
  document.querySelector('.set-weather span').textContent = `${lang[langKey].setWeather}`;
  document.querySelector('.set-time span').textContent = `${lang[langKey].setTime}`;
  document.querySelector('.set-date span').textContent = `${lang[langKey].setDate}`;
  document.querySelector('.set-greeting span').textContent = `${lang[langKey].setGreeting}`;
  document.querySelector('.set-quote span').textContent = `${lang[langKey].setQuote}`;
  document.querySelector('.set-image span').textContent = `${lang[langKey].setBackground}`;  
  document.querySelector('.set-todo span').textContent = `${lang[langKey].setTodo}`;
  document.querySelector('.set-tag').placeholder = lang[langKey].settingsInputPlaceholder;
}

/*************************** 0 *** local storage lang **************************/



setLangRu.addEventListener('click',() => {
  setLangRu.classList.add('active');
  setLangEn.classList.remove('active');
  langKey = 'ru';
  setLocalStorageLang();
  //console.log('0: setlangRu = ', langKey);
  allLangChange();
});
setLangEn.addEventListener('click',() => {
  setLangEn.classList.add('active');
  setLangRu.classList.remove('active');
  langKey = 'en';
  setLocalStorageLang();
  //console.log('0: setlangEn = ', langKey);
  allLangChange();
});


function setLocalStorageLang() {
  localStorage.setItem('langStorage', langKey);
}


function getLocalStorageLang() {
  if(localStorage.getItem('langStorage')) {
    langKey = localStorage.getItem('langStorage');
  }
}


//console.log('0: langStorage = ', langKey);


/*************************** 1 *** clock time **************************/

const time = document.querySelector('.time');

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;
  setTimeout(showTime, 1000);  
  showDate(); 
  getTimeOfDay();
  showGreetingText(); 
}
showTime();

function showDate() {
  const date1 = new Date();
  const options = {weekday: 'long', month: 'long', day: 'numeric'};
  const currentDate = date1.toLocaleDateString(lang[langKey].localeDate, options);
  datePage.textContent = currentDate;
}

/*************************** 2 *** greating **************************/

function showGreetingText() {  

  greetingText = 'greetingText' + greetingTime;

  greeting.textContent = lang[langKey][greetingText] + ',';

  //console.log('2: greetingText = ', greetingText);
  //console.log('2: lang[langKey].greetingTextDay = ', lang[langKey][greetingText]);
  
}
function getTimeOfDay() {
  const date2 = new Date();
  const currentHour = date2.getHours(); 
  //console.log('2: currentHour = ', currentHour);

  if (currentHour>=6 && currentHour<12) {greetingTime = 'Morning';}
  else if (currentHour>=12 && currentHour<18) {greetingTime = 'Day';}
  else if (currentHour>=18 && currentHour<24) {greetingTime = 'Evening';}
  else if (currentHour>=0 && currentHour<6) {greetingTime = 'Night';}
  
  //console.log('2: greetingTime = ', greetingTime);

}


/*************************** 2+ *** naming **************************/

const nameInput = document.querySelector('.name');
nameInput.placeholder = lang[langKey].nameInputPlaceholder;

function setLocalStorage() {
  localStorage.setItem('nameStorage', nameInput.value);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if(localStorage.getItem('nameStorage')) {
    nameInput.value = localStorage.getItem('nameStorage');
  }
}
window.addEventListener('load', getLocalStorage);

//console.log('2: nameInput.value = ', nameInput.value);


/*************************** 3 *** slider **************************/

const body = document.querySelector('body');
const slidePrev = document.querySelector('.slide-prev');
const slideNext = document.querySelector('.slide-next');

let bgNum = getRandomNum(1, 20);
//console.log('3: bgNum = ', bgNum);

function setBg() {  
  const img = new Image();
  img.src = 'https://raw.githubusercontent.com/evakerrigan/momentum-backgrounds/main/' + greetingTime.toLowerCase()+ '/' + bgNum.toString().padStart(2, 0) + '.webp';
  //console.log('3: imgUrl =', img.src );
  img.onload = () => {
    body.style.backgroundImage = `url(${img.src})`;
  }
}
setBg();

slidePrev.addEventListener('click', getSlidePrev);
slideNext.addEventListener('click', getSlideNext);

function getSlidePrev() {

  if (document.querySelector('.set-github').classList.contains('active')) {
    if (bgNum === 1) {
      bgNum = 20;
      setBg();
    } else {
      bgNum = bgNum - 1;
      setBg();
    } 
  } else if (document.querySelector('.set-flickr').classList.contains('active')) {
    getFlickrImg();
  } else {
    getUnsplashImg();
  }
 

}
function getSlideNext() {

  if (document.querySelector('.set-github').classList.contains('active')) {
    if (bgNum === 20) {
      bgNum = 1;
      setBg();
    } else {
      bgNum = bgNum + 1;
      setBg();
    }
  } else if (document.querySelector('.set-flickr').classList.contains('active')) {
    getFlickrImg();
  } else {
    getUnsplashImg();
  }

}

function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  //console.log('0: random =', randomNum);
  return randomNum;  
}

/*************************** 4 *** weathermap **************************/

//03161e6b7b162037a87b38eada6be5a6

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');

const speedWind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const error = document.querySelector('.weather-error');
//localStorage.setItem('cityStorage', 'Бангкок');
//city.value = 'Бангкок';
city.placeholder = lang[langKey].cityInputPlaceholder;

function getCity() {
  if (localStorage.getItem('cityStorage')) {
    city.value = localStorage.getItem("cityStorage");
  } else {
    city.value = `${lang[langKey].town}`; 
  }
  getWeather();
}
getCity();

city.addEventListener('change', () => {  
  setLocalStorageCity();
  //console.log('4: city.value = ', city.value);
  getLocalStorageCity();
  getWeather();  
});

function setLocalStorageCity() {
  localStorage.setItem('cityStorage', city.value);
}
function getLocalStorageCity() {
  if(localStorage.getItem('cityStorage')) {
    city.value = localStorage.getItem('cityStorage');
  }
}
//window.addEventListener('load', getLocalStorageCity);

async function getWeather() { 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${langKey}&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
  const res = await fetch(url);
  const data = await res.json(); 

  if (data.cod !== '404' && data.cod !== '400') {
    //console.log('4: все хорошо');
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    speedWind.textContent = lang[langKey].speedWindText + `${data.wind.speed.toFixed(0)} м/с`;
    humidity.textContent = lang[langKey].humidityText + `${data.main.humidity.toFixed(0)}%`;
    error.textContent = '';
  } else if (city.value === '') {
    //console.log('4: строка пустая');
    weatherIcon.className = 'weather-icon owf';
    temperature.textContent = '';
    weatherDescription.textContent = '';
    speedWind.textContent = '';
    humidity.textContent = '';
    error.textContent = lang[langKey].errorText;
  } else {
    //console.log('4: опечатка при написании');
    weatherIcon.className = 'weather-icon owf';
    temperature.textContent = '';
    weatherDescription.textContent = '';
    speedWind.textContent = '';
    humidity.textContent = '';
    error.textContent = lang[langKey].errorNotFoundText + `${city.value}`;
  }

  

  //console.log('4:', data.weather[0].id, data.weather[0].description, data.main.temp);
}

window.addEventListener('DOMContentLoaded', () => {
  getLocalStorageCity();
  getWeather();
  });

/*************************** 5 *** quote **************************/



const changeQuote = document.querySelector('.change-quote');

//console.log('5: lang[langKey].quotes =', `${lang[langKey].quotes}`);


async function getQuotes() {  
  //const quotes = 'js/data.json';
  const quotes = `${lang[langKey].quotes}`;
  //console.log('5: quotes = ', quotes);

  const res = await fetch(quotes);
  const data = await res.json();   
  const randomQuotes = getRandomNum(1, data.length-1);
  quote.textContent = data[randomQuotes].text;
  author.textContent = data[randomQuotes].author;
  //console.log('5: data =', data);  
  //console.log('5: randomQuotes =', randomQuotes);
  //console.log('5: quote =', data[randomQuotes].text);
}
getQuotes();

changeQuote.addEventListener('click', () => {
  getQuotes();
});

/*************************** 6 *** 7 *** audio **************************/
const songsList = document.querySelector('.play-list');
for (let i = 0; i < playList.length; i++) {
    const li = document.createElement('li');  
    li.classList.add('play-item');
    const span = document.createElement('span');
    span.classList.add('song-title');
    span.textContent = playList[i].title;
    li.appendChild(span); 
    songsList.append(li); 
  }
let playItem = document.querySelectorAll('.play-item');
playItem[0].classList.add('item-active'); 

const play = document.querySelector('.play');
const playPrev = document.querySelector('.play-prev');
const playNext = document.querySelector('.play-next');
let isPlay = false;

const audio = new Audio(); 

let songNum = 0;
let audioCurrentTime = 0;
let songName = document.querySelector('.song-name-title');
let songDurationTime = document.querySelector('.song-duration-time');

songDurationTime.innerHTML = playList[songNum].duration;

function playAudio() {

  audio.src = playList[songNum].src;
  //console.log('6: songNum = ', songNum);
  audio.currentTime = audioCurrentTime;
  playItem[songNum].classList.add('item-active'); 
  songName.innerHTML = playList[songNum].title;
 
  if (!isPlay) {
    audio.play();  
    isPlay = true; 
    play.classList.add('pause');
    playItem[songNum].classList.add('song-pause');
  } else {
    audio.pause(); 
    audioCurrentTime = audio.currentTime; 
    //console.log('6: audioCurrentTime = ', audioCurrentTime);
    isPlay = false; 
    play.classList.remove('pause');
    playItem[songNum].classList.remove('song-pause');
  } 
}

play.addEventListener('click', playAudio);

function nextSong() { 
  audioCurrentTime = 0; 
  if (isPlay) { 
    playAudio();
  } 

  if (songNum < playList.length - 1) {
    songNum = songNum + 1;
    playItem[songNum-1].classList.remove('item-active');   
  } else if (songNum === playList.length - 1) {
    playItem[songNum].classList.remove('item-active');    
    songNum = 0;          
  }  
  playAudio();
}
playNext.addEventListener('click', nextSong);

function prevSong() {
  audioCurrentTime = 0; // начинается с 0
  if (isPlay) {
    playAudio();
  }

  if (songNum > 0) {
    songNum = songNum - 1;
    playItem[songNum+1].classList.remove('item-active'); 
  }
  else if (songNum === 0) {
    playItem[songNum].classList.remove('item-active'); 
    songNum = playList.length-1;
  }   
  playAudio(); 
}
playPrev.addEventListener('click', prevSong);

audio.addEventListener('ended', nextSong);

playItem.forEach((item, i) => {
  item.addEventListener('click', () => {

    if (songNum === i) { 
      playAudio();
    }
    if (songNum !== i) { 
      audioCurrentTime = 0;
      
      if (isPlay) {
        playAudio();
      }
      if (playItem[songNum].classList.contains('item-active')) {
        playItem[songNum].classList.remove('item-active'); 
      } else {
        playItem[songNum].classList.add('item-active'); 
      }
      songNum = i;
      playAudio();
    } 
  })
});

const volumeIcon = document.querySelector('.volume-icon');

volumeIcon.addEventListener('click', () => {

  audio.muted = !audio.muted;
  if (audio.muted) {
    volumeIcon.classList.add('mute');
  } else {
    volumeIcon.classList.remove('mute');
  }
});

const audioVolume = document.getElementById("audioVolume");

audioVolume.addEventListener("input", () => {

  audio.volume = Math.trunc(audioVolume.value) / 100;

  if (audioVolume.value == 0) {
    volumeIcon.classList.add('mute');
  } else { 
    volumeIcon.classList.remove('mute');
  }
});

function formatTime(seconds) {
  let min = Math.floor((seconds / 60));
  let sec = Math.floor(seconds - (min * 60));
  if (sec < 10){ 
      sec  = `0${sec}`;
  };
  return `${min}:${sec}`;
};

//прогрессбар трека

const audioProgress = document.getElementById("audioProgress");
let songDuration = document.querySelector('.song-duration-time');
let songCurrentTime = document.querySelector('.song-current-time'); 

 function updateProgressValue() {
    if (audio.duration) {
        audioCurrentTime = audio.currentTime;
        songDuration.innerHTML = `${playList[songNum].duration}`;
        songCurrentTime.innerHTML = formatTime(audio.currentTime); 
        audioProgress.value = 100 * (audio.currentTime / audio.duration); 
      if (audioProgress.value === audio.duration) { 
        playNext();
      }
    }
  };
  audio.addEventListener("timeupdate", updateProgressValue);

  audioProgress.addEventListener("input", () => {
    if (audio.duration) {
      audio.currentTime = (audioProgress.value * audio.duration) / 100; 
      if (audioProgress.value === audio.duration) {
        playNext();
      }
    }
  });

  if (audioProgress.value === audio.duration) {
    playNext();
  }

//const play = document.querySelector('.play.player-icon');

 /*if(!isPlay) {
    audio.pause();
    isPlay = false;
  } else {
    audio.src = playList[playNum].src;
    audio.play();
    isPlay = true;
  }*/
/*function toggleBtn() {
  button.classList.toggle('pause');
}
button.addEventListener('click', toggleBtn);*/


/*************************** 8 *** translate **************************/

const greetingTranslation = {

}


/*************************** 9 *** api **************************/

const setGithub = document.querySelector('.set-github');
const setFlickr = document.querySelector('.set-flickr');
const setUnsplash = document.querySelector('.set-unsplash');

let tagInput = document.querySelector('.set-tag');

setGithub.addEventListener('click', function() { 
  setGithub.classList.add('active');
  setFlickr.classList.remove('active');
  setUnsplash.classList.remove('active');
  tagInput.value = '';
  tagInput.setAttribute("disabled", "disabled"); 
  localStorage.setItem('backgroundStorage', 'github');
  setBg();
});
setFlickr.addEventListener('click', function() { 
  setFlickr.classList.add('active');
  setGithub.classList.remove('active');
  setUnsplash.classList.remove('active');
  tagInput.value = '';
  tagInput.removeAttribute("disabled", "disabled");
  localStorage.setItem('backgroundStorage', 'flickr');
  getFlickrImg();
});
setUnsplash.addEventListener('click', function() { 
  setUnsplash.classList.add('active');
  setFlickr.classList.remove('active');
  setGithub.classList.remove('active');
  tagInput.value = '';
  tagInput.removeAttribute("disabled", "disabled");
  localStorage.setItem('backgroundStorage', 'unsplash');
  getUnsplashImg();
});


tagInput.addEventListener('change', () => {
  if (document.querySelector('.set-flickr').classList.contains('active')) {
    getFlickrImg();
  } else if (document.querySelector('.set-unsplash').classList.contains('active')) {
    getUnsplashImg();
  }
})

//источник - Unsplash
async function getUnsplashImg() {  
  const img = new Image();
  let url;
  if (tagInput.value.length !== 0) {
    url =`https://api.unsplash.com/photos/random?orientation=landscape&query=${tagInput.value}&client_id=QJw7jDhAqO-Ix0KCrXiPxvhnuJB3oSgl5EtUw3iIwY8`;
  } else {
    url =`https://api.unsplash.com/photos/random?orientation=landscape&query=${greetingTime}&client_id=QJw7jDhAqO-Ix0KCrXiPxvhnuJB3oSgl5EtUw3iIwY8`;
  }
  const res = await fetch(url);
  const data = await res.json();
  if (data.cod !== '403' && data.cod !== '404' && data.cod !== '400') {
    img.src = `${data.urls.regular}`;
    img.onload = () => {
    body.style.backgroundImage = `url(${data.urls.regular})`;
    };
  } 
}
//источник - Flickr
async function getFlickrImg() { 
  const img = new Image(); 
  let url;
  if (tagInput.value.length !== 0) {
    url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=abbf821d41346be582303a8b017433f1&tags=${tagInput.value}&extras=url_l&format=json&nojsoncallback=1&safe_search=1`;
  } else {
    url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=abbf821d41346be582303a8b017433f1&tags=${greetingTime}&extras=url_l&format=json&nojsoncallback=1&safe_search=1`;
  }
  const res = await fetch(url);
  const data = await res.json();
  let flickrNumber = getRandomNum(1, 99);
  if (data.cod !== '403' && data.cod !== '404' && data.cod !== '400') {
    img.src = `${data.photos.photo[flickrNumber].url_l}`;
    img.onload = () => {
    body.style.backgroundImage = `url(${data.photos.photo[flickrNumber].url_l})`;
    };
  }
}




/*************************** 10 *** settings **************************/

/*const state = {
  language: 'en',
  photoSource: 'github',
  blocks: ['time', 'date','greeting', 'quote', 'weather', 'audio', 'todolist']
}*/

/*let setCheck = document.querySelectorAll('.set-check');

let items = setCheck;

for (let item of items) {
  item.addEventListener('click', function() {  
    item.classList.toggle('active'); 
  })
}*/
const settingsBtn = document.querySelector('.settings-block');
const audioBtn = document.querySelector('.set-audio-btn');
const weatherBtn = document.querySelector('.set-weather-btn');
const timeBtn = document.querySelector('.set-time-btn');
const dateBtn = document.querySelector('.set-date-btn');
const greetingBtn = document.querySelector('.set-greeting-btn');
const quoteBtn = document.querySelector('.set-quote-btn');
const todoBtn = document.querySelector('.set-todo-btn');
//const widgets = document.querySelectorAll('widget');

settingsBtn.addEventListener('click', function() {  
  //document.querySelector('.player').classList.toggle('active'); 
  if (document.querySelector('.settings').classList.contains("active")) {
    document.querySelector('.settings').classList.remove('active');
    localStorage.setItem('settingsStorage', '');
 } else {
    document.querySelector('.settings').classList.add('active');
    localStorage.setItem('settingsStorage', 'active');
 }
});
audioBtn.addEventListener('click', function() {  
  //document.querySelector('.player').classList.toggle('active'); 
  if (audioBtn.classList.contains("active")) {
    audioBtn.classList.remove('active');
    document.querySelector('.player').classList.remove('active');
    localStorage.setItem('audioBtnStorage', '');
 } else {
    audioBtn.classList.add('active');
    document.querySelector('.player').classList.add('active');
    localStorage.setItem('audioBtnStorage', 'active');
 }
});
weatherBtn.addEventListener('click', function() {  
  //document.querySelector('.weather').classList.toggle('active'); 
  if (weatherBtn.classList.contains("active")) {
    weatherBtn.classList.remove('active');
    document.querySelector('.weather').classList.remove('active');
    localStorage.setItem('weatherBtnStorage', '');
 } else {
    weatherBtn.classList.add('active');
    document.querySelector('.weather').classList.add('active');
    localStorage.setItem('weatherBtnStorage', 'active');
 }
});
timeBtn.addEventListener('click', function() {  
  //document.querySelector('.time').classList.toggle('active');
  if (timeBtn.classList.contains("active")) {
    timeBtn.classList.remove('active');
    document.querySelector('.time').classList.remove('active');
    localStorage.setItem('timeBtnStorage', '');
 } else {
    timeBtn.classList.add('active');
    document.querySelector('.time').classList.add('active');
    localStorage.setItem('timeBtnStorage', 'active'); 
 }
});
dateBtn.addEventListener('click', function() {  
  //document.querySelector('.date').classList.toggle('active'); 
  if (dateBtn.classList.contains("active")) {
    dateBtn.classList.remove('active');
    document.querySelector('.date').classList.remove('active');
    localStorage.setItem('dateBtnStorage', '');
 } else {
    dateBtn.classList.add('active');
    document.querySelector('.date').classList.add('active');
    localStorage.setItem('dateBtnStorage', 'active');
 }
});
greetingBtn.addEventListener('click', function() {  
  //document.querySelector('.greeting-container').classList.toggle('active'); 
  if (greetingBtn.classList.contains("active")) {
    greetingBtn.classList.remove('active');
    document.querySelector('.greeting-container').classList.remove('active');
    localStorage.setItem('greetingBtnStorage', '');
 } else {
    greetingBtn.classList.add('active');
    document.querySelector('.greeting-container').classList.add('active');
    localStorage.setItem('greetingBtnStorage', 'active');
 }
});
quoteBtn.addEventListener('click', function() {  
  //document.querySelector('.quotes-wrapper').classList.toggle('active'); 
  if (quoteBtn.classList.contains("active")) {
    quoteBtn.classList.remove('active');
    document.querySelector('.quotes-wrapper').classList.remove('active');
    localStorage.setItem('quoteBtnStorage', '');
 } else {
    quoteBtn.classList.add('active');
    document.querySelector('.quotes-wrapper').classList.add('active');
    localStorage.setItem('quoteBtnStorage', 'active');
 }
});
todoBtn.addEventListener('click', function() {  
  //document.querySelector('.todo').classList.toggle('active'); 
  if (todoBtn.classList.contains("active")) {
    todoBtn.classList.remove('active');
    document.querySelector('.todo-wrapper').classList.remove('active');
    localStorage.setItem('todoBtnStorage', '');
 } else {
    todoBtn.classList.add('active');
    document.querySelector('.todo-wrapper').classList.add('active');
    localStorage.setItem('todoBtnStorage', 'active');
 }
});

window.addEventListener('load', function() {
  //settings
  if (localStorage.getItem('settingsStorage')) {
    if (localStorage.getItem('settingsStorage') === 'active') {    
      document.querySelector('.settings').classList.add('active');
      settingsBtn.classList.add('active');
    } else {
      document.querySelector('.settings').classList.remove('active');
      settingsBtn.classList.remove('active');
    }
  }

  //audio
  if (localStorage.getItem('audioBtnStorage')) {
    if (localStorage.getItem('audioBtnStorage') === 'active') {    
      document.querySelector('.player').classList.add('active');
      audioBtn.classList.add('active');
    } else {
      document.querySelector('.player').classList.remove('active');
      audioBtn.classList.remove('active');
    }
  }
  //weather
  if (localStorage.getItem('weatherBtnStorage')) {
    if (localStorage.getItem('weatherBtnStorage') === 'active') {    
      document.querySelector('.weather').classList.add('active');
      weatherBtn.classList.add('active');
    } else {
      document.querySelector('.weather').classList.remove('active');
      weatherBtn.classList.remove('active');
    }
  }
  //time
  if (localStorage.getItem('timeBtnStorage')) {
    if (localStorage.getItem('timeBtnStorage') === 'active') {    
      document.querySelector('.time').classList.add('active');
      timeBtn.classList.add('active');
    } else {
      document.querySelector('.time').classList.remove('active');
      timeBtn.classList.remove('active');
    }
  }
  //date
  if (localStorage.getItem('dateBtnStorage')) {
    if (localStorage.getItem('dateBtnStorage') === 'active') {    
      document.querySelector('.date').classList.add('active');
      dateBtn.classList.add('active');
    } else {
      document.querySelector('.date').classList.remove('active');
      dateBtn.classList.remove('active');
    }
  }
  //greeting
  if (localStorage.getItem('greetingBtnStorage')) {
    if (localStorage.getItem('greetingBtnStorage') === 'active') {    
      document.querySelector('.greeting-container').classList.add('active');
      greetingBtn.classList.add('active');
    } else {
      document.querySelector('.greeting-container').classList.remove('active');
      greetingBtn.classList.remove('active');
    }
  }
  //quote
  if (localStorage.getItem('quoteBtnStorage')) {
    if (localStorage.getItem('quoteBtnStorage') === 'active') {    
      document.querySelector('.quotes-wrapper').classList.add('active');
      quoteBtn.classList.add('active');
    } else {
      document.querySelector('.quotes-wrapper').classList.remove('active');
      quoteBtn.classList.remove('active');
    }
  }
    //todo
    if (localStorage.getItem('todoBtnStorage')) {
      if (localStorage.getItem('todoBtnStorage') === 'active') {    
        document.querySelector('.todo-wrapper').classList.add('active');
        todoBtn.classList.add('active');
      } else {
        document.querySelector('.todo-wrapper').classList.remove('active');
        todoBtn.classList.remove('active');
      }
    }
    //background
    if (localStorage.getItem('backgroundStorage') === 'github') {    
      document.querySelector('.set-github').classList.add('active');
      document.querySelector('.set-flickr').classList.remove('active');
      document.querySelector('.set-unsplash').classList.remove('active');
      setBg();
    } else if (localStorage.getItem('backgroundStorage') === 'flickr') {
      document.querySelector('.set-flickr').classList.add('active');
      document.querySelector('.set-github').classList.remove('active');
      document.querySelector('.set-unsplash').classList.remove('active');
      getFlickrImg();
    } else if (localStorage.getItem('backgroundStorage') === 'unsplash'){
      document.querySelector('.set-unsplash').classList.add('active');
      document.querySelector('.set-flickr').classList.remove('active');
      document.querySelector('.set-github').classList.remove('active');
      getUnsplashImg();
    }
});


/***************************** todo *********************************/

const todoButton = document.querySelector('.todo-btn');
const addButton = document.querySelector('.add-btn');
const tasksList = document.querySelector('.tasks-list');
const addTask = document.querySelector('.todo-addtask');

function addNewTask() {
  let li = document.createElement("li");
  li.classList.add('new-task-item');
  let div = document.createElement("div");
  div.classList.add('task-wrapper');
  let divBtn = document.createElement("button");
  divBtn.classList.add('cancel');
  li.appendChild(div);
  li.appendChild(divBtn);
  let divCheck = document.createElement("span");
  divCheck.classList.add('check');
  div.appendChild(divCheck);
  let newTask = document.createElement("p");
  newTask.classList.add('new-task');
  div.appendChild(newTask);
  let inputValue = document.getElementById("todo-input").value;
  let text = document.createTextNode(inputValue);
  newTask.appendChild(text);
  if (!inputValue == "") {
    tasksList.appendChild(li);
  }
  localStorage.setItem('todo-tasks', tasksList.innerHTML);
}
addButton.addEventListener("click", () => {
  addNewTask();
  document.querySelector('input[id="todo-input"]').value = "";
});

tasksList.addEventListener("click", function (e) {

  if (e.target.tagName === "SPAN") {
    e.target.parentNode.classList.toggle("task-done");
    e.target.classList.toggle('check-active');
  }
  if (e.target.tagName === "BUTTON") {
    e.target.parentNode.remove();
  }
  localStorage.setItem('todo-tasks', tasksList.innerHTML);
});

window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('todo-tasks'))
    tasksList.innerHTML = localStorage.getItem('todo-tasks');
});

/***************************** task tracker *********************************/

const trackerInfoTime = document.querySelector('.tracker-info-time');
const trackerAllTime = document.querySelector('.tracker-all-time');
const clearBtn = document.querySelector('.tracker-clear');
const startBtn = document.querySelector('.start-btn');
const stopBtn = document.querySelector('.stop-btn');

let startTrackerTime = 0;
let currentTimeTracker = 0;
let allTimeTracker;
if (localStorage.getItem('all-tracker')) {
  allTimeTracker = localStorage.getItem('all-tracker');
} else {allTimeTracker = 0;}

let trackerNow;
let timeoutTracker;

trackerInfoTime.textContent = currentTimeTracker;
trackerAllTime.textContent = allTimeTracker;

function getTimeTrackerNow() {
  trackerNow = Date.now();
}

function showTimeTracker() {
  timeoutTracker = setTimeout(showTimeTracker, 60000);
  getTimeTrackerNow();
  currentTimeTracker = ((trackerNow - startTrackerTime)/60000)|0;
  showTrackerEnd();
}

function showTrackerEnd() {
  
  trackerInfoTime.textContent = currentTimeTracker;
  trackerAllTime.textContent = allTimeTracker;
}

startBtn.addEventListener('click', function() {  

    startBtn.classList.remove('active');
    startBtn.setAttribute('disabled', true);
    stopBtn.removeAttribute('disabled');
    stopBtn.classList.add('active');
    getTimeTrackerNow();
    startTrackerTime = trackerNow;
    showTimeTracker();
    localStorage.setItem('start-tracker', startTrackerTime);

});

stopBtn.addEventListener('click', function() {  

  stopBtn.classList.remove('active');
  stopBtn.setAttribute('disabled', true);
  startBtn.removeAttribute('disabled');
  startBtn.classList.add('active');
  getTimeTrackerNow();  
  startTrackerTime = localStorage.getItem('start-tracker');
  currentTimeTracker = ((trackerNow - startTrackerTime)/60000)|0;
  
  localStorage.setItem('start-tracker', 0);
  allTimeTracker = +allTimeTracker + +currentTimeTracker;
  localStorage.setItem('all-tracker', allTimeTracker);
  showTrackerEnd();
  clearTimeout(timeoutTracker);

});

clearBtn.addEventListener('click', function() {
  localStorage.setItem('all-tracker', 0);
  trackerInfoTime.textContent = 0;
  trackerAllTime.textContent = 0;
});