const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const passport = require('./config/passport')()

//controllers
const userController = require('./controllers/users.js')

const app = express()

//middleware
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(bodyParser.json())

//routes
app.use('/users', userController)


//server connection
app.listen(3000, () => console.log('Listening on port 3000 :)'))