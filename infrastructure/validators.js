const { body, validationResults } = require('koa-req-validation') 
const User = require('../api/auth/user.model')

exports.registerValidator = [
    body('email')
        .isEmail()
        .withMessage('Incorrect email.')
        .custom(async value => {
            const user = await User.findOne({ email: value.toLowerCase() })
            if (user) throw new Error('This email is already taken.')
        })
        .normalizeEmail()
        .build(),
    body('password')
        .isLength({min: 6})
        .withMessage('Password must be at least 6 characters.')
        .trim()
        .build(),
    body('name')
        .isLength({min: 3})
        .withMessage('Name must be at least 3 characters.')
        .trim()
        .build(),
    async (ctx, next) => {
        const errors = validationResults(ctx)
        if (errors.hasErrors()) {
            ctx.status = 400
            ctx.body = { errors: errors.mapped() }
        } else {
            await next()
        }
    }
]
