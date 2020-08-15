const config = require('../../config/config')
const ProductService = require('./product.service')
    
/**
* @swagger
* /api/products/groups/{id}:
*   get:
*     tags:
*      - products
*     security:
*      - bearerAuth: []
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
*       401:
*         description: access token is missing or invalid
*       500:
*         description: internal server error
*/
exports.getProductsByGroupId = async ctx => {
    const { id } = ctx.params
    const result = await ProductService.getProductsByGroupId(+id)
    ctx.status = 200
    ctx.body = result
}

/**
* @swagger
* /api/products/{id}:
*   get:
*     tags:
*      - products
*     security:
*      - bearerAuth: []
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
*       401:
*         description: access token is missing or invalid
*       404:
*         description: product not found
*       500:
*         description: internal server error
*/
exports.getProductById = async ctx => {
    const { id } = ctx.params
    const result = await ProductService.getProductById(+id)
    if (result) {
        ctx.status = 200
        ctx.body = result
    } else {
        ctx.status = 404
        ctx.body = 'Product not found.'
    }
}

/**
* @swagger
* /api/products/search/{searchString}:
*   get:
*     tags:
*      - products
*     security:
*      - bearerAuth: []
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
*       401:
*         description: access token is missing or invalid
*       500:
*         description: internal server error
*/
exports.search = async ctx => {
    const defaultPage = config.pagination.page
    const defaultPageSize = config.pagination.pageSize
    const maxPageSize = config.pagination.maxPageSize

    const { searchString } = ctx.params
    let { page, pageSize } = ctx.query

    page = page > 0 ? page : defaultPage
    pageSize = (pageSize > 0 && pageSize <= maxPageSize) 
        ? pageSize 
        : pageSize ? maxPageSize : defaultPageSize

    const result = await ProductService.search(searchString, +page, +pageSize)
    ctx.status = 200
    ctx.body = result
}
