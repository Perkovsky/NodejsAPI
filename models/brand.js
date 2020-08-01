const { STRING } = require('sequelize')
const sequelize = require('./index')
const { entity, options } = require('./commonModel')

const brand = sequelize.define('Brand', {
    ...entity,
    name: {
        type: STRING,
        allowNull: false,
        field: 'Name'
    }
}, { 
    ...options
})

module.exports = brand

/**
 * @swagger
 *  components:
 *    schemas:
 *      Brand:
 *        type: object
 *        required:
 *          - id
 *          - name
 *        properties:
 *          id:
 *            type: integer
 *            format: int64
 *          name:
 *            type: string
 * definitions:
 *   Brand:
 *     type: object
 *     required:
 *       - id
 *       - name
 *     properties:
 *       id:
 *         type: integer
 *         format: int64
 *       name:
 *         type: string
 */
