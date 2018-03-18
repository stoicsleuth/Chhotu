exports.validateRegister = (req,res,next) =>{
    req.sanitizeBody('name');
    req.checkBody('name', 'You must give an username!').notEmpty();
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
    next();
}