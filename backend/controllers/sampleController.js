const sampleModel = require('../models/sampleModel')
const mongoose = require('mongoose')

const sample_get = (req, res) => {
    res.send("Hello World!")
}


module.exports = {
    sample_get,
}