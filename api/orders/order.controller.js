const config = require('../../config/config')
const OrderService = require('./order.service')
    
/**
* @swagger
* /api/orders:
*   get:
*     tags:
*      - orders
*     security:
*      - bearerAuth: []
*     summary: Get all orders of current user
*     description: Returns orders
*     produces:
*      - application/json
*     parameters:
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
*         description: orders
*         schema:
*           type: array
*           items:
*             $ref: '#/definitions/Order'
*       401:
*         description: access token is missing or invalid
*       500:
*         description: internal server error
*/
exports.getOrders = async ctx => {
    const defaultPage = config.pagination.page
    const defaultPageSize = config.pagination.pageSize
    const maxPageSize = config.pagination.maxPageSize

    const userId = ctx.user.id
    let { page, pageSize } = ctx.query

    page = page > 0 ? page : defaultPage
    pageSize = (pageSize > 0 && pageSize <= maxPageSize) 
        ? pageSize 
        : pageSize ? maxPageSize : defaultPageSize

    const result = await OrderService.getOrders(userId, +page, +pageSize)
    ctx.status = 200
    ctx.body = result
}

/**
* @swagger
* /api/orders/{id}:
*   get:
*     tags:
*      - orders
*     security:
*      - bearerAuth: []
*     summary: Get order by ID
*     description: Returns order by ID
*     produces:
*      - application/json
*     parameters:
*       - name: id
*         description: order ID
*         in: path
*         required: true
*         type: string
*         format: uuid
*     responses:
*       200:
*         description: order
*         schema:
*           type: object
*           $ref: '#/definitions/Order'
*       401:
*         description: access token is missing or invalid
*       404:
*         description: order not found
*       500:
*         description: internal server error
*/
exports.getOrderById = async ctx => {
    const userId = ctx.user.id 
    const { id } = ctx.params
    const result = await OrderService.getOrderById(userId, id)
    if (result) {
        ctx.status = 200
        ctx.body = result
    } else {
        ctx.status = 404
        ctx.body = 'Order not found.'
    }
}

/**
* @swagger
* /api/orders:
*   post:
*     tags:
*      - orders
*     security:
*      - bearerAuth: []
*     summary: Create new order
*     requestBody:
*       description: Returns order ID
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Order'
*     responses:
*       201:
*         description: order
*         schema:
*           type: string
*           format: uuid
*       401:
*         description: access token is missing or invalid
*       500:
*         description: internal server error
*/
exports.createOrder = async ctx => {
    const userId = ctx.user.id
    const items = ctx.body.items
    const { id } = await OrderService.createOrder(userId, items)
    ctx.status = 201
    ctx.body = { id }
}

/**
* @swagger
* /api/orders/{id}:
*   put:
*     tags:
*      - orders
*     security:
*      - bearerAuth: []
*     summary: Update order
*     produces:
*      - application/json
*     parameters:
*       - name: id
*         description: order ID
*         in: path
*         required: true
*         type: string
*         format: uuid
*     requestBody:
*       description: Returns order ID
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Order'
*     responses:
*       200:
*         description: order
*         schema:
*           type: string
*           format: uuid
*       401:
*         description: access token is missing or invalid
*       404:
*         description: order not found
*       500:
*         description: internal server error
*/
exports.updateOrder = async ctx => {
    const userId = ctx.user.id
    const orderId = ctx.params.id
    const items = ctx.body.items
    const { id } = await OrderService.updateOrder(userId, orderId, items)
    if (id) {
        ctx.status = 200
        ctx.body = { id }
    } else {
        ctx.status = 404
        ctx.body = 'Order not found.'
    }
}

/**
* @swagger
* /api/orders/{id}/:
*   delete:
*     tags:
*      - orders
*     security:
*      - bearerAuth: []
*     summary: Delete order
*     description: Delete order
*     produces:
*      - application/json
*     parameters:
*       - name: id
*         description: order ID
*         in: path
*         required: true
*         type: string
*         format: uuid
*     responses:
*       204:
*         description: order deleted successfully
*       401:
*         description: access token is missing or invalid
*       404:
*         description: order not found
*       500:
*         description: internal server error
*/
exports.deleteOrder = async ctx => {
    const userId = ctx.user.id 
    const id = ctx.params.id
    const { deletedCount } = await OrderService.deleteOrder(userId, id)
    if (deletedCount > 0) {
        ctx.status = 204
    } else {
        ctx.status = 404
        ctx.body = 'Order not found.'
    }
}
