const express = require('express')
const auth = require('../middlewares/auth')
const ProductController = require('../controllers/productController')
const router = express.Router()

router.route('/groups/:id').get(auth, ProductController.getProductsByGroupId)
router.route('/:id').get(auth, ProductController.getProductById)
router.route('/search/:searchString').get(auth, ProductController.search)

module.exports = router
