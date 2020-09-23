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
let GroupService = rewire('../../services/groupService')

describe('GroupService', function () {
    afterEach(function () {
        sandbox.restore()
        GroupService = rewire('../../services/groupService')
    })

    context('getGroups', function () {
        it('should return an array of objects', async function () {
            // Arrange
            const groupsResult = [
                { _id: '111', ParentId: '100', Name: 'G1', PhotoUrl: '' },
                { _id: '112', ParentId: '100', Name: 'G2', PhotoUrl: '' },
                { _id: '113', ParentId: '100', Name: 'G3', PhotoUrl: '' },
            ]
            const stub = sandbox.stub(mongoose.Model, 'find').returns({
                select: sandbox.stub().resolves(groupsResult)
            })

            // Act
            const result = await GroupService.getGroups()

            // Assert
            expect(stub).to.have.been.calledOnce
            expect(result).to.be.a('array')
            expect(result.length).to.equal(3)
            expect(result).to.deep.include(groupsResult[1])
        })
    })

    context('getGroupsByParentId', function () {
        it('should return an array of objects', async function () {
            // Arrange
            const parentId = 100
            const groupsResult = [
                { _id: '111', ParentId: '100', Name: 'G1', PhotoUrl: '' },
                { _id: '112', ParentId: '100', Name: 'G2', PhotoUrl: '' },
                { _id: '113', ParentId: '100', Name: 'G3', PhotoUrl: '' },
            ]
            const stub = sandbox.stub(mongoose.Model, 'find').returns({
                select: sandbox.stub().resolves(groupsResult)
            })

            // Act
            const result = await GroupService.getGroupsByParentId(parentId)

            // Assert
            expect(stub).to.have.been.calledOnce
            expect(stub).to.have.been.calledWith({ParentId: parentId})
            expect(result).to.be.a('array')
            expect(result.length).to.equal(3)
            expect(result).to.deep.include(groupsResult[1])
        })
    })
})
