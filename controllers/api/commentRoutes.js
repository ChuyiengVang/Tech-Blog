const router = require('express').Router();
const { User, Post, Comment} = require('../../models');

// Get Comments

router.get('/', async (req, res) => {

    try {
        const commentData = await Comment.findAll();
      res.status(200).json(commentData);
    } catch (err) {
        res.status(404).json(err);
    }

});

// Create Comment

router.post('/', async (req, res) => {

    try {const commentData = await Comment.create({
        user_comment: req.body.user_comment,
        user_id: req.session.user_id,
    });

    res.status(200).json(commentData);
    } catch (err) {
        res.status(404).json(err);
    }
    
});
module.exports = router;