const controller = require('./auth.controller')
//const {registerValidate} = require('../infrastructure/validators')

module.exports = Router => {
    const router = new Router({
        prefix: ``
    })

    router.post('/register', /*registerValidate(),*/ controller.register)
    router.post('/login', controller.login)

    return router
}
