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
  console.log("URL",URL)
  let existedURL = [];
  // determine if the URL is valid
  urlExists(URL)
    .then(({ exists }) => {
      // the URL is valid
      if (exists) {
        console.log("exists", exists);
        // determine if the URL already exists
        URLModel.find()
          .lean()
          .then((URLs) => {
            console.log("URLs", URLs);
                    existedURL = URLs.filter(
                      (theURL) => theURL.originalURL === URL
                    );

        console.log("existedURL", existedURL);
            
            // the URL already exists
            if (existedURL.length > 0) {
              res.render("shorten", {
                shortenUrl:
                  "http://localhost:3000/" + existedURL[0].shortenCode,
              });
            } else {
              let createURL = generateShortCode();
              URLModel.findOne({ shortenCode: createURL }, (foundURL) => {
                if (!foundURL) {
                  URLModel.create({ originalURL: URL, shortenCode: createURL });
                  res.render("shorten", {
                    shortenUrl: "http://localhost:3000/" + createURL,
                  });
                } else {
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
        // the URL is invalid
        console.log("the URL is not exists! Please try again!");
        res.redirect("/");
      }
    })
    .catch((error) => console.log(error));


});
module.exports = router;
