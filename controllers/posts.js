const express = require('express')
const router = express.Router()

const mongoose = require('../models/Post')
const Post = mongoose.model('Post')

router.get('/', (req, res) => {
    Post.find({})
        .populate('author')
        .then(posts => res.json(posts))
})


module.exports = router