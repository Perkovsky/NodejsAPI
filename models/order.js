const {Schema, model} = require('mongoose')

const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now,
        required: true
    },
    dateModified: {
        type: Date,
        default: Date.now,
        required: true
    },
    items: [
        {
            productId: {
                type: Number,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            count: {
                type: Number,
                required: true,
                default: 1
            },
            price: {
                type: Number,
                required: true
            }
        }
    ]
})

module.exports = model('Order', orderSchema)
