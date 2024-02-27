const fs = require("fs");
const path = require("path");

exports.updateFrequency = async (messageLimit, resetDuration) => {
  try {
    const envPath = path.resolve(__dirname, "..", ".env");
    let envContents = fs.readFileSync(envPath, "utf8");

    envContents = envContents
      .replace(/MESSAGE_LIMIT=.+/, `MESSAGE_LIMIT=${messageLimit}`)
      .replace(/RESET_DURATION=.+/, `RESET_DURATION=${resetDuration}`);

    // Write the updated contents back to the .env file
    fs.writeFileSync(envPath, envContents);

    return true;
  } catch (error) {
    return false;
    console.error("Error updating environment variables:", error);
  }
};
