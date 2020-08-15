const AuthService = require('./auth.service')

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
exports.register = async ctx => {
    const { email, name, password } = ctx.body
    const { id } = await AuthService.register(email, name, password)
    ctx.status = 201
    ctx.body = { id, name, email }
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
*            format: password
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
*         format: password
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
exports.login = async ctx => {
    const { email, password } = ctx.body
    const { error, token } = await AuthService.login(email, password)
    if (error) {
        ctx.status = 401
        ctx.body = error
    } else {
        ctx.status = 200
        ctx.body = { token }
    }
}
