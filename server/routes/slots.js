const express = require("express");
const passport = require("passport");
const router = express.Router();
const SlotController = require("../controllers/slots");


// Get all slots
router.get("/:domain/slots", passport.authenticate("jwt", { session: false }), SlotController.GetAllSlots);

// Book slot
router.post("/:domain/slots/:id", passport.authenticate("jwt", { session: false }), SlotController.BookSlot);


module.exports = router;