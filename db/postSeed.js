const mongoose = require('../models/Post')
const postData = require('./post-data')
const Post = mongoose.model('Post')

Post.remove({})
    // .then(_ => {
    //     Post.findById({author: postData.author})
    // })
    .then(_ => {
        console.log(postData)
        let posts = []
        postData.map(p=>{
            let pp= p
            pp.author= mongoose.Types.ObjectId(p.author)
            console.log(pp)
            posts.push(pp)
        })
        console.log(posts)
        
        Post.collection.insert(posts)
            .then(seededEntries => {
                console.log(seededEntries)
                //process.exit()
            })
    })
    .catch(err => {
        console.log(err)
});