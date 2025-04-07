
const express = require('express')
const router = express.Router()
const controller = require('../controllers/UserController')

router.get('/',controller.verify)
router.get('/getusers',controller.getAllUser)
router.get('/user/:id',controller.getById)
router.post('/register',controller.register)
router.post('/login',controller.login)
router.get('/logout',controller.logout)

module.exports = router;