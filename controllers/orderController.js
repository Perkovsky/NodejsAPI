const config = require('../config/config')
const OrderService = require('../services/orderService')
    
class OrderController {

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
