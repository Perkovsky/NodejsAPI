const { DATE, NOW } = require('sequelize')
const sequelize = require('./index')
const { entity, options } = require('./commonModel')
const User = require('./user')
const OrderItem = require('./orderItem')

const order = sequelize.define('Order', {
    ...entity,
    dateCreated: {
        type: DATE,
        defaultValue: NOW,
        allowNull: false
    },
    dateModified: {
        type: DATE,
        defaultValue: NOW,
        allowNull: false
    }
}, {
    ...options
})

order.belongsTo(User, {
    foreignKey: 'UserId',
    as: 'user'
})
order.hasMany(OrderItem, {
    foreignKey: 'orderId',
    as: 'orderItems',
    onDelete: 'CASCADE'
})

module.exports = order

/**
 * @swagger
 *  components:
 *    schemas:
 *      Order:
 *        type: object
 *        required:
 *          - items
 *        properties:
 *          userId:
 *            type: integer
 *            format: int64
 *          dateCreated:
 *            type: string
 *            format: date
 *          dateModified:
 *            type: string
 *            format: date
 *          items:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                  format: int64
 *                productId:
 *                  type: integer
 *                  format: int64
 *                count:
 *                  type: integer
 *                  format: int32
 *                price:
 *                  type: number
 *                  format: float
 * definitions:
 *   Order:
 *     type: object
 *     required:
 *       - items
 *     properties:
 *       items:
 *         type: array
 *         items:
 *           type: object
 *           properties:
 *             productId:
 *               type: integer
 *               format: int64
 *             count:
 *               type: integer
 *               format: int32
 *             price:
 *               type: number
 *               format: float
 */
