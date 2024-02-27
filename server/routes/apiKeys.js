const express = require("express");
const router = express.Router();
const {
  getApiKeys,
  updateApiKey,
  deleteApiKey,
} = require("../controller/apiKey");

// Fetch API keys
router.get("/getAllAPI", getApiKeys);

// Update API key
router.put("/updateAPI", updateApiKey);

// Delete API key
// router.delete("/deleteAPI", deleteApiKey);

module.exports = router;
