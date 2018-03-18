const express = require('express');
const router = express.Router();
const path = require('path');
const base58 = require('./../controllers/base58');
const userController = require ('../controllers/userController');
// grab the url model
const url = require('./../models/url');


//Declaring our routes

router.get('/', (req, res) => {
    // route to serve up the homepage (index.html)
    res.render('index');
});

router.post('/api/shorten', async (req, res) => {
    // route to create and return a shortened URL given a long URL
    
    const longUrl = req.body.url;
    
    let shortUrl = '';
    // check if url already exists in database
    const doc = await url.findOne({
        long_url: longUrl
    });
    if (doc) {
            
            // base58 encode the unique _id of that document and construct the short URL
            shortUrl = req.headers.host + '/' + base58.encode(doc.id);

            // since the document exists, we return it without creating a new entry
            res.send({
                'shortUrl': shortUrl
            });
            return;
        } else {
            
            // The long URL was not found in the long_url field in our urls
            // collection, so we need to create a new entry:

            const newUrl = url({
                long_url: longUrl
            });

            // save the new link
            newUrl.save(function(err) {
                if (err) {
                    
                }

                // construct the short URL

                shortUrl = req.headers.host + '/' + base58.encode(newUrl.id);


                res.send({
                    'shortUrl': shortUrl
                });
            });
            return;
        }

    });
//login page
router.get('/login', (req,res)=>{
    res.render('login');
})


//Post of register & Login

router.post('/register', userController.validateRegister);

router.get('/:encoded_id', function(req, res) {
    
    // route to redirect the visitor to their original URL given the short URL
    var base58Id = req.params.encoded_id;
    
    var id = base58.decode(base58Id);
    
    // check if url already exists in database
    url.findOne({
        id: id
    }, function(err, doc) {
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