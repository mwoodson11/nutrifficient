const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/login/:username/:password').get((req, res) => {
  User.find({
    'username': req.params.username,
    'password': req.params.password
  })
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:username').get((req, res) => {
  User.find({
    'username': req.params.username,
  })
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/deficiency/:username').get((req, res) => {
  User.find({
    'username': req.params.username,
  })
    .then(users => {
      var user = users[0];

      var sendReport = {};
      var fatCal = 0;
      var carbCal = 0;
      var proCal = 0;
      var totCal = 0;

      var PercentCarbs = 0.4;
      var PercentFats = 0.3;
      var PercentPro = 0.3;
      var FatPerGram = 9;
      var CarbProPerGram = 4;

      var RecommendedVitaminC = 90;
      var RecommendedIron = 18;
      var RecommendedCalcium = 1300;
      var RecommendedSodium = 2300;
      // console.log(user);


      if (user.gender == 1) {
        totCal = 66 + (6.23 * user.weight) + (12.7 * user.height) - (6.8 * user.age);
      } else {
        totCal = 655 + (4.35 * user.weight) + (4.7 * user.height) - (4.7 * user.age);
      }
      // console.log(totCal);
      

      totCal *= user.activity;

      fatCal = totCal * PercentFats / FatPerGram;
      proCal = totCal * PercentPro / CarbProPerGram;
      carbCal = totCal * PercentCarbs / CarbProPerGram;

      // console.log("Test 3");

      sendReport["fats"] = fatCal;
      sendReport["protein"] = proCal;
      sendReport["carbs"] = carbCal;
      sendReport["vitaminC"] = RecommendedVitaminC;
      sendReport["iron"] = RecommendedIron;
      sendReport["calcium"] = RecommendedCalcium;
      sendReport["sodium"] = RecommendedSodium;

      // console.log("Test 4");


      res.json(sendReport);
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const height = 0;
  const weight = 0;
  const gender = 0;
  const age = 0;
  const activity = 0;
  

  const newUser = new User({
    username,
    email,
    password,
    height,
    weight,
    gender,
    age,
    activity
  });

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  User.findById(req.params.id)
    .then(user => {
      user.username = req.body.username;
      user.email = req.body.email;
      user.password = req.body.password;
      user.height = Number(req.body.height);
      user.weight = Number(req.body.weight);
      user.gender = Number(req.body.gender);
      user.age = Number(req.body.age);
      user.activity = Number(req.body.activity);

      user.save()
        .then(() => res.json('User updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;