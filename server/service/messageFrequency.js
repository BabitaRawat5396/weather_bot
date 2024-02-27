const fs = require("fs");
const path = require("path");

exports.updateFrequency = async (messageLimit, resetDuration) => {
  try {
    process.env["MESSAGE_LIMIT"] = messageLimit;
    process.env["RESET_DURATION"] = resetDuration;

    return true;
  } catch (error) {
    console.error("Error updating environment variables:", error);
    return false;
  }
};
