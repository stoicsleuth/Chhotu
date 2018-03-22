const passport= require('passport');
const mongoose= require('mongoose');
const user= mongoose.model('users');
const promisify= require('es6-promisify');


exports.login = passport.authenticate('local', {
    failureRedirect: '/',
    failureFlash: 'Email/password incorrect!',
    successRedirect: '/',
    successFlash: 'Logged in successfully!'
});


exports.logout = (req,res) =>{
    req.logout();
    req.flash('success', 'You\'re now logged out!');
    res.redirect('./');

};