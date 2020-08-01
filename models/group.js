const { INTEGER, STRING } = require('sequelize')
const sequelize = require('./index')
const { entity, options } = require('./commonModel')

const group = sequelize.define('Group', {
    ...entity,
    parentId: {
        type: INTEGER,
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
    photoUrl: {
        type: STRING,
        field: 'PhotoUrl',
        validate: {
            isUrl: true
        }
    }
}, { 
    ...options
})

module.exports = group

/**
 * @swagger
 *  components:
 *    schemas:
 *      Group:
 *        type: object
 *        required:
 *          - id
 *          - name
 *        properties:
 *          id:
 *            type: integer
 *            format: int64
 *          parentId:
 *            nullable: true
 *            type: integer
 *            format: int64
 *          name:
 *            type: string
 *          keywords:
 *            type: string
 *          photoUrl:
 *            type: string
 *            format: uri
 * definitions:
 *   Group:
 *     type: object
 *     required:
 *       - id
 *       - name
 *     properties:
 *       id:
 *         type: integer
 *         format: int64
 *       parentId:
 *         nullable: true
 *         type: integer
 *         format: int64
 *       name:
 *         type: string
 *       keywords:
 *         type: string
 *       photoUrl:
 *         type: string
 *         format: uri
 */
