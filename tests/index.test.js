const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const rewire = require('rewire')
const request = require('supertest')

chai.use(chaiAsPromised)
chai.use(sinonChai)

const expect = chai.expect
const sandbox = sinon.createSandbox()
let app = rewire('../index.js')

describe('Index', function () {
    afterEach(function () {
        sandbox.restore()
        app = rewire('../index.js')
    })

    context('GET /api/groups', function () {
        it('should return 401 Access token is missing or invalid.', function (done) {
            request(app).get('/api/groups')
                .expect(401)
                .end((err, res) => done(err))
        })

        it('should get all groups', function (done) {

            //see: how to test with toten
            //https://blog.stvmlbrn.com/2018/06/18/test-jwt-authenticated-express-routes-with-jest-and-supertest.html

            request(app)
                .get('/api/groups')
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    // expect(res.body).to.have.property('name').to.equal('Foo Fooing Bar')
                    done(err)
                })
        })
    })
})
