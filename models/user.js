const { STRING } = require('sequelize')
const sequelize = require('./index')
const { entity, options } = require('./commonModel')
const bcrypt = require("bcrypt")

function hashPassword (user, options) {
    if(!user.changed('password')) {
        return
    }
    return bcrypt.hash(user.password, 10)
        .then(function(hash) {
            user.password = hash
        })
}

const user = sequelize.define('User', {
    ...entity,
    email: {
        type: STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    name: {
        type: STRING,
        allowNull: false
    },
    password: {
        type: STRING,
        allowNull: false
    }
}, { 
    ...options,
    hooks: {
        beforeCreate: hashPassword,
        beforeUpdate: hashPassword
    }
})

user.prototype.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

module.exports = user

/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - email
 *          - name
 *          - password
 *        properties:
 *          name:
 *            type: string
 *          email:
 *            type: string
 *            format: email
 *          password:
 *            type: string
 *            format: password
 * definitions:
 *   User:
 *     type: object
 *     required:
 *       - email
 *       - name
 *       - password
 *     properties:
 *       name:
 *         type: string
 *       email:
 *         type: string
 *         format: email
 *       password:
 *         type: string
 *         format: password
 */
