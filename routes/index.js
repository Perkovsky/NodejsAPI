const express = require('express')
const groupRoutes = require('./groupRoutes')
const productRoutes = require('./productRoutes')
const router = express.Router()

router.use('/groups', groupRoutes)
router.use('/products', productRoutes)

module.exports = router
