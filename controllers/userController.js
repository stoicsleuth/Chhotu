const mongoose = require('mongoose');
const users= mongoose.model('users');
const promisify= require('es6-promisify');



exports.validateRegister = async (req,res,next) =>{
    
    req.checkBody('email','That email is not valid!').isEmail();
    req.sanitizeBody('email').normalizeEmail({
       gmail_remove_subaddress:false
    });
    req.checkBody('password', 'Password can\'t be blank!').notEmpty();
    
    const errors= req.validationErrors();
    if(errors){
        req.flash('error', errors.map(err=>err.msg));
        res.render('login', {title: 'Register/Login', body: req.body, flashes: req.flash()})
        return;
    }
    const doc = await users.findOne({email: req.body.email});
    if(doc){
        
        let errors = [];;
        errors.push("Email ID already registered!");
        req.flash('error', errors);
        res.render('login', {title: 'Register/Login', body: req.body, flashes: req.flash()})
        console.log(req.body.flashes);
        return;
    }
    next();
   
}

exports.register = async(req,res,next) =>{
    console.log('Insinde!')
    const user= new users({email: req.body.email});
    const register= promisify(users.register, users);
    await register(user, req.body.password);
    next();//pass to Auth controller 
};


exports.checkFlash = (req,res,next)=>{
    console.log(req.body.flashes);next();
}
