require('dotenv').config()

const express = require('express')
const sampleRoute = require('./routes/sampleRoute')
const mongoose = require('mongoose')


//express app
const app = express()


//middleware
app.use(express.json())
app.use('/api/sample', sampleRoute)


//listen for requests
const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

