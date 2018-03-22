const express = require('express');
const router = express.Router();
const path = require('path');
const base58 = require('./../controllers/base58');
const userController = require ('../controllers/userController');
const AuthController = require ('../controllers/AuthController');
const urlController = require ('../controllers/urlController');
// grab the url model
const url = require('./../models/url');
const Darkurl = require('./../models/darkurl');
//error handlers
const {catchErrors} = require('../handlers/errorHandlers');



//Declaring our routes

router.get('/', catchErrors(urlController.landing));

router.get('/pages/:page', catchErrors(urlController.landing));

router.get('/dark', catchErrors(urlController.darkLanding));

router.post('/api/shorten', catchErrors(urlController.shorten));

router.post('/api/shortenDark', catchErrors(urlController.shortenDark));
//login page
router.get('/login', (req,res)=>{
    res.render('login');
})
router.get('/logout', AuthController.logout);
//Post of register & Login

router.post('/register', catchErrors(userController.validateRegister), catchErrors(userController.register), AuthController.login);

router.post('/login', AuthController.login);

router.get('/account', userController.editAccount);

router.post('/account', catchErrors(userController.updateAccount));

router.get('/:encoded_id', async function(req, res) {
    
    // route to redirect the visitor to their original URL given the short URL
    if(req.params.encoded_id.indexOf('-')>1){
        console.log('entered');
        const url = await Darkurl.findOne({short_url:req.params.encoded_id});
        console.log(url);
        if(url){
            
            const longUrl = "http://" + url.long_url;
            res.redirect(longUrl);
            return;

        }
        else
        {
            // req.flash('failure', 'No such url found');
            res.redirect('/');
            return;
        }
    }
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