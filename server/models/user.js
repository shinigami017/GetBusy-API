const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema setup
var userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        require: true,
        unique: false
    },
    slots: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Slot"
    }],
    booked_slots: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Slot"
    }],
    api_url: String
});

module.exports = mongoose.model("Users", userSchema);