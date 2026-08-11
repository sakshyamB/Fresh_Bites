const express = require('express');
const promoController = require('../controllers/Promocontroller');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/create', authMiddleware, roleMiddleware, promoController.CreatePromo);
router.get('/all', authMiddleware, roleMiddleware, promoController.GetAllPromos);

module.exports = router;
