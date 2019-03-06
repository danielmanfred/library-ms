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

app.get("/customers", (req, res) => {
    Customer.find().then(customers => {
        res.json(customers)
    }).catch(err => {
        if (err) throw err
    })
})

app.get('/customer/:id', (req, res) => {
    Customer.findById(req.params.id).then(customer => {
        if (customer) res.json(customer)
        else res.send('Invalid ID')
    }).catch(err => {
        if (err) throw err
    })
})

app.delete('/customer/:id', (req, res) => {
    Customer.findByIdAndRemove(req.params.id).then(customer => {
        if (customer) res.send('Customer deleted with success!')
    }).catch(err => { if (err) throw err })
})

app.listen('5555', () => {
    console.log('Up and running - Customers service')
})
