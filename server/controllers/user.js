const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const keys = require("../config/keys");
const User = require("../models/user");

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
                    res.json({
                        success: true,
                        token: "Bearer " + token,
                        user: {
                            id: user._id,
                            name: user.name,
                            email: user.email
                        }
                    });
                }
            });
        });
    }
};