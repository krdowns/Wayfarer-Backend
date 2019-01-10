const express = require('express')
const router = express.Router()
const jwt = require('jwt-simple')
const passport = require('../config/passport')
const config = require('../config/config')
const mongoose = require('../models/User')
const User = mongoose.model('User')

router.post('/signup', (req, res) => {
    if (req.body.email && req.body.password) {
      let newUser = {
        email: req.body.email,
        password: req.body.password
      }
      User.findOne({ email: req.body.email })
        .then((user) => {
          if (!user) {
            User.create(newUser)
              .then(user => {
                if (user) {
                  let payload = { id: newUser.id }
                  let token = jwt.encode(payload, config.jwtSecret)
                  res.json({ token })
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
            res.json({ token })
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