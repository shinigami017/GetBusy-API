const express = require("express");
const passport = require("passport");
const router = express.Router();
const UserController = require("../controllers/user");


// Register user route
router.post("/register", UserController.RegisterUser);

// Authenticate user route
router.post("/authenticate", UserController.LoginUser);

// Define slots
router.post("/slot", passport.authenticate("jwt", { session: false }), UserController.DefineSlot);

// get Users route for persosnal use
router.get("/", UserController.GetAllUsers);



module.exports = router;
