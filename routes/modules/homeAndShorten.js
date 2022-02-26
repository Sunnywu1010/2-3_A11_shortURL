// Include express and express router
const express = require("express");
const router = express.Router();
// Include Packages
const URLModel = require("../../models/URLModel");
// route setting of homepage

router.get("/", (req, res) => {
  res.render("index");
});
module.exports = router;