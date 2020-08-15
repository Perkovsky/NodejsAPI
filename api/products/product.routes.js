const controller = require('./product.controller')
const auth = require('../../middlewares/auth')

module.exports = Router => {
    const router = new Router({
        prefix: `/products`
    })

    router.get('/groups/:id', auth, controller.getProductsByGroupId)
    router.get('/:id', auth,  controller.getProductById)
    router.get('/search/:searchString', auth, controller.search)

    return router
}
