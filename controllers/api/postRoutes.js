const router = require('express').Router();
const { User, Post, Comment} = require('../../models');

// Get Posts
// Get title, contents, post creator's username, and date created
// example 23-ins-auth_review
router.get('/', async (req,res) => {

    try{ 
        const postData = await Post.findAll({
            include : [{model: User}, {model: Comment}],
    });
    res.status(200).json(postData);
    } catch  (err) {
      res.status(404).json(err);
    }

});

// Get a Post

// Create Post

// Update Post

// Delete Post

module.exports = router;