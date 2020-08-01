const { INTEGER, DECIMAL } = require('sequelize')
const sequelize = require('./index')
const { entity, options } = require('./commonModel')
const Product = require('./product')

const orderItem = sequelize.define('OrderItem', {
    ...entity,
    count: {
        type: INTEGER,
        defaultValue: 1,
        allowNull: false
    },
    price: {
        type: DECIMAL(10, 2),
        allowNull: false
    }
}, {
    ...options
})

orderItem.belongsTo(Product, {
    foreignKey: 'productId',
    as: 'product'
})

module.exports = orderItem
