const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    // res.sendFile(path.join(__dirname, "/dist/mean/index.html"));
    res.redirect("/getbusy.com");
});

router.get("/getbusy.com", (req, res) => {
    res.send("Welcome to GetBusy api...");
});

module.exports = router;
