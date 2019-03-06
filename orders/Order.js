const mongoose = require('mongoose')

mongoose.model('Order', {
    customerId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    bookId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    initialDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    delivaryDate: {
        type: Date,
        required: true
    }
})