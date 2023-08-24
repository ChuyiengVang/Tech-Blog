const router = require('express').Router();
const { User, Post, Comment} = require('../../models');

router.get('/', async (req, res) => {
    
    try {
      const userData = await User.findAll({
        attributes: { exclude: ['password']},
        includes: [{model: Post}, {model: Comment}],
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
    includes: [{model: Post}, {model: Comment}],
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
      req.session.loggedIn = true;

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
      res
        .status
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status
        .json({ message: 'Incorrect username or password, please try again'});
        return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.loggedIn = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }

});

// Logout

router.post('/logout', (req, res) => {

  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    })
  } else {
    res.status(404).end();
  }

})

module.exports = router;
