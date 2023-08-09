const router = require('express').Router();
const { User, Post, Comment} = require('../../models');

// Get User
// example 23-ins-auth_review
// example 18-stu_sess
router.get('/', async (req, res) => {
    
    try {
      const userData = await User.findAll({
        attributes: { exclude: ['password']}
      });
      res.status(200).json(userData);
    } catch (err) {
      res.status(404).json(err);  
    };

});

// Get a User

// Create a User

// Login

// Logout

module.exports = router;
