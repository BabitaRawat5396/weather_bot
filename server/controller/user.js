const User = require("../model/user");
const { fetchWeather, formatWeatherCard } = require("./weather");

require("dotenv").config();

const MESSAGE_LIMIT = parseInt(process.env.MESSAGE_LIMIT);
const RESET_DURATION = parseInt(process.env.RESET_DURATION);

// Track message count per user
const messageCountMap = new Map();

// Function to reset message counts for all users
const resetMessageCounts = () => {
  messageCountMap.clear();
};

// Set up a timer to reset message counts every 10 minutes
setInterval(resetMessageCounts, RESET_DURATION);

// Object to store user information temporarily
let userData = {};

/**
 * Handles incoming text messages, prompting users for information step by step.
 * @param {object} bot - The Telegram bot object.
 * @param {object} ctx - The Telegram context object.
 */
exports.handleTextMessage = async (bot, ctx) => {
  try {
    const id = ctx.chat.id;
    const text = ctx.text.trim();

    // Initialize message count for the user if not already set
    if (!messageCountMap.has(id)) {
      messageCountMap.set(id, 0);
    }

    // Check if the user has exceeded the message limit
    const messageCount = messageCountMap.get(id);
    if (messageCount >= MESSAGE_LIMIT) {
      await bot.sendMessage(
        id,
        "You have reached the message limit for this session."
      );
      return;
    }

    // Increment message count for the user
    messageCountMap.set(id, messageCount + 1);

    // Check if the text is "/start"
    if (text === "/start") {
      await bot.sendMessage(
        id,
        "Welcome! This bot is to give daily updates. Please answer the following questions:"
      );
      await bot.sendMessage(id, "Enter your name:");
      userData = {};
      return;
    }

    // If user doesn't have a name, save the received text as the name
    if (!userData?.name) {
      userData = { ...userData, name: text };
      bot.sendMessage(id, "Enter city name:");
      return;
    }

    // If user doesn't have a city, save the received text as the city
    if (!userData?.city) {
      userData = { ...userData, city: text };
      bot.sendMessage(id, "Enter country name:");
      return;
    }

    // If user doesn't have a country, save the received text as the country
    if (!userData?.country) {
      userData = { ...userData, country: text };

      // Fetch weather details and save data
      await sendWeatherInfo(userData, id, bot);
    }
  } catch (error) {
    console.error("Error handling text message:", error);
  }
};

/**
 * Creates a new user in the database.
 * @param {object} userData - User data.
 * @returns {Promise} - A promise that resolves after saving the user.
 */
const createUser = async (userData, id) => {
  // Add telegramId to user data
  userData.telegramId = id;
  userData.role = "regular";

  // Create user in the database
  const newUser = new User(userData);
  userData = {};
  await newUser.save();
};

/**
 * Saves user data to the database and sends weather information.
 * @param {object} userData - User data.
 * @param {number} id - Telegram user ID.
 * @param {object} bot - The Telegram bot object.
 */
const sendWeatherInfo = async (userData, id, bot) => {
  try {
    const weatherData = await fetchWeather(userData.city, userData.country);
    if (!weatherData) {
      await bot.sendMessage(
        id,
        `Sorry, weather information for ${userData.city}, ${userData.country} is not available.
      Please /start`
      );
      return;
    }
    await createUser(userData, id);
    await bot.sendMessage(id, "Thank you! Your information has been saved.");

    // sending weather deatils message
    const message = formatWeatherCard(weatherData);
    await bot.sendMessage(id, message);
  } catch (error) {
    console.error("Error fetching weather:", error.message);
    bot.sendMessage(id, error.message);
  }
};
