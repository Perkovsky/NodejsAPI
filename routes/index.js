const express = require('express')
const authRoutes = require('./authRoutes')
const groupRoutes = require('./groupRoutes')
const productRoutes = require('./productRoutes')
const router = express.Router()

router.use('/auth', authRoutes)
router.use('/groups', groupRoutes)
router.use('/products', productRoutes)

module.exports = router
