const express = require('express')
const router = express.Router()

const { updateProfile } = require('../controllers/profile')

router.patch('/', updateProfile)

module.exports = router