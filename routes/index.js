// Include express and express router
const express = require('express')
const router = express.Router()
// Include Packages
const homeAndShorten = require('./modules/homeAndShorten')
const createUrls = require('./modules/createUrls')
// route setting
router.use('/urls', createUrls)
router.use('/', homeAndShorten)
// export
module.exports = router
