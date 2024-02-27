const { getApiKey } = require("../service/apiKeyServices");
const { updateFrequency } = require("../service/messageFrequency");

async function filterData() {
  try {
    const apiKeys = await getApiKey();

    // Extract only the desired API keys
    const filteredApiKeys = apiKeys.filter((api) => {
      return api.name === "MESSAGE_LIMIT" || api.name === "RESET_DURATION";
    });
    return filteredApiKeys;
  } catch (error) {
    throw new Error(error);
  }
}

exports.getFrequencies = async (req, res) => {
  try {
    const filteredApiKeys = await filterData();

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
      const filteredApiKeys = await filterData();

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
