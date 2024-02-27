const axios = require("axios");
const { Error } = require("mongoose");

/**
 * Fetches weather updates from the OpenWeatherMap API.
 * @param {string} city - The name of the city for which weather updates are requested.
 * @param {string} country - The name of the country for error printing.
 * @returns {string} - The formatted card message with weather data.
 */
exports.fetchWeather = async (city, country) => {
  try {
    const url = `${process.env.WEATHER_URL}?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`;
    const response = await axios.get(url);
    const weatherData = response.data;
    return weatherData;
  } catch (error) {
    throw new Error(
      `Sorry, weather information for ${city}, ${country} is not available.
Please /start`
    );
  }
};

/**
 * Formats weather data into a card message.
 * @param {object} weatherData - The weather data object.
 * @returns {string} - The formatted card message.
 */
exports.formatWeatherCard = (weatherData) => {
  const cityName = weatherData.name;
  const country = weatherData.sys.country;
  const description = weatherData.weather[0].description;
  const temperature = weatherData.main.temp;
  const feelsLike = weatherData.main.feels_like;
  const humidity = weatherData.main.humidity;
  const cloudiness = weatherData.clouds.all;
  const windSpeed = weatherData.wind.speed;

  let weatherStatus = cloudiness < 30 ? "☀️ Sunny" : "☁️ Cloudy";

  const message = `
 Weather Update for ${cityName}, ${country}
--------------------------------------------------------------------
Today's Weather: ${weatherStatus}
Temperature: 🌡️ ${temperature}°C
Description: ${description}
Humidity: 💧 ${humidity}%
Feels Like: 🌡️ ${feelsLike}°C
Wind Speed: 💨 ${windSpeed} m/s
Cloudiness: ☁️ ${cloudiness}%

-------------------------------------------------------------------
`;
  return message;
};
