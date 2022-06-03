const { User } = require('../models');

const userData = [
    {
        username: 'Andy',
        password: 'password1'
    },

    {
        username: 'Michael',
        password: 'password2'
    },

    {
        username: 'Beth',
        password: 'password3'
    },

    {
        username: 'David',
        password: 'password4'
    },

    {
        username: 'Chris',
        password: 'password5'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;