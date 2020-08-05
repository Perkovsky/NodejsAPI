const Product = require('../models/product')

class ProductService {
    async getProductsByGroupId(groupId) {
        return await Product.find({ParentId: groupId})
    }

    async getProductById(id) {
        return await Product.findById(id)
    }

    async search(searchString, page, pageSize) {
        const regex = new RegExp('.*' + searchString + '.*' , 'i')
        return await Product.find({ $or: [ {Keywords: regex}, {Name: regex}, {Description: regex} ] })
            .limit(pageSize)
            .skip((page - 1) * pageSize)
            .sort({Name: 'asc'})
    }
}

module.exports = new ProductService()
