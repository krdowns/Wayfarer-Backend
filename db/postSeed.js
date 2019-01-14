const mongoose = require('../models/Post')
const postData = require('./post-data')
const Post = mongoose.model('Post')

Post.remove({})
    .then(_ => {
        Post.collection.insert(postData)
            .then(seededEntries => {
                console.log(seededEntries)
                process.exit()
            })
    })
    .catch(err => {
        console.log(err)
})