const router = require('express').Router();
const { User, Post, Comment} = require('../models');
const withAuth = require('../utils/auth')

router.get('/', withAuth, async (req, res) => {

    try { 
        const postData = await Post.findAll({
            where: { user_id: req.session.user_id,},
            include: [
                {
                    model:User
                }, 
                {
                    model: Comment
                }],
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

router.get('/create', (req, res) => {

    res.render('createpost')

});

router.get('/edit/:id', async (req, res) => {

    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model:User
                }, 
                {
                    model: Comment
                }],
        });

        const userPost = postData.get({ plain: true });

        res.render('editpost', {
            userPost,
            logged_in: req.session.logged_in
        })
    } catch (err) {
        res.status(404).json(err);
    };

});

module.exports = router;