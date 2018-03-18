const express = require('express');
const router = express.Router();
const path = require('path');
const base58 = require('./../controllers/base58');
const userController = require ('../controllers/userController');
const AuthController = require ('../controllers/AuthController');
const urlController = require ('../controllers/urlCOntroller');
// grab the url model
const url = require('./../models/url');
//error handlers
const {catchErrors} = require('../handlers/errorHandlers');



//Declaring our routes

router.get('/', catchErrors(async (req, res) => {
    // route to serve up the homepage (index.html)
    let urls= [];
    if(req.user)
    {
        urls=await url.find({user: req.user}).sort();

        urls.forEach(url => {
            url.shortUrl = req.headers.host + '/' + base58.encode(url.id);
            // let timeDiff = Math.abs(url.created_at.getTime());
            // var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
            url.timeDiff = Math.ceil((Date.now()- url.created_at.getTime())/(1000 * 3600 * 24)) + ' days ago';
        });
        
    }
    
    res.render('index', {urls});
}));

router.post('/api/shorten', urlController.shorten);
//login page
router.get('/login', (req,res)=>{
    res.render('login');
})
router.get('/logout', AuthController.logout);
//Post of register & Login

router.post('/register', catchErrors(userController.validateRegister), catchErrors(userController.register), AuthController.login);

router.post('/login', userController.checkFlash, AuthController.login);


router.get('/:encoded_id', function(req, res) {
    
    // route to redirect the visitor to their original URL given the short URL
    var base58Id = req.params.encoded_id;
    
    var id = base58.decode(base58Id);
    
    // check if url already exists in database
    url.findOneAndUpdate(
        {id: id},
        {$inc : {click : 1}}, function(err, doc) {
        if (doc) {
            // found an entry in the DB, redirect the user to their destination
            
            if (!/^(?:f|ht)tps?\:\/\//.test(doc.long_url)) {
                doc.long_url = "http://" + doc.long_url;
            }
            res.redirect(doc.long_url);
            return 0;
        } else {
            // nothing found, take 'em home
            res.redirect('back');
            return 0;
        }
    });
});



module.exports = router;