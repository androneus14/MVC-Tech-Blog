const { Post } = require('../models');

const postData = [
    {
        title: 'Dummy Post 1',
        content: 'This is a dummy post. This is a dummy post. This is a dummy post. This is a dummy post.',
        user_id: 1
    },

    {
        title: 'Dummy Post 2',
        content: 'This is a dummy post. This is a dummy post. This is a dummy post. This is a dummy post.',
        user_id: 2
    },

    {
        title: 'Dummy Post 3',
        content: 'This is a dummy post. This is a dummy post. This is a dummy post. This is a dummy post.',
        user_id: 3
    },

    {
        title: 'Dummy Post 4',
        content: 'This is a dummy post. This is a dummy post. This is a dummy post. This is a dummy post.',
        user_id: 4
    },

    {
        title: 'Dummy Post 5',
        content: 'This is a dummy post. This is a dummy post. This is a dummy post. This is a dummy post.',
        user_id: 5
    }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;