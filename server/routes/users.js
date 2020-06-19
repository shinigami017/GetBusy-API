const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");


// Register user route
router.post("/register", UserController.RegisterUser);

// Authenticate user route
router.post("/authenticate", UserController.LoginUser);

module.exports = router;