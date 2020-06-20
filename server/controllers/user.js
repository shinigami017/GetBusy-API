const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const keys = require("../config/keys");
const User = require("../models/user");
const Slot = require("../models/slot");

module.exports = {
    RegisterUser: (req, res) => {
        let { name, email, password, password2 } = req.body;
        if (!name) {
            return res.status(400).json({ success: false, message: "Please enter your name" });
        }
        if (!email) {
            return res.status(400).json({ success: false, message: "Please enter your email" });
        }
        if (!password) {
            return res.status(400).json({ success: false, message: "Please enter password" });
        }
        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "Password must be at least 6 character long" });
        }
        if (!password2) {
            return res.status(400).json({ success: false, message: "Please confirm password" });
        }
        if (password != password2) {
            return res.status(400).json({ success: false, message: "Passwords do not match" });
        }

        User.findOne({ email: req.body.email }, function(error, user) {
            if (error) {
                console.log(error);
                return res.status(500).json({ success: false, msg: "Something went wrong. Please try again" });
            }
            if (user) {
                console.log("User already exists");
                return res.status(400).json({ success: false, msg: "User already exists" });
            }
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            // hash and save password
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    newUser.password = hash;
                    newUser.save(function(error, user) {
                        if (error) {
                            console.log(error);
                            return res.status(500).json({ success: false, msg: "Unable to register" });
                        }
                        if (user) {
                            console.log("User successfully added!");
                            res.status(200).json({
                                success: true,
                                msg: "User registered"
                            });
                        }
                    });
                });
            });
        });
    },
    LoginUser: (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        // match the password and email
        User.findOne({ email: email }, function(error, user) {
            if (error) {
                console.log(error);
                return res.status(500).json({ success: false, msg: "Something went wrong. Please try again" });
            }
            if (!user) {
                console.log("User does not exists");
                return res.status(404).json({ success: false, msg: "Invalid credentials" });
            }
            bcrypt.compare(password, user.password, (err, success) => {
                if (err) {
                    console.log(error);
                    return res.status(500).json({ success: false, msg: "Something went wrong. Please try again" });
                }
                if (!success) {
                    console.log("Passwords do not match.");
                    return res.status(400).json({ success: false, msg: "Invalid credentials" });
                }
                if (success) {
                    const token = jwt.sign({ data: user }, keys.secret, {
                        expiresIn: 604800 // 1 week
                    });
                    user.api_url = "/getbusy.com/" + user._id;
                    user.save(function(error, user) {
                        if (error) {
                            console.log(error);
                            return res.status(400).json({ success: false, msg: "Something went wrong. Please try again" });
                        }
                        res.json({
                            success: true,
                            token: "Bearer " + token,
                            user: {
                                id: user._id,
                                name: user.name,
                                email: user.email,
                                api_url: "/getbusy.com/" + user.api_url
                            }
                        });
                    });

                }
            });
        });
    },
    DefineSlot: (req, res) => {
        const date = req.body.date;
        const time = req.body.time;
        const owner = req.user._id;
        const slot = new Slot({ date: date, time: time, owner: owner });
        slot.save(function(error, savedSlot) {
            if (error) {
                console.log(error);
                return res.status(404).json({ success: false, msg: "Something went wrong. Please try again" });
            }
            if (savedSlot) {
                User.findById(req.user._id, function(error, foundUser) {
                    if (error) {
                        console.log(error);
                        return res.status(404).json({ success: false, msg: "Something went wrong. Please try again" });
                    }
                    foundUser.slots.push(savedSlot);
                    foundUser.save(function(error, savedUser) {
                        if (error) {
                            console.log(error);
                            return res.status(404).json({ success: false, msg: "Something went wrong. Please try again" });
                        }
                        return res.status(200).json({ success: true, msg: "Slot saved succesfully" });
                    });
                });
            }
        });
    }
};