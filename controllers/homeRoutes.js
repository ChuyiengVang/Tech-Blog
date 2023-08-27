const router = require('express').Router();
const { User, Post, Comment} = require('../models');
const withAuth = require('../utils/auth')

// Render Post/Comments and Posts/Comments

router.get('/', async (req, res) => {

    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                }
            ],
        });

        const userPosts = postData.map((data) => data.get({ plain: true }));
        
        res.render('homepage', {
            userPosts,
            logged_in: req.session.logged_in,
        })
    } catch (err) {
        res.status(404).json(err);
    }
    
});

router.get('/post/:id', withAuth, async (req, res) => {

    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                }
            ]
        });

        const userPost = postData.get({ plain: true });

        res.render('singlepost', {
        ...userPost,
        logged_in: req.session.logged_in
        })
    } catch (err) {
        req.status(500).json(err);
    }

});

router.get('/login', (req,res) => {

    if (req.session.logged_in) {
        res.redirect('dashboard');
        return;
    }
    res.render('login');

});

router.get('/signup', (req, res) => {

    res.render('signup');

});

module.exports = router;