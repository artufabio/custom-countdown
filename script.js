
const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;

const second = 1000; // milliseconds
const minute = 60 * second;
const hour = 60 * minute;
const day = 24 * hour;

// Set today's date as minimun input for date picker  
//toISOString() returns the date as a string. We split the array at the 'T' in the string and we keep the first part of the returned array as we only need the date and not the time   
const today = new Date().toISOString().split('T')[0]; 
dateEl.setAttribute('min', today);

// Populate Countdown / Complete UI
function updateDOM() {
    const now = new Date().getTime();
    const distance = countdownValue - now; // calculate how far is the end of the countdown
    console.log('dist: ',distance);

    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);
    console.log(days,hours, minutes,seconds);

    // Populate countdown
    countdownElTitle.textContent = `${countdownTitle}`;
    timeElements[0].textContent = `${days}`;
    timeElements[1].textContent = `${hours}`;
    timeElements[2].textContent = `${minutes}`;
    timeElements[3].textContent = `${seconds}`;

    // Hide Input
    inputContainer.hidden = true;
    // Show Countdown
    countdownEl.hidden = false;
}

// Take Values from Form Input
function updateCountdown(ev) {
    ev.preventDefault(); // this prevent the page to refresh when we submit the data as it tries to send them to a database through a network request
    countdownTitle = ev.srcElement[0].value;
    countdownDate = ev.srcElement[1].value;
    console.log(countdownDate, countdownTitle);
    // Get number value(milliseconds) of current Date, update DOM
    countdownValue = new Date(countdownDate).getTime();
    console.log('mill: ',countdownValue); 
    updateDOM(); 
}

// Event Listeners
countdownForm.addEventListener('submit', updateCountdown);