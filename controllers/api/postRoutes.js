const router = require('express').Router();
const { User, Post, Comment} = require('../../models');

// Get Posts

router.get('/', async (req,res) => {

    try{ 
        const postData = await Post.findAll({
            order: ['date'],
            include : [
              {
                model: User
              }, 
              {
                model: Comment
              }],
        });
      res.status(200).json(postData);
    } catch  (err) {
      res.status(404).json(err);
    }

});

// Create Post

router.post('/', async (req, res) => {

  try { 
    const postData = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }

});

// Edit Post

router.put('/:id', async (req, res) => {

  try {
    const postData = await Post.update({
      title: req.body.title,
      content: req.body.content,
    },
      {
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json(postData);
  } catch (err) {
    res.status(404).json(err);
  }

});

// Delete Post

router.delete('/:id', async (req, res) => {

  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!postData) {
      res.status.json({ message: 'No post found with this id!'});
        return;
    }

    res.status(200).json(postData);

  } catch (err) {
    res.status(500).json(err);
  }

});

module.exports = router;