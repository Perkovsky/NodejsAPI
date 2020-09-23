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
let AuthService = rewire('../../services/authService.js')

describe('AuthService', function () {
    const email = 'user@example.com'
    const name = 'Username'
    const password = '111111'
    const error = { error: 'Authentication failed.'}
    const user = {
        _id: '1',
        name,
        email,
        save: sandbox.stub().resolves(),
        comparePassword: () => {}
    }

    afterEach(function () {
        sandbox.restore()
        AuthService = rewire('../../services/authService')
    })

    context('register', function () {
        it('should save the user and return it', async function () {
            // Arrange
            const stub = sandbox.stub().resolves(user)
            const fakeUserClass = sandbox.stub().returns({save: stub})
            AuthService.__set__('User', fakeUserClass)

            // Act
            const result = await AuthService.register(email, name, password)

            // Assert
            expect(stub).to.have.been.calledOnce
            expect(result).to.be.a('object')
            expect(result).to.deep.equal(user)
        })
    })

    context('login', function () {
        it('should return an error because the user was not found', async function () {
            // Arrange
            const stub = sandbox.stub(mongoose.Model, 'findOne').resolves(null)

            // Act
            const result = await AuthService.login(email, password)

            // Assert
            expect(stub).to.have.been.calledOnce
            expect(stub).to.have.been.calledWith({email})
            expect(result).to.be.a('object')
            expect(result).to.deep.equal(error)
        })

        it('should return an error because the password is incorrect', async function () {
            // Arrange
            const stubFindOne = sandbox.stub(mongoose.Model, 'findOne').resolves(user)
            const stubComparePassword = sandbox.stub(user, 'comparePassword').returns(false)

            // Act
            const result = await AuthService.login(email, password)

            // Assert
            expect(stubFindOne).to.have.been.calledOnce
            expect(stubFindOne).to.have.been.calledWith({email})
            expect(stubComparePassword).to.have.been.calledOnce
            expect(stubComparePassword).to.have.been.calledWith(password)
            expect(result).to.be.a('object')
            expect(result).to.deep.equal(error)
        })

        it('should return a valid token', async function () {
            // Arrange
            const stubFindOne = sandbox.stub(mongoose.Model, 'findOne').resolves(user)
            const stubComparePassword = sandbox.stub(user, 'comparePassword').returns(true)

            // Act
            const result = await AuthService.login(email, password)

            // Assert
            expect(stubFindOne).to.have.been.calledOnce
            expect(stubFindOne).to.have.been.calledWith({email})
            expect(stubComparePassword).to.have.been.calledOnce
            expect(stubComparePassword).to.have.been.calledWith(password)
            expect(result).to.be.a('object')
            expect(result).to.have.property('token')
        })
    })
})
