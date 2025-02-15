// settings.js - Manage user settings
const settings = {
  workDuration: 25, // minutes
  breakDuration: 5, // minutes
  soundEnabled: true,
  volume: 0.5,
  isEnabled: false,
  soundFile: "ramayan-bgm.mp3", // Default sound file
};

function updateSettings(updates) {
  Object.assign(settings, updates);
  localStorage.setItem("breakTimerSettings", JSON.stringify(settings));
  updateTimerUI();
}

function loadSettings() {
  const saved = localStorage.getItem("breakTimerSettings");
  if (saved) {
    Object.assign(settings, JSON.parse(saved));
  }
}

// notifications.js - Handle notifications
let audio = new Audio(settings.soundFile);

function requestNotificationPermission() {
  if (Notification.permission !== "granted") {
    Notification.requestPermission().then((permission) => {
      if (permission !== "granted") {
        requestNotificationPermission();
      } else {
        initializeApp();
      }
    });
  } else {
    initializeApp();
  }
}

function showNotification(message) {
  if (Notification.permission === "granted") {
    if (settings.soundEnabled) {
      audio.volume = settings.volume;
      audio.play().catch(() => {
        console.warn("Audio file not found, using fallback beep sound.");
        fallbackBeep();
      });
    }
    const isWorkTime = message.includes("Back to work!");
    const emoji = isWorkTime ? "💼" : "☕";
    const emojiIcon = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='90' font-size='90'>${emoji}</text></svg>`;
    const notification = new Notification("Break Reminder", {
      body: `${message}`,
      icon: emojiIcon,
      requireInteraction: true,
    });

    notification.onclose = () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }
}

// Fallback beep sound if the file is missing
function fallbackBeep() {
  const beep = new AudioContext();
  const oscillator = beep.createOscillator();
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(1000, beep.currentTime);
  oscillator.connect(beep.destination);
  oscillator.start();
  setTimeout(() => oscillator.stop(), 500);
}

// timer.js - Handle timers
let timerInterval;
let endTime = Date.now(); // Ensure endTime is initialized
let isWorking = true;

function startTimer() {
  if (!settings.isEnabled) return;
  const duration = isWorking ? settings.workDuration : settings.breakDuration;
  endTime = Date.now() + duration * 60 * 1000;
  clearInterval(timerInterval);
  timerInterval = setInterval(updateTimerUI, 1000);
  updateTimerUI();
}

function toggleTimer() {
  settings.isEnabled = !settings.isEnabled;
  updateSettings({ isEnabled: settings.isEnabled });
  if (settings.isEnabled) {
    isWorking = true; // Reset to work mode when starting
    startTimer();
  } else {
    clearInterval(timerInterval);
  }
  updateTimerUI();
}

function updateTimerUI() {
  const now = Date.now();
  const remaining = Math.max(0, Math.floor((endTime - now) / 1000));
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;

  document.getElementById("status").innerText = settings.isEnabled
    ? isWorking
      ? `🎯 Working (${minutes}m ${seconds}s left)`
      : `☕ Break (${minutes}m ${seconds}s left)`
    : "⏸️ Paused";
  document.getElementById("toggleTimer").innerText = settings.isEnabled
    ? "Pause"
    : "Start";

  if (remaining === 0 && settings.isEnabled) {
    clearInterval(timerInterval);
    isWorking = !isWorking;
    showNotification(isWorking ? "Back to work!" : "Take a break!");
    startTimer();
  }
}

// app.js - Main logic
function initializeApp() {
  loadSettings();
  document.getElementById("toggleTimer").addEventListener("click", toggleTimer);
  document.getElementById("workDuration").value = settings.workDuration;
  document.getElementById("breakDuration").value = settings.breakDuration;
  document.getElementById("enableSound").checked = settings.soundEnabled;
  document.getElementById("volume").value = settings.volume;

  document.getElementById("workDuration").addEventListener("change", (e) => {
    updateSettings({ workDuration: Number(e.target.value) });
    if (settings.isEnabled) startTimer();
  });
  document.getElementById("breakDuration").addEventListener("change", (e) => {
    updateSettings({ breakDuration: Number(e.target.value) });
    if (settings.isEnabled) startTimer();
  });
  document.getElementById("enableSound").addEventListener("change", (e) => {
    updateSettings({ soundEnabled: e.target.checked });
  });
  document.getElementById("volume").addEventListener("change", (e) => {
    updateSettings({ volume: Number(e.target.value) });
    audio.volume = settings.volume; // Apply volume change instantly
  });
  startTimer(); // Ensure timer starts on app load
}

window.onload = requestNotificationPermission;
