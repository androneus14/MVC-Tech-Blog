const { Comment, Post } = require('../models');

const commentData = [
    {
        comment_content: 'I like this dummy post!',
        user_id: 1,
        post_id: 1
    },

    {
        comment_content: 'I really like this dummy post!',
        user_id: 2,
        post_id: 2
    },

    {
        comment_content: 'I love this dummy post!',
        user_id: 3,
        post_id: 3
    },

    {
        comment_content: 'I adore this dummy post!',
        user_id: 4,
        post_id: 4
    },

    {
        comment_content: 'This dummy post is fantastic!',
        user_id: 5,
        post_id: 5
    },
];

const seedComments = () => Post.bulkCreate(commentData);

module.exports = seedComments;