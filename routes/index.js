const express = require('express')
const authRoutes = require('./authRoutes')
const groupRoutes = require('./groupRoutes')
const productRoutes = require('./productRoutes')
const orderRoutes = require('./orderRoutes')
const router = express.Router()

router.use('/auth', authRoutes)
router.use('/groups', groupRoutes)
router.use('/products', productRoutes)
router.use('/orders', orderRoutes)

module.exports = router
