const { INTEGER, DECIMAL, STRING } = require('sequelize')
const sequelize = require('./index')
const { entity, options } = require('./commonModel')
const Brand = require('./brand')

const product = sequelize.define('Product', {
    ...entity,
    parentId: {
        type: INTEGER,
        allowNull: false,
        field: 'ParentId'
    },
    name: {
        type: STRING,
        allowNull: false,
        field: 'Name'
    },
    keywords: {
        type: STRING,
        field: 'Keywords'
    },
    price: {
        type: DECIMAL(10, 2),
        field: 'Price'
    },
    statusProduct: {
        type: INTEGER,
        field: 'StatusProduct'
    },
    description: {
        type: STRING,
        field: 'Description'
    },
    photoUrl: {
        type: STRING,
        field: 'PhotoUrl',
        validate: {
            isUrl: true
        }
    },
    photoUrlBig: {
        type: STRING,
        field: 'PhotoUrlBig',
        validate: {
            isUrl: true
        }
    },
    videoUrl: {
        type: STRING,
        field: 'VideoUrl',
        validate: {
            isUrl: true
        }
    },
    availability: {
        type: STRING,
        field: 'Availability'
    },
    wholesalePacking: {
        type: INTEGER,
        field: 'WholesalePacking'
    },
    limitOrderDays: {
        type: INTEGER,
        field: 'LimitOrderDays'
    }
}, { 
    ...options
})

product.belongsTo(Brand, {
    foreignKey: 'BrandId',
    as: 'brand'
})

module.exports = product

/**
 * @swagger
 *  components:
 *    schemas:
 *      Product:
 *        type: object
 *        required:
 *          - id
 *          - name
 *        properties:
 *          id:
 *            type: integer
 *            format: int64
 *          parentId:
 *            type: integer
 *            format: int64
 *          name:
 *            type: string
 *          brandId:
 *            type: integer
 *            format: int64
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
 *       - id
 *       - name
 *     properties:
 *       id:
 *         type: integer
 *         format: int64
 *       parentId:
 *         type: integer
 *         format: int64
 *       name:
 *         type: string
 *       brandId:
 *         type: integer
 *         format: int64
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
