const config = require('../config/config')
const OrderService = require('../services/orderService')
    
class OrderController {

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
    async getOrders(req, res, next) {
        try {
            const defaultPage = config.pagination.page
            const defaultPageSize = config.pagination.pageSize
            const maxPageSize = config.pagination.maxPageSize

            const userId = req.user.id
            let { page, pageSize } = req.query

            page = page > 0 ? page : defaultPage
            pageSize = (pageSize > 0 && pageSize <= maxPageSize) 
                ? pageSize 
                : pageSize ? maxPageSize : defaultPageSize

            const result = await OrderService.getOrders(userId, +page, +pageSize)
            return res.status(200).send({result})
        } catch (error) {
            next(error)
        }
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
    *         type: integer
    *         format: int64
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
    async getOrderById(req, res, next) {
        try {
            const userId = req.user.id 
            const id = req.params.id
            const result = await OrderService.getOrderById(userId, id)
            if (result) {
                return res.status(200).send({result})
            } else {
                return res.status(404).send('Order not found.')
            }
        } catch (error) {
            next(error)
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
    *             $ref: '#/definitions/Order'
    *     responses:
    *       201:
    *         description: order
    *         schema:
    *           type: integer
    *           format: int64
    *       401:
    *         description: access token is missing or invalid
    *       500:
    *         description: internal server error
    */
    async createOrder(req, res, next) {
        try {
            const userId = req.user.id
            const items = req.body.items
            const {id} = await OrderService.createOrder(userId, items)
            return res.status(201).send({id})
        } catch (error) {
            next(error)
        }
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
    *         type: integer
    *         format: int64
    *     requestBody:
    *       description: Returns order ID
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/definitions/Order'
    *     responses:
    *       200:
    *         description: order
    *         schema:
    *           type: integer
    *           format: int64
    *       401:
    *         description: access token is missing or invalid
    *       404:
    *         description: order not found
    *       500:
    *         description: internal server error
    */
    async updateOrder(req, res, next) {
        try {
            const userId = req.user.id
            const orderId = req.params.id
            const items = req.body.items
            const {id} = await OrderService.updateOrder(userId, orderId, items)
            if (id) {
                return res.status(200).send({id})
            } else {
                return res.status(404).send('Order not found.')
            }
        } catch (error) {
            next(error)
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
    *         type: integer
    *         format: int64
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
    async deleteOrder(req, res, next) {
        try {
            const userId = req.user.id 
            const id = req.params.id
            const {deletedCount} = await OrderService.deleteOrder(userId, id)
            if (deletedCount > 0) {
                return res.status(204).send()
            } else {
                return res.status(404).send('Order not found.')
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new OrderController()
