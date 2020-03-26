const router = require('express').Router();
let Food = require('../models/food.model');

router.route('/').get((req, res) => {
  Food.find()
    .then(foods => res.json(foods))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:username').get((req, res) => {
  Food.find({
    'username': req.params.username
  })
    .then(foods => res.json(foods))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/log/:username').get((req, res) => {
  Food.find({
    'username': req.params.username,
    'pantry': false
  })
    .then(foods => res.json(foods))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/pantry/:username').get((req, res) => {
  Food.find({
    'username': req.params.username,
    'pantry': true
  })
    .then(foods => res.json(foods))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const fdcId = Number(req.body.fdcId);
  const servings = Number(req.body.servings);
  const date = Date.parse(req.body.date);
  const protein = Number(req.body.protein);
  const carbs = Number(req.body.carbs);
  const fats = Number(req.body.fats);
  const sodium = Number(req.body.sodium);
  const calcium = Number(req.body.calcium);
  const vitaminC = Number(req.body.vitaminC);
  const iron = Number(req.body.iron);
  const pantry = req.body.pantry;

  const newFood = new Food({
    username,
    description,
    fdcId,
    servings,
    date,
    protein,
    carbs,
    fats,
    sodium,
    calcium,
    vitaminC,
    iron,
    pantry
  });

  newFood.save()
  .then(() => res.json('Food added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Food.findById(req.params.id)
    .then(food => res.json(food))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Food.findByIdAndDelete(req.params.id)
    .then(() => res.json('Food deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Food.findById(req.params.id)
    .then(food => {
      food.username = req.body.username;
      food.description = req.body.description;
      food.fdcId = Number(req.body.fdcId);
      food.servings = Number(req.body.servings);
      food.date = Date.parse(req.body.date);
      food.protein = Number(req.body.protein);
      food.carbs = Number(req.body.carbs);
      food.fats = Number(req.body.fats);
      food.sodium = Number(req.body.sodium);
      food.calcium = Number(req.body.calcium);
      food.vitaminC = Number(req.body.vitaminC);
      food.iron = Number(req.body.iron);
      food.pantry = req.body.pantry;

      food.save()
        .then(() => res.json('Food updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;