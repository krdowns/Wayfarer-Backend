const mongoose = require('../db/connection')

const PostSchema = new mongoose.Schema({
    title: String,
    author: String,
    content: String
})

mongoose.model('Post', PostSchema)

module.exports = mongoose