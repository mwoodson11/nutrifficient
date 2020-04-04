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