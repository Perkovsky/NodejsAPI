const {body, validationResult} = require('express-validator') 
const User = require('../models/user')
const logger = require('./logger')

exports.registerValidate = () => {
    const validations = [
        body('email')
            .isEmail()
            .withMessage('Incorrect email.')
            .custom(async (value, {req}) => {
                try {
                    const user = await User.findOne({ email: value.toLowerCase() })
                    if (user) {
                        return Promise.reject('This email is already taken.')
                    }
                } catch (error) {
                    console.log(error.stack)
                    logger.error(error.stack)
                    return Promise.reject('Cannot check email for duplicates.')
                }
            })
            .normalizeEmail(),
        body('password')
            .isLength({min: 6})
            .withMessage('Password must be at least 6 characters.')
            .trim(),
        body('name')
            .isLength({min: 3})
            .withMessage('Name must be at least 3 characters.')
            .trim()
    ]

    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)))
        const errors = validationResult(req)
        
        if (errors.isEmpty()) {
            return next()
        }
  
        res.status(400).json({errors: errors.array()})
    }
}
