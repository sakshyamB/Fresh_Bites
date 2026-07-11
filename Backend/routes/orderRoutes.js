const express = require('express');
const orderController = require('../controllers/Ordercontroller');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const orderRoutes = express.Router();

orderRoutes.get('/allorders', authMiddleware, roleMiddleware, orderController.GetAllOrders);

module.exports = orderRoutes;