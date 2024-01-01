import aphorismJson from "../assets/data/aphorism.json" assert {type: "json"};


const aphorismBlock = document.getElementById("aphorism-text");
const dateBlock = document.getElementById("date");
const timeBlock = document.getElementById("time");
const metaBlock = document.getElementById("meta");

const en_week_days_name = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


class Clock {
  constructor() {
    let time = new Date();
    this.hour = time.getHours();
    this.minute = time.getMinutes();
    this.second = time.getSeconds();
    this.day = time.getDay();
    this.month = time.getMonth()+1;
    this.year = time.getFullYear();
    this.weekday = en_week_days_name[this.day]
  }
}

function addLeadingZero(number) {
  if (number < 10) {
    return number.toString().padStart(2, '0');
  }
  return number.toString();
}

function updateClock(clock) {
  clock = new Clock();
  let date_string = `${clock.year}.${addLeadingZero(clock.month)}.${addLeadingZero(clock.day)} ${clock.weekday}`
  let time_string = `${addLeadingZero(clock.hour)}:${addLeadingZero(clock.minute)}:${addLeadingZero(clock.second)}`
  dateBlock.textContent = date_string;
  timeBlock.textContent = time_string;
}

function getRandomAphorismObject(aphorismHtmlElement) {
  let randomAphorism = aphorismJson.aphorism[Math.floor(Math.random() * aphorismJson.aphorism.length)];
  while (randomAphorism === aphorismHtmlElement.textContent) {
    randomAphorism = aphorismJson.aphorism[Math.floor(Math.random() * aphorismJson.aphorism.length)];
  }

  if (typeof randomAphorism === "string"){
    const matches = randomAphorism.match(/\n/g);
    const lineCount = matches ? matches.length+1 : 1;
    let fontSize = 32 - lineCount * 4;
    if (fontSize <= 0) {
      return {
        fontSize: 28,
        text: "Oops, motto go wrong.\n-developer lWaterLite"
      }
    }
    return {
      text: randomAphorism,
      fontSize: fontSize
    }
  }
  else if (typeof randomAphorism === "object"){
    if ('fontSize' in randomAphorism && 'text' in randomAphorism) return randomAphorism
    else return {
      fontSize: 28,
      text: "Oops, motto go wrong.\n-developer lWaterLite"
    }
  }
  else return {
      fontSize: 28,
      text: "Oops, motto go wrong.\n-developer lWaterLite"
    }
}

function updateAphorism(aphorismHtmlElement, aphorismObject) {
  aphorismHtmlElement.textContent = aphorismObject.text;
  aphorismHtmlElement.style.fontSize = `${aphorismObject.fontSize}px`;
}

function onMounted() {
  let randomAphorismObject = getRandomAphorismObject(aphorismBlock);
  let clock = new Clock();
  updateClock(clock)
  updateAphorism(aphorismBlock, randomAphorismObject);

  setInterval(() => {
    updateClock(clock);
  }, 1000)
}

export {onMounted}