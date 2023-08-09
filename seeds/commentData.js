const { Comment } = require('../models');

const commentData = [

    {
        user_comment: "Test user comment 1",
        user_id: 1,
        post_id: 1,
    },
    {
        user_comment: "Test user comment 2",
        user_id: 2,
        post_id: 2,
    },
    {
        user_comment: "Test user comment 3",
        user_id: 3,
        post_id: 2,
    },

];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;

