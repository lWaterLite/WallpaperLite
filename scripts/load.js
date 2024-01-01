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

function onMounted() {
  let clock = new Clock();
  updateClock(clock)
  aphorismBlock.textContent = "有死而荣，无生而辱。\n-《只狼：影逝二度》"
  setInterval(() => {
    updateClock(clock);
  }, 1000)
}

export {onMounted}