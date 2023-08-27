const router = require('express').Router();
const { User, Post, Comment} = require('../models');
const withAuth = require('../utils/auth')

router.get('/', withAuth, async (req, res) => {

    try { 
        const postData = await Post.findAll({
            where: { user_id: req.session.user_id,},
        });

        const userPosts = postData.map((data) => data.get({ plain: true}));
        
        res.render('dashboard', {
            userPosts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(404).json(err);
    };

});

module.exports = router;