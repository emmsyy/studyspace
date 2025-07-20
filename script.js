let mode = 'pomodoro';
let interval = null;

let pomodoroMinutes = 25;
let countdownMinutes = 5;
let stopwatchSeconds = 0;
let countdownInput = document.getElementById('countdownInput');
let display = document.getElementById('display');

function formatTime(totalSeconds) {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function setMode(newMode) {
  clearInterval(interval);
  mode = newMode;

  document.getElementById('countdownInputContainer').style.display = 'none';

  if (mode === 'pomodoro') {
    display.textContent = `${pomodoroMinutes}:00`;
    document.getElementById('startBtn').disabled = false;
    document.getElementById('stopBtn').disabled = true;
    document.getElementById('resetBtn').disabled = false;
  } else if (mode === 'countdown') {
    document.getElementById('countdownInputContainer').style.display = 'block';
    display.textContent = "00:00";
    document.getElementById('startBtn').disabled = false;
    document.getElementById('stopBtn').disabled = true;
    document.getElementById('resetBtn').disabled = true;
  } else if (mode === 'stopwatch') {
    stopwatchSeconds = 0;
    display.textContent = "00:00";
    document.getElementById('startBtn').disabled = false;
    document.getElementById('stopBtn').disabled = true;
    document.getElementById('resetBtn').disabled = false;
  } else if (mode === 'clock') {
    startClock();
    document.getElementById('startBtn').disabled = true;
    document.getElementById('stopBtn').disabled = true;
    document.getElementById('resetBtn').disabled = true;
  }
}

function startClock() {
  clearInterval(interval);
  interval = setInterval(() => {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    display.textContent = timeString;
  }, 1000);
}

let timerSecondsLeft = 0;

function startTimer() {
  if (mode === 'pomodoro') {
    timerSecondsLeft = pomodoroMinutes * 60;
  } else if (mode === 'countdown') {
    const val = parseInt(countdownInput.value);
    if (!val || val <= 0) {
      alert('Please enter a valid number of minutes');
      return;
    }
    timerSecondsLeft = val * 60;
    document.getElementById('resetBtn').disabled = false;
  } else if (mode === 'stopwatch') {
    interval = setInterval(() => {
      stopwatchSeconds++;
      display.textContent = formatTime(stopwatchSeconds);
    }, 1000);
    document.getElementById('startBtn').disabled = true;
    document.getElementById('stopBtn').disabled = false;
    return;
  } else {
    return;
  }

  document.getElementById('startBtn').disabled = true;
  document.getElementById('stopBtn').disabled = false;

  interval = setInterval(() => {
    if (timerSecondsLeft <= 0) {
      clearInterval(interval);
      alert("Time's up!");
      document.getElementById('startBtn').disabled = false;
      document.getElementById('stopBtn').disabled = true;
      return;
    }
    timerSecondsLeft--;
    display.textContent = formatTime(timerSecondsLeft);
  }, 1000);
}

function stopTimer() {
  clearInterval(interval);
  document.getElementById('startBtn').disabled = false;
  document.getElementById('stopBtn').disabled = true;
}

function resetTimer() {
  clearInterval(interval);

  if (mode === 'pomodoro') {
    display.textContent = `${pomodoroMinutes}:00`;
  } else if (mode === 'countdown') {
    display.textContent = "00:00";
    document.getElementById('resetBtn').disabled = true;
  } else if (mode === 'stopwatch') {
    stopwatchSeconds = 0;
    display.textContent = "00:00";
  }

  document.getElementById('startBtn').disabled = false;
  document.getElementById('stopBtn').disabled = true;

  if (mode === 'clock') {
    startClock();
  }
}

// GALLERY FUNCTIONS

let selectedBackground = '';

function toggleGallery() {
  const panel = document.getElementById('galleryPanel');
  panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
}

function selectBackground(src) {
  selectedBackground = src;
  const allImages = document.querySelectorAll('.image-options img');
  allImages.forEach(img => img.classList.remove('selected'));
  const chosen = Array.from(allImages).find(img => img.src === src);
  if (chosen) chosen.classList.add('selected');
}

function confirmBackground() {
  if (selectedBackground) {
    document.querySelector('.background').style.backgroundImage = `url('${selectedBackground}')`;
    toggleGallery();
  }
}

// Initialize
window.onload = () => {
  setMode('pomodoro');
};
