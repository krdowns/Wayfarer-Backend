const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const passport = require('./config/passport')()

//controllers
const userController = require('./controllers/users.js')
const postsController = require('./controllers/posts.js')
const citiesController = require('./controllers/cities.js')
const app = express()


var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}


//middleware
app.use(cors())
// app.use(allowCrossDomain)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(bodyParser.json())


//routes
app.use('/users', userController)
app.use('/files', express.static(__dirname+'/files'));
app.use('/api/posts', postsController)
app.use('/api/cities', citiesController)



//server connection
app.listen(process.env.PORT || 3001)