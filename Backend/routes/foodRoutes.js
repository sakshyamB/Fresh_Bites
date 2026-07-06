const express = require('express')
const Foodcontroller = require('../controllers/Foodcontroller');
const authMiddleware = require('../middleware/authmiddleware');
const roleMiddleware = require('../middleware/roleMiddleware')

const foodRoutes = express.Router();

foodRoutes.post('/foods', authMiddleware, roleMiddleware, Foodcontroller.AddFoods);
foodRoutes.get('/foods', Foodcontroller.GetAllFoods);
foodRoutes.get('/foods/:id', Foodcontroller.GetFoodsById);
foodRoutes.put('/foods/:id', authMiddleware, roleMiddleware, Foodcontroller.UpdateFoods);
foodRoutes.delete('/foods/:id', authMiddleware, roleMiddleware, Foodcontroller.DeleteFoods);

module.exports = foodRoutes;