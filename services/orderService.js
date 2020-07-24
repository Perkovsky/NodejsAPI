const mongoose = require('mongoose')
const Order = require('../models/order')

class OrderService {
    async getOrders(userId, page, pageSize) {
        return await Order.find({userId})
            .limit(pageSize)
            .skip((page - 1) * pageSize)
            .sort({dateCreated: 'desc'})
    }

    async getOrderById(userId, id) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return null
        }
        const result = await Order.findById(id)
        if (result && result.userId == userId) {
            return result
        } else {
            return null
        }
    }

    async createOrder(userId, items) {
        const order = new Order({userId, items})
        return await order.save()
    }

    async updateOrder(userId, id, items) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return null
        }
        const filter = { _id: id, userId }
        const update = { items, dateModified: Date.now() }
        return await Order.findOneAndUpdate(filter, update)
    }

    async deleteOrder(userId, id) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return null
        }
        return await Order.deleteOne({_id: id, userId})
    }
}

module.exports = new OrderService()
