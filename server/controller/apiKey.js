const {
  getApiKey,
  updateApiKey,
  deleteApiKey,
} = require("../service/apiKeyServices");

async function filterData() {
  try {
    const apiKeys = await getApiKey();

    // Extract only the desired API keys
    const filteredApiKeys = apiKeys.filter((api) => {
      return (
        api.name === "BOT_TOKEN" ||
        api.name === "WEATHER_API_KEY" ||
        api.name === "JWT_KEY_SECRET"
      );
    });
    return filteredApiKeys;
  } catch (error) {
    throw new Error(error);
  }
}

// Fetch API keys
exports.getApiKeys = async (req, res) => {
  try {
    const filteredApiKeys = await filterData();

    return res.status(200).json({
      success: true,
      apis: filteredApiKeys,
      message: "Successfully fetched desired APIs",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Update API key
exports.updateApiKey = async (req, res) => {
  try {
    const { apiKeyName, newApiKey } = req.body;
    if (!apiKeyName || !newApiKey) {
      return res.status(400).json({ error: "Missing apiKeyName or newApiKey" });
    }

    const success = await updateApiKey(apiKeyName, newApiKey);
    if (success) {
      const filteredApiKeys = await filterData();

      res.status(200).json({
        success: true,
        message: "API key updated successfully",
        apis: filteredApiKeys,
      });
    } else {
      res.status(500).json({ error: "Failed to update API key" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete API key
// exports.deleteApiKey = async (req, res) => {
//   try {
//     const { apiKeyName } = req.body;

//     if (!apiKeyName) {
//       return res.status(400).json({ error: "Missing apiKeyName" });
//     }
//     const success = await deleteApiKey(apiKeyName);
//     if (success) {
//        const filteredApiKeys = await filterData();

//       res.status(200).json({
//         success: true,
//         message: "API key deleted successfully",
//         apis: filteredApiKeys,
//       });
//     } else {
//       res.status(500).json({ error: "Failed to delete API key" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
