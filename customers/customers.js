const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

// Connect to database
mongoose.connect('mongodb://manfred:2309seg@ds157735.mlab.com:57735/customersservice', () => {
    console.log('Database connected - Customers service')
})

// Load model
require('./Customer')
const Customer = mongoose.model('Customer')

app.post('/customer', (req, res) => {
    (new Customer(req.body)).save().then(() => res.send('Customer created')).catch(err => { if (err) throw err })
})

app.listen('5555', () => {
    console.log('Up and running - Customers service')
})
