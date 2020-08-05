const {Schema, model} = require('mongoose')

const productSchema = new Schema({
    _id: {
        type: Number,
        required: true
    },
    ParentId: {
        type: Number
    },
    Name: {
        type: String,
        required: true
    },
    Price: {
        type: Number
    },
    StatusProduct: {
        type: Number
    },
    BrandProduct: {
        _id: {
            type: Number,
            required: true
        },
        Name: {
            type: String,
            required: true
        }
    },
    Description: {
        type: String
    },
    Keywords: {
        type: String
    },
    PhotoUrl: {
        type: String
    },
    PhotoUrlBig: {
        type: String
    },
    VideoUrl: {
        type: String
    },
    Availability: {
        type: String
    },
    WholesalePacking: {
        type: Number
    },
    LimitOrderDays: {
        type: Number
    }
})

module.exports = model('Product', productSchema)
