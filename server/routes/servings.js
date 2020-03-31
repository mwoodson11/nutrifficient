const router = require('express').Router();
let Serving = require('../models/serving.model');

router.route('/').get((req, res) => {
    Serving.find()
      .then(servings => res.json(servings))
      .catch(err => res.status(400).json('Error: ' + err));
  });


router.route('/nutr/:fdc_id').get((req, res) => {
    Serving.find({
      'fdc_id': String(req.params.fdc_id)
    })
      .then(servings => res.json(servings))
      .catch(err => res.status(400).json('Error: ' + err));
  });


// router.route('/food/:serving_size').get((req, res) => {
//     Serving.find({
//       'serving_size': req.params.serving_size
//     })
//       .then(servings => res.json(servings))
//       .catch(err => res.status(400).json('Error: ' + err));
//   });

router.route('/:id').get((req, res) => {
    Serving.findById(req.params.id)
      .then(food => res.json(food))
      .catch(err => res.status(400).json('Error: ' + err));
  });



  module.exports = router;