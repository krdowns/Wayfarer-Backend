const express = require('express')
const router = express.Router()

const mongoose = require('../models/City')
const City = mongoose.model('City')

router.get('/', (req, res) => {
    City.find({})
        .then(cities => res.json(cities))
})

module.exports = router