// Load Express
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

// Load mongoose
const mongoose = require('mongoose')

require('./Book')
const Book = mongoose.model('Book')

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
    // Create a new book
    var book = new Book(req.body)
    book.save().then(() => {
        console.log('New book created')
    }).catch((err) => {
        if (err) throw err
    })
    res.send('A new book created with success!')
})

app.get('/books', (req, res) => {
    Book.find().then(books => {
        res.json(books)
    }).catch(err => {
        if (err) throw err
    })
})

app.get('/book/:id', (req, res) => {
    Book.findById(req.params.id).then(book => {
        if (book) {
            // Book data
            res.json(book)
        }
        else {
            res.sendStatus(400)
        }
    }).catch(err => {
        if (err) throw err
    })
})

app.delete('/book/:id', (req, res) => {
    Book.findOneAndRemove(req.params.id).then(book => {
        res.send('Book removed with success!')
    }).catch(err => {
        if (err) throw err
    })
})

app.listen(4545, () => {
    console.log('Up and running! -- This is our Books service')
})