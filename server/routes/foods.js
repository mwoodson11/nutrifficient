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

router.route('/addtolog/:id').post((req, res) => {
  Food.findById(req.params.id)
    .then(food => {
      // console.log(food);
      var date = new Date()
      var month = '' + (date.getMonth() + 1),
      day = '' + date.getDate(),
      year = date.getFullYear();

      if (month.length < 2) 
          month = '0' + month;
      if (day.length < 2) 
          day = '0' + day;
      // var forDate = [year, month, day].join('-');
      
      // food.username = food.username;
      // food.description = food.description;
      // food.fdcId = food.fdcId;
      // food.servings = food.servings;
      // food.date = forDate;
      // food.protein = food.protein;
      // food.carbs = food.carbs;
      // food.fats = food.fats;
      // food.sodium = food.sodium;
      // food.calcium = food.calcium;
      // food.vitaminC = food.vitaminC;
      // food.iron = food.iron;
      food.pantry = false;

      food.save()
        .then(() => res.json('Food added to log!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const fdcId = Number(req.body.fdcId);
  const servings = Number(req.body.servings);
  const date = req.body.date;
  const protein = Math.round(Number(req.body.protein));
  const carbs = Math.round(Number(req.body.carbs));
  const fats = Math.round(Number(req.body.fats));
  const sodium = Math.round(Number(req.body.sodium));
  const calcium = Math.round(Number(req.body.calcium));
  const vitaminC = Math.round(Number(req.body.vitaminC));
  const iron = Math.round(Number(req.body.iron));
  const potassium = Math.round(Number(req.body.potassium));
  const magnesium = Math.round(Number(req.body.magnesium));
  const vitaminA = Math.round(Number(req.body.vitaminA));
  const vitaminE = Math.round(Number(req.body.vitaminE));
  const fiber = Math.round(Number(req.body.fiber));
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
    potassium,
    magnesium,
    vitaminA,
    vitaminE,
    fiber,
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
      food.date = req.body.date;
      food.protein = Number(req.body.protein);
      food.carbs = Number(req.body.carbs);
      food.fats = Number(req.body.fats);
      food.sodium = Number(req.body.sodium);
      food.calcium = Number(req.body.calcium);
      food.vitaminC = Number(req.body.vitaminC);
      food.iron = Number(req.body.iron);
      food.vitaminA = Number(req.body.vitaminA);
      food.vitaminE = Number(req.body.vitaminE);
      food.potassium = Number(req.body.potassium);
      food.magnesium = Number(req.body.magnesium);
      food.fiber = Number(req.body.fiber);
      
      food.pantry = req.body.pantry;

      food.save()
        .then(() => res.json('Food updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/updateServ/:id').post((req, res) => {
  Food.findById(req.params.id)
    .then(food => {
      // console.log(food);
      // food.username = food.username;
      // food.description = food.description;
      // food.fdcId = food.fdcId;
      food.servings = Number(req.body.servings);
      // food.date = food.date;
      // food.protein = food.protein;
      // food.carbs = food.carbs;
      // food.fats = food.fats;
      // food.sodium = food.sodium;
      // food.calcium = food.calcium;
      // food.vitaminC = food.vitaminC;
      // food.iron = food.iron;
      // food.pantry = food.pantry;

      food.save()
        .then(() => res.json('Food updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/deficiency/:username').get((req, res) => {
  // var defReport = {};
  var sendReport = {};
  var dayReport = {};
  dayReport["days"] = [];
  dayReport["protein"] = 0;
  dayReport["carbs"] = 0;
  dayReport["fats"] = 0;
  dayReport["vitaminC"] = 0;
  dayReport["iron"] = 0;
  dayReport["calcium"] = 0;
  dayReport["sodium"] = 0;
  dayReport["vitaminA"] = 0;
  dayReport["vitaminE"] = 0;
  dayReport["potassium"] = 0;
  dayReport["magnesium"] = 0;
  dayReport["fiber"] = 0;
  // console.log(dayReport);
  Food.find({
    'username': req.params.username,
    'pantry': false
  })
    .then(foods => {
      // console.log(foods)
      var dateID = '';
      for (var i = 0, len = foods.length; i < len; i++) {
        dateID = foods[i].date;
        if (!dayReport["days"].includes(dateID)) {
          dayReport["days"].push(dateID);
        }
        dayReport["protein"] += foods[i].protein * foods[i].servings;
        dayReport["carbs"] += foods[i].carbs * foods[i].servings;
        dayReport["fats"] += foods[i].fats * foods[i].servings;
        dayReport["vitaminC"] += foods[i].vitaminC * foods[i].servings;
        dayReport["iron"] += foods[i].iron * foods[i].servings;
        dayReport["calcium"] += foods[i].calcium * foods[i].servings;
        dayReport["sodium"] += foods[i].sodium * foods[i].servings;
        dayReport["vitaminA"] += foods[i].vitaminA * foods[i].servings;
        dayReport["vitaminE"] += foods[i].vitaminE * foods[i].servings;
        dayReport["potassium"] += foods[i].potassium * foods[i].servings;
        dayReport["magnesium"] += foods[i].magnesium * foods[i].servings;
        dayReport["fiber"] += foods[i].fiber * foods[i].servings;
        // console.log(dayReport);
      }

      var days = dayReport["days"].length;

      sendReport["protein"] = dayReport["protein"] / days;
      sendReport["carbs"] = dayReport["carbs"] / days;
      sendReport["fats"] = dayReport["fats"] / days;
      sendReport["vitaminC"] = dayReport["vitaminC"] / days;
      sendReport["iron"] = dayReport["iron"] / days;
      sendReport["calcium"] = dayReport["calcium"] / days;
      sendReport["sodium"] = dayReport["sodium"] / days;
      sendReport["vitaminA"] = dayReport["vitaminA"] / days;
      sendReport["vitaminE"] = dayReport["vitaminE"] / days;
      sendReport["potassium"] = dayReport["potassium"] / days;
      sendReport["magnesium"] = dayReport["magnesium"] / days;
      sendReport["fiber"] = dayReport["fiber"] / days;

      console.log(sendReport);

      // can be used for purposes later to only look at more recent days instead of all days
      //   if(!defReport.hasOwnProperty(dateID)) {
      //     var dayReport = {};
      //     dayReport["protein"] = 0;
      //     dayReport["carbs"] = 0;
      //     dayReport["fats"] = 0;
      //     dayReport["vitaminC"] = 0;
      //     dayReport["iron"] = 0;
      //     dayReport["calcium"] = 0;
      //     dayReport["sodium"] = 0;

      //     defReport[dateID] = dayReport;
      //   }
      //   defReport[dateID]["protein"] += foods[i]["protein"];
      //   defReport[dateID]["carbs"] += foods[i]["carbs"];
      //   defReport[dateID]["fats"] += foods[i]["fats"];
      //   defReport[dateID]["vitaminC"] += foods[i]["vitaminC"];
      //   defReport[dateID]["iron"] += foods[i]["iron"];
      //   defReport[dateID]["calcium"] += foods[i]["calcium"];
      //   defReport[dateID]["sodium"] += foods[i]["sodium"];
      // }

      res.json(sendReport);
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;