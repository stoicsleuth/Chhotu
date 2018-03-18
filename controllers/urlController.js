const base58 = require('./../controllers/base58');
// grab the url model
const url = require('./../models/url');
//error handlers


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