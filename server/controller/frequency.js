const { getApiKey } = require("../service/apiKeyServices");
const { updateFrequency } = require("../service/messageFrequency");

exports.getFrequencies = async (req, res) => {
  try {
    const apiKeys = await getApiKey();
    const filteredApiKeys = apiKeys.slice(6);

    return res.status(200).json({
      success: true,
      frequencies: filteredApiKeys,
      message: "Succesfully fetched frequencies",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Update frequency variables
exports.updateFrequency = async (req, res) => {
  try {
    const { messageLimit, resetDuration } = req.body;
    if (!messageLimit || !resetDuration) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const success = await updateFrequency(messageLimit, resetDuration);
    if (success) {
      const apiKeys = await getApiKey();
      const filteredApiKeys = apiKeys.slice(0, 3);
      return res.status(200).json({
        success: true,
        frequencies: filteredApiKeys,
        message: "Succesfully fetched frequencies",
      });
    } else {
      res.status(500).json({ error: "Failed to update frequencies" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
