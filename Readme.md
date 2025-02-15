# Break Reminder (Vanilla JavaScript)

## 🚀 Overview
Break Reminder is a **lightweight** and **practical** web app designed to help you stay productive by alternating between **work** and **break sessions**. It features **real-time countdowns, local storage persistence, notifications, and sound alerts**.

## 🎯 Features
✅ **Customizable Work & Break Durations** (saved in Local Storage)
✅ **Start/Pause the Timer Anytime**
✅ **Automatic Notifications** with Enlarged Emojis (⏳, ☕, 💼)
✅ **Audio Alerts** (configurable sound & volume settings)
✅ **Persistent Settings** (work duration, break duration, audio settings)
✅ **Auto UI Updates** when settings change
✅ **Minimal Resource Usage** (Vanilla JS, No External Libraries)

## 📦 Installation
1. **Clone the repository:**
   ```sh
   git clone https://github.com/akhileshu/Break-Reminder.git
   cd Break-Reminder
   ```
2. **Open `index.html` in your browser.**

## 🌍 Hosting on GitHub Pages
1. Push the project to a **GitHub repository**.
2. Go to **Settings > Pages**.
3. Under "Source," select **Deploy from a branch**.
4. Choose `main` (or your default branch) and save.
5. Access your app at:
   ```
   https://your-username.github.io/Break-Reminder/
   ```

## 🔊 Audio Support & Browser Limitations
- **Audio may not play automatically** due to browser restrictions; user interaction (click/keypress) is required.
- If the notification sound is not working, ensure `ramayan-bgm.mp3` exists or check browser autoplay permissions.

## 🛠️ Customization
- **Change default durations:** Modify `app.js`.
- **Change default audio file:** Replace `ramayan-bgm.mp3`.
- **Modify UI styles:** Edit `style.css`.

## ⚠️ Limitations
- **Local Storage works per browser & device** (does not sync across devices).
- **No server/backend required** (fully client-side app).

## 🤝 Contributing
Feel free to fork and improve the app! PRs are welcome. 🎉

## 📜 License
MIT License. Free to use and modify. 🚀

