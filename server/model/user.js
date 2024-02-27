const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  telegramId: {
    type: Number,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ["regular", "admin"],
  },
  name: {
    type: String,
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
  token: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
