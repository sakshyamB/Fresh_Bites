const express = require('express');
const AuthController = require('../controllers/Authcontroller');
const router = express.Router();

router.post('/signup', AuthController.PostSignup);
router.post('/login',  AuthController.PostLogin);

module.exports = router;