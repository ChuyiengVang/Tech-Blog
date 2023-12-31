const router = require('express').Router();
const { User, Post, Comment} = require('../../models');

// Get Users

router.get('/', async (req, res) => {
    
    try {
      const userData = await User.findAll({
        attributes: { exclude: ['password']},
        includes: [
          {
            model: Post
          }, 
          {
            model: Comment
          }
        ],
      });
      res.status(200).json(userData);
    } catch (err) {
      res.status(404).json(err);  
    };

});

// Get a User

router.get('/:id', async (req, res) =>{

  try {
    const userData = await User.findByPk(req.params.id, {
    attributes: { exclude: ['password']},
    includes: [
      {
        model: Post
      }, 
      {
        model: Comment
      }],
  });
  res.status(200).json(userData);
  } catch (err) {
    res.status(404).json(err);  
  }

});

// Create a User

router.post('/signup', async (req,res) => {

  try { 
    const userData =  await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);

    });
  } catch (err) {
    res.status(500).json(err);
  }

});

// Login

router.post('/login', async (req, res) => {

  try {
    const userData = await User.findOne({ where: {username: req.body.username } });
  
    if (!userData) {
      res.status(500).json({ message: 'Incorrect username, please try again' });
      return;
    }

    const validPassword = userData.checkPassword(req.body.password);
      
    if (!validPassword) {
      console.log(req.body.password)
      console.log(validPassword)
      res.status(500).json({ message: 'Incorrect password, please try again'});
        return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err.message);
  }

});

// Logout

router.post('/logout', (req, res) => {

  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    })
  } else {
    res.status(404).end();
  }

})

module.exports = router;
