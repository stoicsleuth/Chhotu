const passport = require('passport');
const mongoose = require('mongoose');

const user = mongoose.model('users');

passport.use(user.createStrategy());

passport.serializeUser(user.serializeUser());

passport.deserializeUser(user.deserializeUser());
