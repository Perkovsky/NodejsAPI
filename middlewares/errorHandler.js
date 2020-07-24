module.exports = function (err, req, res, next) {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'
    res.status(err.statusCode).send(err.message)
}
