const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const passport = require('./config/passport')()

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


//controllers
const userController = require('./controllers/users.js')
const postsController = require('./controllers/posts.js')
const citiesController = require('./controllers/cities.js')
const app = express()

//middleware
app.use(cors())
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