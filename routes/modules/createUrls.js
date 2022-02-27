// Include express and express router
const express = require("express");
const router = express.Router();
// Include Packages
const generateShortCode = require("../../generateShortCode");
const URLModel = require("../../models/URLModel");
const urlExists = require("promised-url-exists");
// route setting of ('/urls')
router.post("/", (req, res) => {
  const URL = req.body.URL;
  let existedURL = [];
  // determine if the URL is exists
  urlExists(URL)
    .then(({ exists }) => {
      // determine if the URL already exists
      if (exists) {
        // determine if this URL has shorten code or not
        URLModel.find()
        .lean()
        .then((URLs) => {
          // if it has, filter it in to existedURL
          existedURL = URLs.filter((theURL) => theURL.originalURL === URL);
          // if existedURL has the shorten code then "render"
          if (existedURL.length > 0) {
            res.render("shorten", {
              shortenUrl: "http://localhost:3000/" + existedURL[0].shortenCode,
            });
          // if existedURL doesn't have the shorten code then "generate"
          } else {
            let createURL = generateShortCode();
            URLModel.findOne({ shortenCode: createURL }, (foundURL) => {
              // if the shorten code which generated is can't find in URLModel
              // then render
              if (!foundURL) {
                URLModel.create({ originalURL: URL, shortenCode: createURL });
                res.render("shorten", {
                  shortenUrl: "http://localhost:3000/" + createURL,
                });
              } else {
                // if the shorten code which generated is same as the code already existed in URLModel
                // then generate again
                while (foundURL.shortenCode === createURL) {
                  createURL = generateShortCode();
                }
                URLModel.create({ originalURL: URL, shortenCode: createURL });
                res.render("shorten", {
                  shortenUrl: "http://localhost:3000/" + createURL,
                });
              }
            });
          }
        })
          .catch((error) => console.log(error));
      } else {
        // if the URL is not exists
        console.log("the URL is not exists! Please try again!");
        res.redirect("/");
      }
    })
    .catch((error) => console.log(error));
});
// export
module.exports = router;
