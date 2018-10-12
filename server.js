const express = require('express');
const app     = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
// require our database
require('./db/db');

// Require our controller
const fruitsController = require('./controllers/fruits');



// Setting up middleWare
// Middleware our functions that happen sychronously
// in the request from the client on the server
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));

// Your controllers should always  be last in your
// middleware stack
// /fruits here, sets up every route in the fruitscontroller
// aka the whole router object we exporting to the route /fruits
app.use('/fruits', fruitsController);

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








app.listen(3000, () => {
  console.log('listening on port 3000')
})
