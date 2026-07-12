const express = require('express');
const orderController = require('../controllers/Ordercontroller');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const orderRoutes = express.Router();

orderRoutes.get('/all', authMiddleware, roleMiddleware, orderController.GetAllOrders);
orderRoutes.get('/my', authMiddleware, orderController.GetMyOrders);
orderRoutes.post('/create', authMiddleware, orderController.CreateOrder);
orderRoutes.get('/:id', authMiddleware, orderController.GetOrderById);
orderRoutes.put('/:id/status', authMiddleware, roleMiddleware, orderController.UpdateOrderStatus);

module.exports = orderRoutes;