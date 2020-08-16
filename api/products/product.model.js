const { Schema, model } = require('mongoose')

const productSchema = new Schema({
    _id: {
        type: Number,
        required: true
    },
    parentId: {
        type: Number,
        alias: 'ParentId'
    },
    name: {
        type: String,
        alias: 'Name',
        required: true
    },
    price: {
        type: Number,
        alias: 'Price'
    },
    statusProduct: {
        type: Number,
        alias: 'StatusProduct'
    },
    brandProduct: {
        _id: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            alias: 'Name',
            required: true
        }
    },
    description: {
        type: String,
        alias: 'Description'
    },
    keywords: {
        type: String,
        alias: 'Keywords'
    },
    photoUrl: {
        type: String,
        alias: 'PhotoUrl'
    },
    photoUrlBig: {
        type: String,
        alias: 'PhotoUrlBig'
    },
    videoUrl: {
        type: String,
        alias: 'VideoUrl'
    },
    availability: {
        type: String,
        alias: 'Availability'
    },
    wholesalePacking: {
        type: Number,
        alias: 'WholesalePacking'
    },
    limitOrderDays: {
        type: Number,
        alias: 'LimitOrderDays'
    }
})

module.exports = model('Product', productSchema)
