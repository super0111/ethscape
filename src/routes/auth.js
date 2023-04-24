const express = require('express');

const router = express.Router();
const AuthController = require('../modules/controllers/authController');

router.post('/register', AuthController.register)
router.post('/login/forum', AuthController.forumLogin)
router.post('/login/game', AuthController.gameLogin)

module.exports = router
