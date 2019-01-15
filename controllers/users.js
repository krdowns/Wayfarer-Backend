const express = require('express')
const router = express.Router()
const jwt = require('jwt-simple')
const passport = require('../config/passport')
const config = require('../config/config')
const mongoose = require('../models/User')
const User = mongoose.model('User')

router.get('/', (req, res) => {
  User.find({})
      .then(posts => res.json(posts))
})

router.post('/signup', (req, res) => {
    if (req.body.email && req.body.password) {
      let newUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        currentCity: req.body.currentCity
      }
      User.findOne({ email: req.body.email })
        .then((user) => {
          if (!user) {
            User.create(newUser)
              .then(user => {
                if (user) {
                  let payload = { id: newUser.id }
                  let token = jwt.encode(payload, config.jwtSecret)
                  res.json({
                     token,
                     name: user.name,
                     currentCity: user.currentCity,
                     joinDate: user.joinDate
                     })
                } else {
                  res.sendStatus(401)
                }
              })
          } else {
            res.sendStatus(401)
          }
        })
    } else {
      res.sendStatus(401)
    }
  })

  router.post('/login', (req, res) => {
    if (req.body.email && req.body.password) {
      User.findOne({ email: req.body.email }).then(user => {
        if (user) {
          if (user.password === req.body.password) {
            let payload = { id: user.id }
            let token = jwt.encode(payload, config.jwtSecret)
            res.json({
               token,
               name: user.name,
               currentCity: user.currentCity,
               joinDate: user.joinDate
              })
          } else {
            res.sendStatus(401)
          }
        } else {
          res.sendStatus(401)
        }
      })
    } else {
      res.sendStatus(401)
    }
  })

module.exports = router