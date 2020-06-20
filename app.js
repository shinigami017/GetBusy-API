require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const port = process.env.PORT || 4000;
const mongoose = require("mongoose");
const session = require("express-session");
const cookieParser = require("cookie-parser");
// const logger = require("morgan");
const db = require("./server/config/db");
const keys = require("./server/config/keys");

// use cors for cross-origin accessibility
app.use(cors());

// for logger 
// app.use(logger("combined"));

//body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// session
app.use(cookieParser());
app.use(session({
    secret: keys.secret,
    resave: true,
    saveUninitialized: false,
    cookie: {
        expires: false,
    }
}));

//Passport
app.use(passport.initialize());
app.use(passport.session());
// calling passport strategy function
require("./server/config/passport")(passport);

// Connecting mongo database
db.connect();


// Users routes
const usersRoute = require("./server/routes/users");
app.use("/getbusy.com/users", usersRoute);

// Slots routes
const slotsRoute = require("./server/routes/slots");
app.use("/getbusy.com", slotsRoute);

// Index routes
const indexRoute = require("./server/routes/index");
app.use("/", indexRoute);

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});