const express = require("express");
const router = express.Router();

// Importing controllers
const { getAllUsers, deleteUser } = require("../controller/admin");
const { auth } = require("../middleware/auth");

router.get("/getAllUsers", auth, getAllUsers);
router.delete("/deleteUser", deleteUser);

// Exporting user related routers
module.exports = router;
