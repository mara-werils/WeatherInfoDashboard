require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/weather', async (req, res) => {
    const { city } = req.query;
    if (!city) {
        return res.status(400).json({ error: 'City is required' });
    }
    try {
        const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`);
        console.log(weatherResponse.data);
        const weatherData = weatherResponse.data;
        res.json({
            temperature: weatherData.main.temp,
            description: weatherData.weather[0].description,
            icon: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
            coordinates: { lat: weatherData.coord.lat, lon: weatherData.coord.lon },
            feels_like: weatherData.main.feels_like,
            humidity: weatherData.main.humidity,
            pressure: weatherData.main.pressure,
            wind_speed: weatherData.wind.speed,
            country: weatherData.sys.country || 'N/A',
            rain_volume_last_3h: weatherData.rain ? weatherData.rain['3h'] || 0 : 0,
        });
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

app.get('/api/news', async (req, res) => {
    const { country } = req.query;
    if (!country) {
        return res.status(400).json({ error: 'Country is required' });
    }
    try {
        const newsResponse = await axios.get(`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${process.env.NEWS_API_KEY}`);
        res.json(newsResponse.data.articles);
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to fetch news' });
    }
});

app.get('/api/currency', async (req, res) => {
    try {
        const currencyResponse = await axios.get(`https://open.er-api.com/v6/latest/USD`);
        res.json(currencyResponse.data.rates);
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to fetch currency data' });
    }
});

app.get('/api/geolocation', async (req, res) => {
    const { lat, lon } = req.query;
    if (!lat || !lon) {
        return res.status(400).json({ error: 'Latitude and Longitude are required' });
    }
    try {
        const mapUrl = `https://www.google.com/maps/@${lat},${lon},15z`;
        res.json({ mapUrl });
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to generate map URL' });
    }
});

app.get('/api/country-facts', async (req, res) => {
    const { country } = req.query;
    if (!country) {
        return res.status(400).json({ error: 'Country is required' });
    }
    try {
        const factsResponse = await axios.get(`https://restcountries.com/v3.1/alpha/${country}`);
        res.json(factsResponse.data[0]);
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to fetch country facts' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
