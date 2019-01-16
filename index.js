const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const passport = require('./config/passport')()


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