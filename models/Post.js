const mongoose = require('../db/connection')
Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema({
    img : String,
    title: String,
    content: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

mongoose.model('Post', PostSchema)

module.exports = mongoose