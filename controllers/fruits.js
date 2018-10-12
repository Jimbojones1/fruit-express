const express = require('express');
const router  = express.Router();

// Require the models that our controller needs
const Fruits = require('../models/fruits');

// Index route
// Shows all the fruits
router.get('/', (req, res) => {

  Fruits.find({}, (err, allFruits) => {
    if(err){
      console.log(err);
    } else {
      console.log(allFruits)
      // allFruits, is still an array
      res.render('index.ejs', {fruits: allFruits});
    }
  })

});


router.get('/new', (req, res) => {
  res.render('new.ejs');
});


router.post('/', (req, res) => {
  console.log(req.body, ' this is where our info from the fruit form will live');

  if(req.body.readyToEat === 'on'){
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }
  // Rewrite this code to use mongodb
  Fruits.create(req.body, (err, createdFruit) => {
    if(err){
      console.log(err)
    } else {
      console.log(createdFruit);
      res.redirect('/fruits')
    }
  })

});


router.get('/:id/edit', (req, res) => {

  Fruits.findById(req.params.id, (err, foundFruit) => {
      res.render('edit.ejs', {
        fruit: foundFruit,

      });
  });

});



// url params, is extra stuff we can
// put in our url for our server to dynamically
// read



// url params - is a variable that we
// can capture in the url

// Show route
// Shows a single fruit
router.get('/:id', (req, res) => {
  console.log(req.params);
  Fruits.findById(req.params.id, (err, foundFruit) => {
    console.log(foundFruit, ' foundFruit')
      res.render('show.ejs', {
        fruit: foundFruit
      });
  });
});


router.delete('/:id', (req, res) => {
  console.log(req.params.id, ' id in delete route');
  Fruits.findByIdAndRemove(req.params.id, (err, deleteFruit) => {
    res.redirect('/fruits');
  });
});


router.put('/:id', (req, res) => {
  console.log(req.params.id, ' id in the put route');
  console.log(req.body, ' this should be our form data');
  if(req.body.readyToEat === 'on'){
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }
  Fruits[req.params.id] = req.body;

  res.redirect('/fruits')
})

module.exports = router;
