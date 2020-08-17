const AuthService = require('./auth.service')

exports.login = async ctx => {
    const { email, password } = ctx.request.body
    const { error, token } = await AuthService.login(email, password)
    if (error) {
        ctx.status = 401
        ctx.body = error
    } else {
        ctx.status = 200
        ctx.body = { token }
    }
}
