const express = require('express');
const app     = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
// We our requiring our model
// Our model by convention should Capitalized
const Fruits = require('./models/fruits');

// Setting up middleWare
// Middleware our functions that happen sychronously
// in the request from the client on the server
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));

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
  res.render('index.ejs', {fruits: Fruits});
});


app.get('/fruits/new', (req, res) => {
  res.render('new.ejs');
});


app.post('/fruits', (req, res) => {
  console.log(req.body, ' this is where our info from the fruit form will live');

  if(req.body.readyToEat === 'on'){
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }

  Fruits.push(req.body);
  res.redirect('/fruits')
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


app.delete('/fruits/:id', (req, res) => {
  console.log(req.params.id, ' id in delete route');
  Fruits.splice(req.params.id, 1);
  res.redirect('/fruits');
});









app.listen(3000, () => {
  console.log('listening on port 3000')
})
