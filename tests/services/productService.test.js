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
let ProductService = rewire('../../services/productService.js')

describe('ProductService', function () {
    afterEach(function () {
        sandbox.restore()
        ProductService = rewire('../../services/productService')
    })

    context('getProductsByGroupId', function () {
        it('should return an array of objects', async function () {
            // Arrange
            const groupId = 112
            const productsResult = [
                { _id: '1111', ParentId: '112', Name: 'P1', Price: 12.56, PhotoUrl: '' },
                { _id: '1112', ParentId: '112', Name: 'P2', Price: 14.50, PhotoUrl: '' },
                { _id: '1113', ParentId: '112', Name: 'P3', Price: 11.37, PhotoUrl: '' },
            ]
            const stub = sandbox.stub(mongoose.Model, 'find').returns({
                select: sandbox.stub().resolves(productsResult)
            })

            // Act
            const result = await ProductService.getProductsByGroupId(groupId)

            // Assert
            expect(stub).to.have.been.calledOnce
            expect(stub).to.have.been.calledWith({ParentId: groupId})
            expect(result).to.be.a('array')
            expect(result.length).to.equal(3)
            expect(result).to.deep.include(productsResult[1])
        })
    })

    context('getProductById', function () {
        it('should return an object', async function () {
            // Arrange
            const id = 1112
            const productResult = {
                _id: '1112',
                ParentId: '112',
                Name: 'P2',
                Price: 14.50,
                PhotoUrl: ''
            }
            const stub = sandbox.stub(mongoose.Model, 'findById').resolves(productResult)

            // Act
            const result = await ProductService.getProductById(id)

            // Assert
            expect(stub).to.have.been.calledOnce
            expect(stub).to.have.been.calledWith(id)
            expect(result).to.be.a('object')
            expect(result).to.deep.equal(productResult)
        })
    })

    context('search', function () {
        it('should return an array of objects', async function () {
            // Arrange
            const searchString = 'some text'
            const page = 1
            const pageSize = 25
            const regex = new RegExp('.*' + searchString + '.*' , 'i')
            const productsResult = [
                { _id: '1111', ParentId: '112', Name: 'P1', Price: 12.56, PhotoUrl: '' },
                { _id: '1112', ParentId: '112', Name: 'P2', Price: 14.50, PhotoUrl: '' },
                { _id: '1113', ParentId: '112', Name: 'P3', Price: 11.37, PhotoUrl: '' },
            ]
            const stub = sandbox.stub(mongoose.Model, 'find').returns({
                select: sandbox.stub().returns({
                    limit: sandbox.stub().returns({
                        skip: sandbox.stub().returns({
                            sort: sandbox.stub().resolves(productsResult)
                        })
                    })
                })
            })

            // Act
            const result = await ProductService.search(searchString, page, pageSize)

            // Assert
            expect(stub).to.have.been.calledOnce
            expect(stub).to.have.been.calledWith({ $or: [ {Keywords: regex}, {Name: regex}, {Description: regex} ] })
            expect(result).to.be.a('array')
            expect(result.length).to.equal(3)
            expect(result).to.deep.include(productsResult[1])
        })
    })
})
