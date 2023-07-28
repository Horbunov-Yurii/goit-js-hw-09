

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import notiflix from 'notiflix';

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  daysRef: document.querySelector('[data-days]'),
  hoursRef: document.querySelector('[data-hours]'),
  minutesRef: document.querySelector('[data-minutes]'),
  secondsRef: document.querySelector('[data-seconds]'),
  timerRef: document.querySelector('.timer'),
  timerElems: document.querySelectorAll('.field'),
};

refs.startBtn.disabled = true;
refs.timerRef.style.display = 'flex';
refs.timerRef.style.marginTop = '15px';
refs.timerElems.forEach(elem => (elem.style.marginRight = '15px'));

let currentDate = new Date();
let selectedDate = new Date();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    if (selectedDate < currentDate) {
      notiflix.Notify.warning('Please choose a date in the future');
    } else {
      refs.startBtn.disabled = false;
    }
  },
};

flatpickr(refs.input, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

let selectedTime;
let timerCounter = {};

function timerStart() {
  selectedTime = setInterval(() => {
    currentDate = new Date();
    if (currentDate < selectedDate) {
      timerCounter = convertMs(selectedDate - currentDate);
      timerCount(timerCounter);
    } else {
      clearInterval(selectedTime);
    }
  }, 1000);
}

function timerCount(timerCounter) {
  refs.daysRef.innerHTML = addLeadingZero(timerCounter.days);
  refs.hoursRef.innerHTML = addLeadingZero(timerCounter.hours);
  refs.minutesRef.innerHTML = addLeadingZero(timerCounter.minutes);
  refs.secondsRef.innerHTML = addLeadingZero(timerCounter.seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

refs.startBtn.addEventListener('click', timerStart);






// import flatpickr from 'flatpickr';
// import 'flatpickr/dist/flatpickr.min.css';


// const inputEl = document.querySelector('#datetime-picker');
// const btnStart = document.querySelector('[data-start]');
// const timerEl = document.querySelector('.timer');
// btnStart.disabled = true;

// let timerId = nul;
// let timerDeadline = null;
// flatpickr('#datetime-picker', {
//      enableTime: true,
//      time_24hr: true,
//      defaultDate: Date.now(),
//      minuteIncrement: 1,
//      onClose(selectedDates) {
//         timerDeadline = selectedDates[0]
//     if(selectedDates[0] < Date.now()){
//         btnStart.disabled = true;
//         alert("Please choose a date in the future")

//     }else{
//         btnStart.disabled = false;
//     }
//     console.log(selectedDates[0]);
// },
// });


// btnStart.addEventListener('click', startCount);

// function startCount(){
//     timerId = setInterval(() => {
//         const selectedDate = new Date(inputEl.value).getTime();
//         console.log(selectedDate);


//         const countedTime = selectedDate - Date.now();
//         const timeRemaining = convertMs(countedTime);
//         console.log(countedTime);

//      if(countedTime < 1000) {

//         clearInterval(timerId);
//      }

//       timerEl.querySelector('[data-days]').textContent = formatTime(timeRemaining.days);
//       timerEl.querySelector('[data-hours]').textContent = formatTime(timeRemaining.hours);
//       timerEl.querySelector('[data - minutes]').textContent = formatTime(timeRemaining.minutes);
//       timerEl.querySelector('[data-seconds]').textContent = formatTime(timeRemaining.seconds);








//     }, 1000);
// }




// function formatTime(time){
//     return time.toString().padStart(2, "0");
// }


// function convertMs(ms) {
 
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

 
//   const days = Math.floor(ms / day);
 
//   const hours = Math.floor((ms % day) / hour);

//   const minutes = Math.floor(((ms % day) % hour) / minute);

//   const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//   return { days, hours, minutes, seconds };
// }


