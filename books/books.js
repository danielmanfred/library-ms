// Load Express
const express = require('express')
const app = express()

// Load mongoose
const mongoose = require('mongoose')
// Connect
mongoose.connect('mongodb://manfred:0110seg@ds237700.mlab.com:37700/booksservice', () => {
    console.log('Database is connected!')
})

app.get('/', (req, res) => {
    res.send('This is the books service')
})

app.listen(4545, () => {
    console.log('Up and running! -- This is our Books service')
})