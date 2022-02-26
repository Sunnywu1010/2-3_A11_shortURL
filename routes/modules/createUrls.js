// Include express and express router
const express = require("express");
const router = express.Router();
// Include Packages
// const generateRandom = require("../../generateRandom");
const URLModel = require("../../models/URLModel");
const urlExists = require("promised-url-exists");

// route setting of ('/shorten')
router.post("/", (req, res) => {
  res.render("index");
})
module.exports=router