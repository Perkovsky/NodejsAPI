const {Schema, model} = require('mongoose')

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

/**
 * @swagger
 *  components:
 *    schemas:
 *      Product:
 *        type: object
 *        required:
 *          - _id
 *          - name
 *        properties:
 *          _id:
 *            type: integer
 *            format: int64
 *          parentId:
 *            type: integer
 *            format: int64
 *          name:
 *            type: string
 *          brandProduct:
 *            type: object
 *            required:
 *              - _id
 *              - name
 *            properties:
 *              _id:
 *                type: integer
 *                format: int64
 *              name:
 *                type: string
 *          keywords:
 *            type: string
 *          availability:
 *            type: string
 *          description:
 *            type: string
 *          photoUrl:
 *            type: string
 *            format: uri
 *          photoUrlBig:
 *            type: string
 *            format: uri
 *          videoUrl:
 *            type: string
 *            format: uri
 *          price:
 *            type: number
 *            format: double
 *          statusProduct:
 *            type: integer
 *            format: int32
 *          wholesalePacking:
 *            type: integer
 *            format: int32
 *          limitOrderDays:
 *            nullable: true
 *            type: integer
 *            format: int32
 * definitions:
 *   Product:
 *     type: object
 *     required:
 *       - _id
 *       - name
 *     properties:
 *       _id:
 *         type: integer
 *         format: int64
 *       parentId:
 *         type: integer
 *         format: int64
 *       name:
 *         type: string
 *       brandProduct:
 *         type: object
 *         required:
 *           - _id
 *           - name
 *         properties:
 *           _id:
 *             type: integer
 *             format: int64
 *           name:
 *             type: string
 *       keywords:
 *         type: string
 *       availability:
 *         type: string
 *       description:
 *         type: string
 *       photoUrl:
 *         type: string
 *         format: uri
 *       photoUrlBig:
 *         type: string
 *         format: uri
 *       videoUrl:
 *         type: string
 *         format: uri
 *       price:
 *         type: number
 *         format: double
 *       statusProduct:
 *         type: integer
 *         format: int32
 *       wholesalePacking:
 *         type: integer
 *         format: int32
 *       limitOrderDays:
 *         nullable: true
 *         type: integer
 *         format: int32
 */