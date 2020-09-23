const mongoose = require('mongoose')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const rewire = require('rewire')

chai.use(chaiAsPromised)
chai.use(sinonChai)

const expect = chai.expect
const sandbox = sinon.createSandbox()
let OrderService = rewire('../../services/orderService.js')

describe('OrderService', function () {
    const userId = '1'
    const orderId = 112
    const order = {
        _id: '111',
        userId: '1',
        items: [],
        save: sandbox.stub().resolves()
    }

    afterEach(function () {
        sandbox.restore()
        OrderService = rewire('../../services/orderService')
    })

    context('getOrders', function () {
        it('should return an array of objects', async function () {
            // Arrange
            const page = 1
            const pageSize = 25
            const ordersResult = [
                { _id: '111', userId: '1', items: [] },
                { _id: '112', userId: '1', items: [] },
                { _id: '113', userId: '1', items: [] },
            ]
            const stub = sandbox.stub(mongoose.Model, 'find').returns({
                limit: sandbox.stub().returns({
                    skip: sandbox.stub().returns({
                        sort: sandbox.stub().resolves(ordersResult)
                    })
                })
            })

            // Act
            const result = await OrderService.getOrders(userId, page, pageSize)

            // Assert
            expect(stub).to.have.been.calledOnce
            expect(stub).to.have.been.calledWith({userId})
            expect(result).to.be.a('array')
            expect(result.length).to.equal(3)
            expect(result).to.deep.include(ordersResult[1])
        })
    })

    context('getOrderById', function () {
        it('should return null because the order ID is invalid', async function () {
            // Arrange
            const stub = sandbox.stub(mongoose.Model, 'findById').resolves(null)

            // Act
            const result = await OrderService.getOrderById(userId, null)

            // Assert
            expect(stub).to.have.been.callCount(0)
            expect(result).to.be.a('null')
        })

        it('should return an object', async function () {
            // Arrange
            const stub = sandbox.stub(mongoose.Model, 'findById').resolves(order)

            // Act
            const result = await OrderService.getOrderById(userId, orderId)

            // Assert
            expect(stub).to.have.been.calledOnce
            expect(stub).to.have.been.calledWith(orderId)
            expect(result).to.be.a('object')
            expect(result).to.deep.equal(order)
        })

        it('should return null because the user ID is not matched', async function () {
            // Arrange
            const stub = sandbox.stub(mongoose.Model, 'findById').resolves(order)

            // Act
            const result = await OrderService.getOrderById('2', orderId)

            // Assert
            expect(stub).to.have.been.calledOnce
            expect(stub).to.have.been.calledWith(orderId)
            expect(result).to.be.a('null')
        })
    })

    context('createOrder', function () {
        it('should create a new order', async function () {
            // Arrange
            const items = []
            const stub = sandbox.stub().resolves(order)
            const fakeOrderClass = sandbox.stub().returns({save: stub})
            OrderService.__set__('Order', fakeOrderClass)

            // Act
            const result = await OrderService.createOrder(userId, items)

            // Assert
            expect(stub).to.have.been.calledOnce
            expect(result).to.be.a('object')
            expect(result).to.deep.equal(order)
        })
    })

    context('updateOrder', function () {
        it('should return null because the order ID is invalid', async function () {
            // Arrange
            const stub = sandbox.stub(mongoose.Model, 'findOneAndUpdate').resolves(null)

            // Act
            const result = await OrderService.updateOrder(userId, null, null)

            // Assert
            expect(stub).to.have.been.callCount(0)
            expect(result).to.be.a('null')
        })

        it('should update the order', async function () {
            // Arrange
            const items = []
            const stub = sandbox.stub(mongoose.Model, 'findOneAndUpdate').resolves({})

            // Act
            const result = await OrderService.updateOrder(userId, orderId, items)

            // Assert
            expect(stub).to.have.been.calledOnce
            expect(result).to.be.a('object')
        })
    })

    context('deleteOrder', function () {
        it('should return null because the order ID is invalid', async function () {
            // Arrange
            const stub = sandbox.stub(mongoose.Model, 'deleteOne').resolves(null)

            // Act
            const result = await OrderService.deleteOrder(userId, null)

            // Assert
            expect(stub).to.have.been.callCount(0)
            expect(result).to.be.a('null')
        })

        it('should delete the order', async function () {
            // Arrange
            const returnObj = { deletedCount: 1 }
            const stub = sandbox.stub(mongoose.Model, 'deleteOne').resolves(returnObj)

            // Act
            const result = await OrderService.deleteOrder(userId, orderId)

            // Assert
            expect(stub).to.have.been.calledOnce
            expect(stub).to.have.been.calledWith({_id: orderId, userId})
            expect(result).to.be.a('object')
            expect(result).to.have.property('deletedCount', 1)
        })
    })
})
