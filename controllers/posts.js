const express = require('express')
const router = express.Router()

const mongoose = require('../models/Post')
const Post = mongoose.model('Post')
const User = mongoose.model('User')
const jwt = require('jwt-simple')
const config = require('../config/config')

router.get('/', (req, res) => {
    Post.find({})
        .populate('author')
        .then(posts => res.json(posts))
})

//router.get('/:userid', (req, res) => {
router.get('/profile', (req, res) => {
    //console.log('in here',req.params.userid)
    
    // User.findById(req.params.userid, (err, user) => {
    //     console.log('user',user);
    //     if(err){
    //         return console.log(err);
    //     }
    console.log(req.headers)
    if (req.headers.auth!==undefined) {
        let token = req.headers.auth
        
        let decoded = {}
        let decode = jwt.decode(token,config.jwtSecret)
        if (decode.id===undefined) {
            return res.status(500).json({"error": "no id "})
        }
         
        console.log(decode.id)

        Post.find({"author": decode.id})
        .populate({
            path: 'author',
        })
        .then(posts => {
            console.log(posts)
            console.log('in post', posts);
            res.json(posts)
        })
    }
        
    // })
    
})

// router.get('/', (req, res) => {

//     // verify token
//     if (req.header.auth===undefined) {
//       return some error
//     }
  
//     let token = req.header.auth
//     let userid = ''
//     jwt.decode(token,config.usersecret,(err,decoded)=>{
//       if (err) return problem
//       userid = decoded.id
//     })
  
//     User.findById("some user id")
//         .then(users => {
//           if (!users) {
//             return res.status(404).json({error: "no such person"})
//           }
//           Post.find({"author": userid})
//           .then(posts=>{
//             users.posts  = posts
//             return res.json(posts)
//           })
          
      


module.exports = router