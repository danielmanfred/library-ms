const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const axios = require('axios')

const app = express()
app.use(bodyParser.json())

mongoose.connect('mongodb://manfred:1329qua@ds161335.mlab.com:61335/ordersservice', () => {
    console.log('Database connected - Orders')
})

// Loading model
require('./Order')
const Order = mongoose.model('Order')

app.post('/order', (req, res) => {
    (new Order(req.body)).save().then(() => res.send('Order created with success!')).catch(err => { if (err) throw err })
})

app.get('/orders', (req, res) => {
    Order.find().then(orders => res.json(orders)).catch(err => { if (err) throw err })
})

app.get('/order/:id', async (req, res) => {
    Order.findById(req.params.id).then(async order => {
        const customer = await axios.get(`http://localhost:5555/customer/${order.customerId}`)
        const book = await axios.get(`http://localhost:4545/book/${order.bookId}`)
        if (order) res.json({
            id: order.id,
            customer: customer.data,
            book: book.data,
            initialDate: order.initialDate,
            delivaryDate: order.delivaryDate
        })
        else res.send('Invalid ID')
    }).catch(err => {
        if (err) throw err
    })
})

app.listen(7777, () => {
    console.log('Up and running - Orders services')
})