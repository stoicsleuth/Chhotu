

const base58 = require('./../controllers/base58');
// grab the url model
const url = require('./../models/url');
const urlDark = require('./../models/darkurl');
const darkCounter = require('./../models/darkCounter');
//error handlers

const fs = require('fs');


exports.shorten = async (req, res) => {
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
                long_url: longUrl,
                user: req.user
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

};


exports.landing = async (req, res) => {
    // route to serve up the homepage (index.html)
    let urls= [];
    if(req.user)
    {
        const page = req.params.page || 1;
        const limit = 5;
        const skip = (page*limit) - limit;
        

        const urlsPromise= url.find({user: req.user}).sort({'created_at':-1}).skip(skip).limit(limit);

        const urlsCount = url.find({user: req.user}).count();

        const [urls,count] = await Promise.all([urlsPromise,urlsCount]);

        

        urls.forEach(url => {
            url.shortUrl = req.headers.host + '/' + base58.encode(url.id);
            // let timeDiff = Math.abs(url.created_at.getTime());
            // var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
            url.timeDiff = Math.ceil((Date.now()- url.created_at.getTime())/(1000 * 3600 * 24)) + ' days ago';
        });

        const pages = Math.ceil(count/limit);

        

        res.render('index', {urls, count,page,pages,limit});
        return;
        
    }
    res.render('index', {urls});
    
};

exports.darkLanding = async (req, res) => {
    // // route to serve up the homepage (index.html)
    // let urls= [];
    // if(req.user)
    // {
    //     urls=await url.find({user: req.user}).sort();

    //     urls.forEach(url => {
    //         url.shortUrl = req.headers.host + '/' + base58.encode(url.id);
    //         // let timeDiff = Math.abs(url.created_at.getTime());
    //         // var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    //         url.timeDiff = Math.ceil((Date.now()- url.created_at.getTime())/(1000 * 3600 * 24)) + ' days ago';
    //     });
        
    // }
    
    res.render('darkIndex', {title: 'Make Links Suspicious | Chhotu'});
};


exports.shortenDark = async (req, res) => {
    // route to create and return a shortened URL given a long URL
    
    const longUrl = req.body.url;
    
    let shortUrl = '';
    // check if url already exists in database
    const doc = await urlDark.findOne({
        long_url: longUrl
    });
    // if (doc) {
            

    //         // since the document exists, we return it without creating a new entry
    //         res.send({
    //             'shortUrl': req.headers.host + '/' +doc.short_url
    //         });
    //         return;
    //     } else {
            
            // The long URL was not found in the long_url field in our urls
            // collection, so we need to create a new entry:

            //Handling the two files for Dark Phrases
    const darkPhrases = fs.readFileSync("./controllers/darkPhrases.txt").toString('utf-8').split("\n");
    const darkPhrases2 = fs.readFileSync("./controllers/darkPhrases2.txt").toString('utf-8').split("\n");
    const length = Math.floor(Math.random() * ((darkPhrases.length-1) - 0 + 1)) + 0;
    const length2 = Math.floor(Math.random() * ((darkPhrases2.length-1) - 0 + 1)) + 0 ;
    const counter = await darkCounter.findOneAndUpdate({id: 'url_count'}, {$inc: {seq: 1} }, {new: true});
    
    const newUrl = urlDark({
        id: counter.seq,
        long_url: longUrl,
        user: req.user
    });

    await newUrl.save();

    shortUrl = darkPhrases[length] + '-' + darkPhrases2[length2] + '-' + base58.encode(newUrl.id);

    const newUrl2 = await urlDark.findOneAndUpdate({id: counter.seq},{$set:{short_url:shortUrl}},{new:true});
    
    res.send({
        'shortUrl': req.headers.host + '/' + shortUrl
    });


};