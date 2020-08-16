const controller = require('./auth.controller')
const { registerValidator } = require('../../infrastructure/validators')

module.exports = Router => {
    const router = new Router({
        prefix: ``
    })

    router.post('/register', ...registerValidator, controller.register)
    router.post('/login', controller.login)

    return router
}
