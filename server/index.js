const TelegramBot = require("node-telegram-bot-api");
const connect = require("./config/database_connect");
const { handleTextMessage } = require("./controller/user");
const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/login");
const adminRoutes = require("./routes/admin");
const apiKeysRoutes = require("./routes/apiKeys");
const frequencyRoutes = require("./routes/frequency");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

// Initialize the Telegram Bot
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

// database connection
connect();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "https://weather-bot-frontend-psi.vercel.app",
    credentials: true,
  })
);

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/apikeys", apiKeysRoutes);
app.use("/api/v1/frequency", frequencyRoutes);

bot.on("message", (msg) => {
  handleTextMessage(bot, msg);
});

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running....",
  });
});

app.listen(PORT, (error) => {
  if (!error) {
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  } else console.log("Error occurred, server can't start", error);
});
