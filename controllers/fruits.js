const express = require('express');
const router  = express.Router();

// Require the models that our controller needs
const Fruits = require('../models/fruits');

// Index route
// Shows all the fruits
router.get('/', (req, res) => {
  res.render('index.ejs', {fruits: Fruits});
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

  Fruits.push(req.body);
  res.redirect('/fruits')
});


router.get('/:id/edit', (req, res) => {
  res.render('edit.ejs', {
    fruit: Fruits[req.params.id],
    id: req.params.id
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

  // The property name becomes a variable
  // within the ejs page
  res.render('show.ejs', {
    fruit: Fruits[req.params.id],
    jim: 'jim'
  });
});


router.delete('/:id', (req, res) => {
  console.log(req.params.id, ' id in delete route');
  Fruits.splice(req.params.id, 1);
  res.redirect('/fruits');
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
