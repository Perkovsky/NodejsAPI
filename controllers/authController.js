const AuthService = require('../services/authService')

class AuthController {

    /**
    * @swagger
    * /api/auth/register:
    *   post:
    *     tags:
    *       - auth
    *     summary: Register new user
    *     requestBody:
    *       description: Returns new user
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/User'
    *     responses:
    *       201:
    *         description: user registered
    *       400:
    *         description: model did not pass validation
    *       500:
    *         description: internal server error
    */
    async register(req, res, next) {
        try {
            const {email, name, password} = req.body
            const {id} = await AuthService.register(email, name, password)
            return res.status(201).send({id, name, email})
        } catch (error) {
            next(error)
        }
    }

    /**
    * @swagger
    *  components:
    *    schemas:
    *      Login:
    *        type: object
    *        required:
    *          - email
    *          - password
    *        properties:
    *          email:
    *            type: string
    *            format: email
    *          password:
    *            type: string
    * definitions:
    *   Login:
    *     type: object
    *     required:
    *       - email
    *       - password
    *     properties:
    *       email:
    *         type: string
    *         format: email
    *       password:
    *         type: string
    * /api/auth/login:
    *   post:
    *     tags:
    *       - auth
    *     summary: Login
    *     requestBody:
    *       description: Returns the token
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/Login'
    *     responses:
    *       200:
    *         description: user logged in successfully
    *       401:
    *         description: incorrect email or password
    *       500:
    *         description: internal server error
    */
    async login(req, res, next) {
        try {
            const {email, password} = req.body
            const {error, token} = await AuthService.login(email, password)
            if (error) {
                return res.status(401).send(error)
            } else {
                return res.status(200).send({token})
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new AuthController()
