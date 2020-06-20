const User = require("../models/user");
const Slot = require("../models/slot");

module.exports = {
    GetAllSlots: (req, res) => {
        User.findById(req.params.domain).populate("slots").exec(function(error, foundUser) {
            if (error) {
                console.log(error);
                return res.status(400).json({ success: false, msg: "Something went wrong. Please try again" });
            }
            if (!foundUser) {
                console.log("Api url does not exist");
                return res.status(400).json({ success: false, msg: "Api url does not exists" });
            }
            res.status(200).json({ success: true, slots: foundUser.slots });
        });
    },
    BookSlot: (req, res) => {
        Slot.findById(req.params.id, function(error, foundSlot) {
            if (error) {
                console.log(error);
                return res.status(400).json({ success: false, msg: "Something went wrong. Please try again" });
            }
            if (!foundSlot) {
                console.log("Slot with given id not found");
                return res.status(400).json({ success: false, msg: "Please check the slot id" });
            }
            foundSlot.free = false;
            foundSlot.booked_by = req.user._id;
            foundSlot.booked_on = new Date().toUTCString();
            foundSlot.title = req.body.title;
            foundSlot.description = req.body.description;
            foundSlot.save(function(error, savedSlot) {
                if (error) {
                    console.log(error);
                    return res.status(400).json({ success: false, msg: "Something went wrong. Please try again" });
                }
                User.findById(req.user._id, function(error, foundUser) {
                    if (error) {
                        console.log(error);
                        return res.status(400).json({ success: false, msg: "Something went wrong. Please try again" });
                    }
                    foundUser.booked_slots.push(savedSlot._id);
                    foundUser.save(function(error, savedUser) {
                        if (error) {
                            console.log(error);
                            return res.status(400).json({ success: false, msg: "Something went wrong. Please try again" });
                        }
                        return res.status(200).json({ success: true, msg: "Slot booking successful", slot: savedSlot });
                    });
                });
            });
        });
    }
};