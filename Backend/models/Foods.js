const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minLength : 3,
    maxLength : 30
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price must be a positive number']
  },
  category: {
    type: String,
    enum: ["Breakfast", "Main", "Soup", "Dessert", "Snacks", "Drinks", "Salads"],
    required: true
  },
  image: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ["veg", "non-veg"],
    required: true
  }
});

module.exports = mongoose.model('Foods', foodSchema);