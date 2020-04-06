const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const foodSchema = new Schema({
  username: { type: String, required: true },
  description: { type: String, required: true },
  fdcId: { type: Number, required: true },
  servings: { type: Number, required: true },
  protein: { type: Number, required: true },
  carbs: { type: Number, required: true },
  fats: { type: Number, required: true },
  sodium: { type: Number, required: true },
  calcium: { type: Number, required: true },
  vitaminC: { type: Number, required: true },
  iron: { type: Number, required: true },
  vitaminA: { type: Number, required: true },
  vitaminE: { type: Number, required: true },
  magnesium: { type: Number, required: true },
  potassium: { type: Number, required: true },
  fiber: { type: Number, required: true },
  date: { type: String, required: true },
  pantry: { type: Boolean, required: true}
}, {
  timestamps: true,
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;