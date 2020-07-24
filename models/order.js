const {Schema, model} = require('mongoose')

const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dateCreted: {
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
 *            type: string
 *            format: uuid
 *          dateCreted:
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
 *                productId:
 *                  type: integer
 *                  format: int64
 *                name:
 *                  type: string
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
 *       userId:
 *         type: integer
 *         format: int64
 *       dateCreted:
 *         type: string
 *         format: date
 *       dateModified:
 *         type: string
 *         format: date
 *       items:
 *         type: array
 *         items:
 *           type: object
 *           properties:
 *             productId:
 *               type: integer
 *               format: int64
 *             name:
 *               type: string
 *             count:
 *               type: integer
 *               format: int32
 *             price:
 *               type: number
 *               format: float
 */
