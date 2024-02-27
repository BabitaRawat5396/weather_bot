const express = require("express");
const router = express.Router();

// Importing controllers
const { login } = require("../controller/login");

router.post("/login", login);

// Exporting user related routers
module.exports = router;
