var countdownInterval;
var countdownTime = 0;
var popupInterval;
var audio;
var paused = false;
document.addEventListener('DOMContentLoaded', function () {
  const stopPauseButton = document.getElementById('stopPauseButton');
  const resetButton = document.getElementById('resetButton');
  const hoursInput = document.getElementById('hoursInput');
  const minutesInput = document.getElementById('minutesInput');
  const secondsInput = document.getElementById('secondsInput');
  const editButton = document.getElementById('editButton');
  const popupStopButton = document.getElementById('popupStopButton');

  stopPauseButton.addEventListener('click', toggleStopPause);
  resetButton.addEventListener('click', resetTimer);
  editButton.addEventListener('click', editTimer);
  popupStopButton.addEventListener('click', stopPopup);
});


function toggleStopPause() {
  const hours = parseInt(hoursInput.value);
  const minutes = parseInt(minutesInput.value);
  const seconds = parseInt(secondsInput.value);

  if (isNaN(hours) || isNaN(minutes) || isNaN(seconds) ) {
    alert("Invalid time format. Please use valid values for HH, MM, and SS.");
    return;
  }

  if (hours === 0 && minutes === 0 && seconds === 0) {
    alert("Please enter a valid time greater than 00:00:00.");
    return;
  }

  if (!countdownInterval && !paused) {
    countdownTime = hours * 3600 + minutes * 60 + seconds;
    updateCountdownDisplay();
    startTimer();
    if (countdownTime > 0) {
      document.getElementById("stopPauseButton").innerText = "Pause";
    }
  }
      
  else if (paused) {
    resumeTimer();
    document.getElementById("stopPauseButton").innerText = "Pause";
  } else {
    pauseTimer();
    document.getElementById("stopPauseButton").innerText = "Resume";
  }
}


function pauseTimer() {
  clearInterval(countdownInterval);
  paused = true;
}

function resumeTimer() {
  paused = false;
  countdownInterval = setInterval(updateCountdown, 1000);
}

function startTimer() {
  const hours = parseInt(hoursInput.value);
  const minutes = parseInt(minutesInput.value);
  const seconds = parseInt(secondsInput.value);

  if (isNaN(hours) || isNaN(minutes) || isNaN(seconds) ) {
    alert("Invalid time format. Please use valid values for HH, MM, and SS.");
    return;
  }

  countdownTime = hours * 3600 + minutes * 60 + seconds;
  updateCountdownDisplay();

  // Start the countdown interval
  countdownInterval = setInterval(updateCountdown, 1000);
}


 

function updateCountdownDisplay() {
  var hours = Math.floor(countdownTime / 3600);
  var minutes = Math.floor((countdownTime % 3600) / 60);
  var seconds = countdownTime % 60;
  
  var formattedTime = formatTime(hours) + ":" + formatTime(minutes) + ":" + formatTime(seconds);
  document.getElementById("countdown").innerText = formattedTime;
}

function formatTime(time) {
  return time.toString().padStart(2, '0');
}

function updateCountdown() {
  countdownTime--;
  updateCountdownDisplay();
  
  if (countdownTime <= 0) {
    clearInterval(countdownInterval);
    showPopup();
  }
}

function resetTimer() {
  clearInterval(countdownInterval);
  stopBeepSound();
  countdownTime = 0;
  updateCountdownDisplay();
  location.reload();

  // Reset the button text back to "Start"
  document.getElementById("stopPauseButton").innerText = "Start";
  paused = false;

}




function showPopup() {
  var popup = document.getElementById("popup");
  popup.style.display = "block"; // Change display to block
  playBeepSound();
  popupInterval = setInterval(playBeepSound, 1000);
  
  // Reset the button label and state after popup
  document.getElementById("stopPauseButton").innerText = "Start";
  paused = false;
  clearInterval(countdownInterval);
}

function stopPopup() {
  var popup = document.getElementById("popup");
  popup.style.display = "none"; // Change display to none
  clearInterval(popupInterval);
  stopBeepSound();
}
function resetPOPTimer(){
  clearInterval(countdownInterval);
  stopBeepSound();
  countdownTime = 0;
  updateCountdownDisplay();

  // Reset the button text back to "Start"
  document.getElementById("stopPauseButton").innerText = "Start";
  paused = false;

}
function restartPopup() {
  stopPopup(); // Close the popup if open
  resetPOPTimer();
  startTimer();
}

function playBeepSound() {
  if (!audio) {
    audio = new Audio("beep.wav"); // Replace "beep.wav" with the path to your beep sound file
  }
  audio.play();
}

function stopBeepSound() {
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }
}
function stopTimer() {
  clearInterval(countdownInterval);
  stopPopup();
}
// Function to toggle the theme
function toggleTheme() {
  const body = document.body;
  body.classList.toggle('dark-mode');
  body.classList.toggle('light-mode');
  
  // Store the theme preference in localStorage
  const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
  localStorage.setItem('theme', currentTheme);
}

// Check for saved theme preference when the page loads
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
} else {
  document.body.classList.add('light-mode');
}

// Attach the toggleTheme function to the theme toggle button
document.getElementById('themeToggle').addEventListener('click', toggleTheme);


// Function to update the current time
function updateCurrentTime() {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();

  document.getElementById("hours").textContent = formatTime(hours);
  document.getElementById("minutes").textContent = formatTime(minutes);
  document.getElementById("seconds").textContent = formatTime(seconds);
}

// Call the updateCurrentTime function initially and set an interval to update it every second
updateCurrentTime();
setInterval(updateCurrentTime, 1000);

// Function to update the current day and date
function updateCurrentDate() {
  const currentDate = new Date();
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const dayOfWeek = daysOfWeek[currentDate.getDay()];
  const date = currentDate.getDate();
  const month = months[currentDate.getMonth()];
  const year = currentDate.getFullYear();

  document.getElementById("day").textContent = dayOfWeek;
  document.getElementById("date").textContent = `${date} ${month} ${year}`;
}

// Call the updateCurrentDate function initially and set an interval to update it every day
updateCurrentDate();
setInterval(updateCurrentDate, 86400000); // 24 hours in milliseconds
