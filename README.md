# 🌪️ Storm Chaser App

A mobile application for hobbyist meteorologists to document and track storm events using weather data, camera integration, geolocation, and local data persistence.

Built with **React Native (Expo)** in under 24 hours.

---

## 🚀 Features

- 📍 Fetches real-time weather based on device location via **Open-Meteo API**
- 📷 Captures storm event photos using the device camera
- 📝 Adds rich metadata: temperature, wind speed, precipitation, location, storm type, and custom notes
- 💾 Stores storm reports locally using **AsyncStorage**
- 📖 Displays a history of all storm reports with image and data
- 🔄 Includes refresh and reset functionality

---

## 📦 Tech Stack

- React Native with Expo
- TypeScript
- AsyncStorage for local storage
- Open-Meteo API for weather data
- Expo Location + Camera APIs

---

## 📱 Screens

- **Home**: Current weather conditions (temp, wind speed, precipitation)
- **Storm Report**: Take a photo and document storm event
- **Storm History**: View a list of saved storm reports

---

## 🏃 Running the App

1. 📦 Install Dependencies

```bash
npm install
```

2. ▶️ Start the Expo App

```bash
npx expo start
```

This will open the Expo Dev Tools in your browser.

3. 📱 Run on Device or Emulator
   Scan the QR code with the Expo Go app on your iOS or Android device.

OR press i to open in iOS simulator, a for Android emulator (if set up).

⚠️ Make sure your device or simulator has camera & location access.

---

## 🧪 Testing

- ✅ Unit tested with Jest + Testing Library
- Includes utility function tests (e.g., coordinate formatting)

To run tests:

```bash
npm test
```

---

## 🕒 Time Log

- Total time spent: ~12 hours
- Planning & Setup: 2h
- Weather & Location Integration: 2h
- Camera + Metadata Capture: 2h
- Local Storage & History Screen: 2h
- UI Enhancements: 1h
- Bug Fixes & Testing: 1h
- README + Polish: 1h
