const controller = require('./dashboard.controller')

module.exports = Router => {
    const router = new Router({
        prefix: `/dashboard`
    })

    router.get('/', controller.getCounters)

    return router
}
