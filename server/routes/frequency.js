const express = require("express");
const router = express.Router();

// Importing controllers
const { getFrequencies, updateFrequency } = require("../controller/frequency");

router.get("/getFrequencies", getFrequencies);
router.put("/updateFrequencies", updateFrequency);

// Exporting user related routers
module.exports = router;
