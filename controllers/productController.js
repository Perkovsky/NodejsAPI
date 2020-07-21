
const config = require('../config/config')
const ProductService = require('../services/productService')
    
class ProductController {

    /**
    * @swagger
    * /api/products/groups/{id}:
    *   get:
    *     tags:
    *      - products
    *     summary: Get products by group ID
    *     description: Returns products by group ID
    *     produces:
    *      - application/json
    *     parameters:
    *       - name: id
    *         description: group ID
    *         in: path
    *         required: true
    *         type: integer
    *         format: int64
    *     responses:
    *       200:
    *         description: products
    *         schema:
    *           type: array
    *           items:
    *             $ref: '#/definitions/Product'
    */
    async getProductsByGroupId(req, res, next) {
        try {
            const result = await ProductService.getProductsByGroupId(+req.params.id)
            return res.status(200).send({result})
        } catch (error) {
            next(error)
        }
    }

    /**
    * @swagger
    * /api/products/{id}:
    *   get:
    *     tags:
    *      - products
    *     summary: Get product by ID
    *     description: Returns product by ID
    *     produces:
    *      - application/json
    *     parameters:
    *       - name: id
    *         description: product ID
    *         in: path
    *         required: true
    *         type: integer
    *         format: int64
    *     responses:
    *       200:
    *         description: product
    *         schema:
    *           type: object
    *           $ref: '#/definitions/Product'
    *       404:
    *         description: product not found
    */
    async getProductById(req, res, next) {
        try {
            const result = await ProductService.getProductById(+req.params.id)
            if (result) {
                return res.status(200).send({result})
            } else {
                return res.status(404).send('Product not found.')
            }
        } catch (error) {
            next(error)
        }
    }

    /**
    * @swagger
    * /api/products/search/{searchString}:
    *   get:
    *     tags:
    *      - products
    *     summary: Search products
    *     description: Search products
    *     produces:
    *      - application/json
    *     parameters:
    *       - name: searchString
    *         description: search string
    *         in: path
    *         required: true
    *         type: string
    *       - name: page
    *         description: current page, by default = 1
    *         in: query
    *         type: integer
    *         format: int32
    *       - name: pageSize
    *         description: max products on page, by default = 25
    *         in: query
    *         type: integer
    *         format: int32
    *     responses:
    *       200:
    *         description: products
    *         schema:
    *           type: array
    *           items:
    *             $ref: '#/definitions/Product'
    */
    async search(req, res, next) {
        try {
            const defaultPage = config.pagination.page
            const defaultPageSize = config.pagination.pageSize
            const maxPageSize = config.pagination.maxPageSize

            const searchString = req.params.searchString
            let { page, pageSize } = req.query

            page = page > 0 ? page : defaultPage
            pageSize = (pageSize > 0 && pageSize <= maxPageSize) 
                ? pageSize 
                : pageSize ? maxPageSize : defaultPageSize

            const result = await ProductService.search(searchString, +page, +pageSize)
            return res.status(200).send({result})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new ProductController()
