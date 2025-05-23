# 🌪️ Storm Chaser App

A mobile application for hobbyist meteorologists to document and track storm events using weather data, camera integration, geolocation, and local data persistence.

Built with **React Native (Expo)** in under 24 hours as part of the Speer Technologies Mobile Development Assessment.

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

## 🧪 Testing

- ✅ Unit tested with Jest + Testing Library
- Includes utility function tests (e.g., coordinate formatting)

To run tests:

```bash
npm test
```

---

## 🕒 Time Log

- Total time spent: ~22 hours
- Planning & Setup: 2h
- Weather & Location Integration: 3h
- Camera + Metadata Capture: 4h
- Local Storage & History Screen: 4h
- UI Enhancements: 3h
- Bug Fixes & Testing: 4h
- README + Polish: 2h
