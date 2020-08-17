const controller = require('./auth.controller')

module.exports = Router => {
    const router = new Router({
        prefix: ``
    })

    router.post('/login', controller.login)

    return router
}
