let mode = 'pomodoro';
let interval;
let time = 1500; // default: 25 min
let isRunning = false;

function setMode(newMode) {
  clearInterval(interval);
  isRunning = false;
  mode = newMode;

  const display = document.getElementById("display");
  const controls = document.getElementById("controls");
  controls.innerHTML = "";

  switch (mode) {
    case 'pomodoro':
      time = 1500;
      display.textContent = formatTime(time);
      controls.innerHTML = `
        <button onclick="startPomodoro()">Start</button>
        <button onclick="pause()">Pause</button>
        <button onclick="resetPomodoro()">Reset</button>
      `;
      break;

    case 'countdown':
      time = 0;
      display.textContent = formatTime(time);
      controls.innerHTML = `
        <input id="countdownInput" type="number" placeholder="Minutes" min="1" />
        <button onclick="startCountdown()">Start</button>
        <button onclick="pause()">Pause</button>
        <button onclick="resetCountdown()">Reset</button>
      `;
      break;

    case 'stopwatch':
      time = 0;
      display.textContent = formatTime(time);
      controls.innerHTML = `
        <button onclick="startStopwatch()">Start</button>
        <button onclick="pause()">Pause</button>
        <button onclick="resetStopwatch()">Reset</button>
      `;
      break;

    case 'clock':
      updateClock();
      interval = setInterval(updateClock, 1000);
      break;
  }
}

function formatTime(t) {
  const m = Math.floor(t / 60);
  const s = t % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

// --- Pomodoro ---
function startPomodoro() {
  if (isRunning) return;
  isRunning = true;
  interval = setInterval(() => {
    if (time > 0) {
      time--;
      document.getElementById("display").textContent = formatTime(time);
    } else {
      clearInterval(interval);
      isRunning = false;
      alert("Pomodoro complete!");
    }
  }, 1000);
}

function pause() {
  clearInterval(interval);
  isRunning = false;
}

function resetPomodoro() {
  pause();
  time = 1500;
  document.getElementById("display").textContent = formatTime(time);
}

// --- Countdown ---
function startCountdown() {
  if (isRunning) return;
  const input = document.getElementById("countdownInput");
  if (input && input.value) {
    time = parseInt(input.value) * 60;
  }
  isRunning = true;
  interval = setInterval(() => {
    if (time > 0) {
      time--;
      document.getElementById("display").textContent = formatTime(time);
    } else {
      clearInterval(interval);
      isRunning = false;
      alert("Time's up!");
    }
  }, 1000);
}

function resetCountdown() {
  pause();
  time = 0;
  document.getElementById("display").textContent = formatTime(time);
}

// --- Stopwatch ---
function startStopwatch() {
  if (isRunning) return;
  isRunning = true;
  interval = setInterval(() => {
    time++;
    document.getElementById("display").textContent = formatTime(time);
  }, 1000);
}

function resetStopwatch() {
  pause();
  time = 0;
  document.getElementById("display").textContent = formatTime(time);
}

// --- Clock ---
function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  document.getElementById("display").textContent = `${h}:${m}:${s}`;
}

// Default load
setMode('pomodoro');
