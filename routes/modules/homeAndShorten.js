// Include express and express router
const express = require("express");
const router = express.Router();
// Include Packages
const URLModel = require("../../models/URLModel");
// route setting of homepage
router.get("/", (req, res) => {
  res.render("index");
});
// route setting of shorten URL
router.get("/:urls", (req, res) => {
  const urls = req.params.urls;

  URLModel.findOne({ shortenCode: urls })
    .then((URL) => res.redirect(URL.originalURL))
    .catch((error) => console.log(error));
});
// export
module.exports = router;
