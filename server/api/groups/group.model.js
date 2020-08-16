const { Schema, model } = require('mongoose')

const groupSchema = new Schema({
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
    keywords: {
        type: String,
        alias: 'Keywords'
    },
    photoUrl: {
        type: String,
        alias: 'PhotoUrl'
    }
})

module.exports = model('Group', groupSchema)
