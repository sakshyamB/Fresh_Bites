const Promo = require('../models/Promo');

exports.CreatePromo = async (req, res) => {
  try {
    const { code, discountPercentage, minSubtotal } = req.body;

    if (!code || discountPercentage == null || minSubtotal == null) {
      return res.status(400).json({ message: 'code, discountPercentage and minSubtotal are required.' });
    }

    const normalized = String(code).trim().toUpperCase();

    const existing = await Promo.findOne({ code: normalized });
    if (existing) {
      return res.status(400).json({ message: 'Promo code already exists.' });
    }

    const promo = await Promo.create({
      code: normalized,
      discountPercentage: Number(discountPercentage),
      minSubtotal: Number(minSubtotal),
      active: true,
    });

    return res.status(201).json({ message: 'Promo created successfully.', promo });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Could not create promo.', error: error.message });
  }
};

exports.GetAllPromos = async (req, res) => {
  try {
    const promos = await Promo.find().sort({ createdAt: -1 });
    return res.status(200).json({ message: 'Promos fetched successfully.', promos });
  } catch (error) {
    return res.status(500).json({ message: 'Could not fetch promos.', error: error.message });
  }
};
