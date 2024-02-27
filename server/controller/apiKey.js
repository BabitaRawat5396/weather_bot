const {
  getApiKey,
  updateApiKey,
  deleteApiKey,
} = require("../service/apiKeyServices");

// Fetch API keys
exports.getApiKeys = async (req, res) => {
  try {
    const apiKeys = await getApiKey();
    // const filteredApiKeys = apiKeys.slice(0, 3);

    return res.status(200).json({
      success: true,
      apis: apiKeys,
      message: "Succesfully fetched all apis",
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
      const apiKeys = await getApiKey();
      const filteredApiKeys = apiKeys.slice(0, 3);
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
//       const apiKeys = await getApiKey();
//       const filteredApiKeys = apiKeys.slice(0, 3);
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
