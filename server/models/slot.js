const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema setup
var slotSchema = new Schema({
    free: {
        type: Boolean,
        default: true
    },
    date: Date.UTC(),
    time: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    booked_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    booked_on: Date.UTC(),
    title: String,
    description: String
});

module.exports = mongoose.model("Slot", slotSchema);