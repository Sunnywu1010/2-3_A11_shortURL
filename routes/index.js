// Include express and express router
const express = require('express')
const router = express.Router()
// Include Packages
const home = require('./modules/home')
const urls = require('./modules/URL')
// route setting
router.use('/urls', urls)
router.use('/', home)
// export
module.exports = router
