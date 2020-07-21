const express = require('express')
const ProductController = require('../controllers/productController')
const router = express.Router()

router.route('/groups/:id').get(ProductController.getProductsByGroupId)
router.route('/:id').get(ProductController.getProductById)
router.route('/search/:searchString').get(ProductController.search)

module.exports = router