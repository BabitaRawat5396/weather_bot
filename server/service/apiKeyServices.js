// Fetch API keys from .env file
exports.getApiKey = async () => {
  try {
    const environmentVariables = {};

    Object.keys(process.env).forEach((key) => {
      environmentVariables[key] = process.env[key];
    });

    return environmentVariables;
  } catch (error) {
    console.error("Error reading .env file:", error);
    return [];
  }
};

// Update API key
exports.updateApiKey = async (apiKeyName, newApiKey) => {
  try {
    process.env[apiKeyName] = newApiKey;
    return true;
  } catch (error) {
    console.error("Error updating API key:", error);
    return false;
  }
};

// Delete API key
// exports.deleteApiKey = async (apiKeyName) => {
//   try {
//     delete process.env[apiKeyName];
//     return true;
//   } catch (error) {
//     console.error("Error deleting API key:", error);
//     return false;
//   }
// };
