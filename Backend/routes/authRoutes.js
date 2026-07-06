const express = require('express');
const AuthController = require('../controllers/Authcontroller');
const authRoutes = express.Router();

authRoutes.post('/signup', AuthController.PostSignup);
authRoutes.post('/login',  AuthController.PostLogin);

module.exports = authRoutes;