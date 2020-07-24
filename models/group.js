const {Schema, model} = require('mongoose')

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

/**
 * @swagger
 *  components:
 *    schemas:
 *      Group:
 *        type: object
 *        required:
 *          - _id
 *          - name
 *        properties:
 *          _id:
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
 *       - _id
 *       - name
 *     properties:
 *       _id:
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
