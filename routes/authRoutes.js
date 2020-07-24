const express = require('express')
const AuthController = require('../controllers/authController')
const router = express.Router()
const {registerValidate} = require('../infrastructure/validators')

router.route('/register').post(registerValidate(), AuthController.register)
router.route('/login').post(AuthController.login)

module.exports = router
