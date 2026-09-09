# WattWatch — Smart Electricity Usage Monitor

A B.Tech mini-project website that simulates a smart electricity monitoring system.

## Features
- Live-looking electricity dashboard
- Current power and daily energy tracking
- Estimated monthly bill
- Appliance monitoring and on/off controls
- Daily and weekly charts
- High-consumption alerts
- Energy-saving recommendations
- Responsive layout

## Run
Open `index.html` in a browser. Internet is only needed for Chart.js CDN.

## Project explanation
The website currently uses simulated data. For a hardware version, an ESP32/Arduino can collect current/voltage readings from a suitable energy-monitoring sensor and send readings to a backend/API. The backend can store readings in SQLite and the dashboard can fetch live values.

## Suggested viva points
1. Energy (kWh) = Power (kW) × Time (hours).
2. Estimated bill = Energy consumed × electricity tariff.
3. A smart meter can identify high-load periods and help reduce wastage.
4. The present demo separates UI from the data model so real sensor data can replace the simulated values.
