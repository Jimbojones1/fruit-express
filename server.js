const express = require('express');
const app     = express();

// We our requiring our model
// Our model by convention should Capitalized
const Fruits = require('./models/fruits');

// MVC - Architecture Pattern
// Model View Controller

// Model is a representation of our
// data

// The view - What that data looks like
// In essence its what we are sending
// to the client

// Controller is a way to organize
// modularize our code, the glue
// between the model and the view
// It will look like our routes



app.get('/', (req, res) => {
  res.send('This is fruits app')
});



// Index route
// Shows all the fruits
app.get('/fruits', (req, res) => {
  res.send(Fruits);
});


// url params, is extra stuff we can
// put in our url for our server to dynamically
// read

// url params - is a variable that we
// can capture in the url

// Show route
// Shows a single fruit
app.get('/fruits/:id', (req, res) => {
  console.log(req.params);

  // The property name becomes a variable
  // within the ejs page
  res.render('show.ejs', {
    fruit: Fruits[req.params.id],
    jim: 'jim'
  });
});












app.listen(3000, () => {
  console.log('listening on port 3000')
})
