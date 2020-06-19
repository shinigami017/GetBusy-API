const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
    }
})

module.exports = mongoose.model("Users", userSchema);