const cityForm = document.getElementById('city-form');
const cityInput = document.getElementById('city-input');
const weatherDiv = document.getElementById('weather');
const newsDiv = document.getElementById('news');
const currencyDiv = document.getElementById('currency');
const factsDiv = document.getElementById('facts');
const mapDiv = document.getElementById('map');

cityForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (!city) return;

    try {
        const weatherResponse = await fetch(`/api/weather?city=${city}`);
        const weatherData = await weatherResponse.json();

        weatherDiv.innerHTML = `
            <h2>Weather in ${city}</h2>
            <p>Country Code: ${weatherData.country}</p>
            <p>Temperature: ${weatherData.temperature}°C</p>
            <p>Description: ${weatherData.description}</p>
            <img src="${weatherData.icon}" alt="Weather Icon">
            <p>Feels Like: ${weatherData.feels_like}°C</p>
            <p>Humidity: ${weatherData.humidity}%</p>
            <p>Pressure: ${weatherData.pressure} hPa</p>
            <p>Wind Speed: ${weatherData.wind_speed} m/s</p>
            <p>Coordinates: [${weatherData.coordinates.lat}, ${weatherData.coordinates.lon}]</p>
            <p>Rain Volume (Last 3 Hours): ${weatherData.rain_volume_last_3h} mm</p>
        `;

        try {
            const mapResponse = await fetch(`/api/geolocation?lat=${weatherData.coordinates.lat}&lon=${weatherData.coordinates.lon}`);
            const mapData = await mapResponse.json();
            mapDiv.innerHTML = `<h2>Map</h2><a href="${mapData.mapUrl}" target="_blank">View Location on Map</a>`;
        } catch {
            mapDiv.innerHTML = `<p>Unable to load map data.</p>`;
        }

        try {
            const newsResponse = await fetch(`/api/news?country=${weatherData.country}`);
            const newsData = await newsResponse.json();
            if (newsData.length === 0) {
                newsDiv.innerHTML = `<p>No news available for ${weatherData.country}.</p>`;
            } else {
                newsDiv.innerHTML = `<h2>Top News in ${weatherData.country}</h2>`;
                newsData.forEach(article => {
                    newsDiv.innerHTML += `
                        <div>
                            <h3>${article.title}</h3>
                            <p>${article.description}</p>
                            <a href="${article.url}" target="_blank">Read more</a>
                        </div>
                    `;
                });
            }
        } catch {
            newsDiv.innerHTML = `<p>Error loading news data.</p>`;
        }

        try {
            const currencyResponse = await fetch('/api/currency');
            const currencyData = await currencyResponse.json();
            currencyDiv.innerHTML = `<h2>Currency Exchange Rates (USD)</h2>`;
            Object.entries(currencyData).slice(0, 10).forEach(([currency, rate]) => {
                currencyDiv.innerHTML += `<p>${currency}: ${rate}</p>`;
            });
        } catch {
            currencyDiv.innerHTML = `<p>Error loading currency exchange rates.</p>`;
        }

        try {
            const factsResponse = await fetch(`/api/country-facts?country=${weatherData.country}`);
            const factsData = await factsResponse.json();
            factsDiv.innerHTML = `
                <h2>Country Facts: ${factsData.name.common}</h2>
                <p>Capital: ${factsData.capital ? factsData.capital[0] : 'N/A'}</p>
                <p>Population: ${factsData.population || 'N/A'}</p>
                <p>Currency: ${factsData.currencies ? Object.keys(factsData.currencies)[0] : 'N/A'}</p>
                <p>Region: ${factsData.region || 'N/A'}</p>
            `;
        } catch {
            factsDiv.innerHTML = `<p>Error loading country facts.</p>`;
        }

    } catch {
        weatherDiv.innerHTML = '<p>Error fetching weather data. Please try again later.</p>';
    }
});
