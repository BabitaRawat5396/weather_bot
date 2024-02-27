const fs = require("fs");
const path = require("path");

// Fetch API keys from .env file
exports.getApiKey = async () => {
  try {
    const envPath = path.resolve(__dirname, "..", ".env");
    const envContents = fs.readFileSync(envPath, "utf8");

    const lines = envContents.split("\n");
    const apis = lines.map((line) => {
      const [key, value] = line.split("=");
      return { name: key.trim(), key: value.trim() };
    });

    return apis;
  } catch (error) {
    console.error("Error reading .env file:", error);
    return [];
  }
};

// Update API key
exports.updateApiKey = async (apiKeyName, newApiKey) => {
  try {
    const envPath = path.resolve(__dirname, "..", ".env");
    let envContents = fs.readFileSync(envPath, "utf8");

    const regex = new RegExp(`${apiKeyName}\\s*=\\s*(.+)`);
    envContents = envContents.replace(regex, `${apiKeyName}=${newApiKey}`);

    fs.writeFileSync(envPath, envContents);

    return true;
  } catch (error) {
    console.error("Error updating API key:", error);
    return false;
  }
};

// Delete API key
// exports.deleteApiKey = async (apiKeyName) => {
//   try {
//     // Load the contents of the .env file
//     const envPath = path.resolve(__dirname, "..", ".env");
//     let envContents = fs.readFileSync(envPath, "utf8");

//     // Remove the API key line
//     envContents = envContents.replace(
//       new RegExp(`${apiKeyName}\\s*=\\s*(.+)`),
//       ""
//     );

//     // Write the updated contents back to the .env file
//     fs.writeFileSync(envPath, envContents);

//     return true; // Return true if deletion is successful
//   } catch (error) {
//     console.error("Error deleting API key:", error);
//     return false; // Return false if deletion fails
//   }
// };
