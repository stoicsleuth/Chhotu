//require express and routes as well as mongose
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const router = require('./routes/index');
const path = require('path');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const sessionStore = require('connect-mongo')(session);

//Create the express app
const app = express();

//use Express Validator
app.use(expressValidator());


// view engine setup
app.set('views', path.join(__dirname, 'views')); // this is the folder where we keep our pug files
app.set('view engine', 'pug'); // we use the engine pug, mustache or EJS work great too


// tell Express to serve files from our public folder
app.use(express.static(path.join(__dirname, 'public')));


//initialize Sessions
app.use(session({
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    store: new sessionStore({ mongooseConnection: mongoose.connection })
}));


//Use our flashes
app.use(flash());


//serving favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

// handles JSON bodies
app.use(bodyParser.json());
// handles URL encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));



//Using our routes
app.use('/', router);


//Exporting app.js so that we can start it at start.js
module.exports = app;

