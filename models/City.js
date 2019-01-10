const mongoose = require('../db/connection')

const CitySchema = new mongoose.Schema({
    name: String,
    picture: String,
    posts: String

})

mongoose.model('City', CitySchema)

module.exports = mongoose