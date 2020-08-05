const {Schema, model} = require('mongoose')

const groupSchema = new Schema({
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
    Keywords: {
        type: String
    },
    PhotoUrl: {
        type: String
    }
})

module.exports = model('Group', groupSchema)
