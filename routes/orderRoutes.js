const express = require('express')
const auth = require('../middlewares/auth')
const OrderController = require('../controllers/orderController')
const router = express.Router()

router.route('/').get(auth, OrderController.getOrders)
router.route('/:id').get(auth, OrderController.getOrderById)
router.route('/').post(auth, OrderController.createOrder)
router.route('/:id').put(auth, OrderController.updateOrder)
router.route('/:id').delete(auth, OrderController.deleteOrder)

module.exports = router
