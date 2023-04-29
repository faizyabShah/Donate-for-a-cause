const express = require('express')
const { sample_get } = require('../controllers/sampleController')

const router = express.Router()

router.get('/', sample_get)

module.exports = router

