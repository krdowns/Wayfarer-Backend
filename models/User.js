const mongoose = require('../db/connection')

const UserSchema = new mongoose.Schema({
    email: String,
    name: String,
    password: String,
    joinDate: Date,
    currentCity: String,
})

mongoose.model('User', UserSchema)

module.exports = mongoose