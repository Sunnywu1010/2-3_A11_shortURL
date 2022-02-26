// Include express and express router
const express = require("express");
const router = express.Router();
// Include Packages
const URLModel = require("../../models/URLModel");
// route setting of homepage

router.get("/", (req, res) => {
  res.render("index");
});
router.get("/:urls", (req, res) => {
  console.log(req.params);
  const urls = req.params.urls;
  if (urls === "favicon.ico") {
    return;
  }
  URLModel.findOne({ shortenCode: urls })
    .then((URL) => res.redirect(URL.originalURL))
    .catch((error) => console.log(error));
});
module.exports = router;
