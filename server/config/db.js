const mongoose = require("mongoose");
const keys = require("./keys");

//  connect to db
const connect = function() {
    mongoose.connect(keys.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
        .then(() => {
            console.log("Database Connected...");
        })
        .catch((err) => {
            console.log(" Error in connecting to database... : ", err);
        });
}

module.exports = {
    connect
}