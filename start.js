const mongoose = require('mongoose');

//import our environment variables file
require('dotenv').config({path: 'variables.env'});

//Connect to our database and handle errors
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; //Tell mongoose to utilize global promise
mongoose.connection.on('error', (err)=>{
    console.log(`Error in Database!! ${err.message}`);
})


//Adding the models
require('./models/users');


//Starting the app
const app = require('./app');
app.set('port', process.env.PORT || 8080 );
const server = app.listen(app.get('port'),()=>{
    console.log(`Server is running on ${server.address().port}`);
})



