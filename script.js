
const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = new Date();
let countdownActive;
let savedCountdown;

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
    countdownActive = setInterval(() => {  //with setInterval() a function gets run repeatedly after a given interval, in this case after every second 
        const now = new Date().getTime();
        const distance = countdownValue - now; // calculate how far is the end of the countdown
        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);
        // Hide Input
        inputContainer.hidden = true;
        // If Countdown has ended, show Complete
        if (distance < 0) {
            countdownEl.hidden === true;
            clearInterval(countdownActive);
            completeElInfo.textContent = `${countdownTitle} countdown finished on ${countdownDate}`;
            completeEl.hidden = false;
        } else {
            // Else,show countdown in progress
            countdownElTitle.textContent = `${countdownTitle}`;
            timeElements[0].textContent = `${days}`;
            timeElements[1].textContent = `${hours}`;
            timeElements[2].textContent = `${minutes}`;
            timeElements[3].textContent = `${seconds}`;
            completeEl.hidden = true;
            countdownEl.hidden = false;
        }
        }, second);
}

// Take Values from Form Input
function updateCountdown(ev) {
    ev.preventDefault(); // this prevent the page to refresh when we submit the data as it tries to send them to a database through a network request
    countdownTitle = ev.srcElement[0].value;
    countdownDate = ev.srcElement[1].value;
    savedCountdown = {          // save datas for local storage
        title: countdownTitle,
        date: countdownDate
    }
    localStorage.setItem('countdown', JSON.stringify(savedCountdown)); //from js object to a JSON string
    // Check for valid date
    if (countdownDate === '') {
        alert('Please select a date for the countdown.')
    } else {
        // Get number value(milliseconds) of current Date, update DOM
        countdownValue = new Date(countdownDate).getTime(); 
        updateDOM(); 
    }
}

// Reset All Values
function reset() {
    // Hide Countdowns, Show Input
    countdownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false;
    // Stop Countdown
    clearInterval(countdownActive);
    // Reset Values
    countdownTitle = '';
    countdownDate = '';
    localStorage.removeItem('countdown');
}

function restorePreviousCountdown(){
    // Get countdown from local storage if available
    if (localStorage.getItem('countdown')) {
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown')); // from JSON string to js object or value
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

// Event Listeners
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

//  On load, check local storage
restorePreviousCountdown();