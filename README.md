# **Weather and Info Dashboard - Documentation**

---

## **Project Overview**

This project is a comprehensive weather and information dashboard that retrieves and displays real-time weather data, geolocation-based mapping, news updates, currency exchange rates, and country facts. It integrates multiple APIs, adhering to best practices in coding and project structure, with all logic implemented in the core JavaScript file.

---

## **Features**

1. **Weather Information**
   - Real-time weather data, including:
     - Temperature
     - Weather description
     - Feels-like temperature
     - Humidity
     - Pressure
     - Wind speed
     - Coordinates
     - Rain volume for the last 3 hours
   - Powered by **OpenWeatherAPI**.

2. **Geolocation and Mapping**
   - Displays the location of cities visually using Google Maps based on latitude and longitude.

3. **News Updates**
   - Displays top news headlines relevant to the city or region using **NewsAPI**.

4. **Currency Exchange Rates**
   - Fetches and displays current exchange rates relative to USD using **ExchangeRate API**.

5. **Country Facts**
   - Provides details about the country, including:
     - Capital
     - Population
     - Currency
     - Region
   - Powered by **RESTCountries API**.

6. **Clean and Responsive Design**
   - Optimized for various devices with a clean, user-friendly interface.

---

## **Setup Instructions**

### **Prerequisites**
- [Node.js](https://nodejs.org/) installed on your machine.
- Basic knowledge of JavaScript and web development.

### **1. Clone the Repository**
```bash
git clone <repository-url>
cd <repository-folder>
```

### **2. Install Dependencies**
Run the following command to install all required dependencies:
```bash
npm install
```

### **3. Configure API Keys**
1. Create a `.env` file in the root directory.
2. Add the following API keys:
```env
OPENWEATHER_API_KEY=your_openweather_api_key
NEWS_API_KEY=your_news_api_key
CURRENCY_API_KEY=your_currency_api_key
```

### **4. Start the Server**
Run the server using:
```bash
node server.js
```
The server will run at `http://localhost:3000`.

---

## **API Usage Details**

### **1. OpenWeatherAPI**
- Endpoint: `/api/weather`
- Parameters:
  - `city`: Name of the city.
- Returns:
  - Weather data including temperature, humidity, pressure, wind speed, and rain volume for the last 3 hours.

### **2. Google Maps (Geolocation)**
- Endpoint: `/api/geolocation`
- Parameters:
  - `lat`: Latitude.
  - `lon`: Longitude.
- Returns:
  - URL for Google Maps displaying the specified location.

### **3. NewsAPI**
- Endpoint: `/api/news`
- Parameters:
  - `country`: ISO code of the country.
- Returns:
  - Top news articles related to the country.

### **4. ExchangeRate API**
- Endpoint: `/api/currency`
- Returns:
  - Latest currency exchange rates relative to USD.

### **5. RESTCountries API**
- Endpoint: `/api/country-facts`
- Parameters:
  - `country`: ISO code of the country.
- Returns:
  - Country details including capital, population, and currency.

---

## **Design Decisions**

1. **Separation of Concerns**
   - All application logic is implemented in the `server.js` and `script.js` files. The HTML only handles the structure, and no logic resides there.

2. **API Integration**
   - APIs are used on the server side to maintain security for API keys and reduce client-side complexity.

3. **User-Friendly Interface**
   - The design is responsive and optimized for various screen sizes, ensuring accessibility and usability.

4. **Error Handling**
   - Comprehensive error handling is implemented for API calls. If any API fails, the application gracefully handles the issue and notifies the user.

5. **Clean and Modular Code**
   - The project is organized to ensure readability and maintainability:
     - `server.js`: Handles server-side logic and API integration.
     - `script.js`: Manages client-side functionality and DOM updates.
     - `index.html`: Contains the structure of the application.
     - `styles.css`: Manages the design and responsiveness.

---

## **Project Structure**

```
project/
├── public/
│   ├── index.html         # Main HTML file
│   ├── styles.css         # CSS for styling
│   ├── script.js          # Client-side JavaScript
├── server.js              # Node.js server logic
├── .env                   # API keys (not included in repository)
├── package.json           # Project metadata and dependencies
├── package-lock.json      # Auto-generated file for npm dependencies
├── node_modules/          # Installed dependencies
```

---

## **Examples**

### **Fetching Weather Data**
Request:
```
GET http://localhost:3000/api/weather?city=London
```
Response:
```json
{
    "temperature": 15.2,
    "description": "light rain",
    "icon": "https://openweathermap.org/img/wn/10d@2x.png",
    "coordinates": { "lat": 51.5074, "lon": -0.1278 },
    "feels_like": 14.5,
    "humidity": 87,
    "pressure": 1012,
    "wind_speed": 3.1,
    "country": "GB",
    "rain_volume_last_3h": 1.5
}
```

### **Fetching Country Facts**
Request:
```
GET http://localhost:3000/api/country-facts?country=GB
```
Response:
```json
{
    "name": { "common": "United Kingdom" },
    "capital": ["London"],
    "population": 67886011,
    "currencies": { "GBP": { "name": "British pound", "symbol": "£" } },
    "region": "Europe"
}
```

---

## **Error Handling**
- If a required parameter is missing, a `400 Bad Request` is returned with an error message.
- If an API call fails, a `500 Internal Server Error` is returned with a relevant message.

---

## **Known Limitations**
1. Free-tier APIs may have rate limits.
2. If no data is available for a specific query (e.g., no news for a country), the application handles this gracefully by notifying the user.

---

## **How to Contribute**
1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Submit a pull request.
