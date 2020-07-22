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
    */
    async register(req, res, next) {
        try {
            const {email, name, password} = req.body
            const {id} = await AuthService.register(email, name, password)
            return res.status(200).send({id, name, email})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new AuthController()
