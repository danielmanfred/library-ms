// Load Express
const express = require('express')
const app = express()

// Load mongoose
const mongoose = require('mongoose')
// Connect
mongoose.connect('mongodb://manfred:0110seg@ds237700.mlab.com:37700/booksservice', 
    { useNewUrlParser: true }, 
    () => console.log('Database is connected!')
)

app.get('/', (req, res) => {
    res.send('This is the books service')
})

// Create func
app.post('/book', (req, res) => {
    res.send('00:16')
})

app.listen(4545, () => {
    console.log('Up and running! -- This is our Books service')
})