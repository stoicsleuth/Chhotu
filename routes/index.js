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

router.get('/analysis/:url', catchErrors(urlController.analysis));

router.get('/:encoded_id', async function(req, res) {
    
    // route to redirect the visitor to their original URL given the short URL
    console.log("here");
    if(req.params.encoded_id.indexOf('-')>1){
        console.log("here");
        const url = await Darkurl.findOne({short_url:req.params.encoded_id});
        if(url){
            
            const longUrl = url.long_url;
            if (!/^(f|ht)tps?:\/\//i.test(longUrl)) {
                  longUrl = "https://" + longUrl;
            }
            console.log("there");
            res.redirect(longUrl);
            return;

        }
        else
        {
            req.flash('failure', 'No such url found');
            console.log("nowhere");
            res.redirect('/');
            return;
        }
    }
    const base58Id = req.params.encoded_id;
    
    const id = base58.decode(base58Id);
    console.log(req.headers['user-agent']);

    const userAgent = req.headers['user-agent'];
    let os ='';
    let browser = '';

    //Figure out useragent of client
    if(/mac/i.test(userAgent))
        os = 'mac';
    if(/win/i.test(userAgent))
        os = 'win';
    if(/android/i.test(userAgent))
        os = 'android';
    if(/iphone/i.test(userAgent))
        os = 'iOs';
    // check if url already exists in database
    os = "useragent."+os;
    
    console.log(userAgent);

    //figure out browser
    if(/safari/i.test(userAgent))
        browser = 'safari';
    if(/chrome/i.test(userAgent))
        browser = 'chrome';
    if(/firefox/i.test(userAgent))
        browser = 'firefox';
    if(/msie/i.test(userAgent))
        browser = 'ie';
    // check if url already exists in database
    browser = "browser."+browser;


    url.findOneAndUpdate(
        {id: id},
        {$inc : {
            click : 1,
            [os] : 1,
            [browser] :1,
        }},
        function(err, doc) {
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