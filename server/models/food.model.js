const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const foodSchema = new Schema({
  username: { type: String, required: true },
  description: { type: String, required: true },
  servings: { type: Number, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;