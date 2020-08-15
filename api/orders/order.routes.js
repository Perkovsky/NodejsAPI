const controller = require('./order.controller')
const auth = require('../../middlewares/auth')

module.exports = Router => {
    const router = new Router({
        prefix: `/orders`
    })

    router.get('/', auth, controller.getOrders)
    router.get('/:id', auth, controller.getOrderById)
    router.post('/', auth, controller.createOrder)
    router.put('/:id', auth, controller.updateOrder)
    router.delete('/:id', auth, controller.deleteOrder)

    return router
}
