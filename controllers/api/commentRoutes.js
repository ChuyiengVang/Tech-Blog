const router = require('express').Router();
const { User, Post, Comment} = require('../../models');

// Get Comments

router.get('/', async (req, res) => {

    try {
        const commentData = await Comment.findAll({
          includes: [
          {
            model: Post
          },
          {
            model: User
          }],
        });
      res.status(200).json(commentData);
    } catch (err) {
        res.status(404).json(err);
    }

});

// Get a comment

router.get('/:id', async (req, res) => {

    try { 
      const commentData = await Comment.findByPk(req.params.id, {
        includes: [
          {
            model: Post
          }, 
          {
            model: User
          }]
      });
      
      res.status(200).json(commentData);
    } catch (err) {
        res.status(404).json(err);
    }
  
  })

// Create Comment

router.post('/', async (req, res) => {

  try {
    const commentData = await Comment.create({
    ...req.body,
    user_id: req.session.user_id,
  });

  res.status(200).json(commentData);
  } catch (err) {
      res.status(404).json(err);
  }
  
});

module.exports = router;