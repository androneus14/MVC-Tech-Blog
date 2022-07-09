const router = require('express').Router();
const { User } = require('../../models');

// Get all users
router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            attribute: { exclude: ['password'] },
        });
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Sign up as a new user
router.post('/', async (req, res) => {
    try {
        const userData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;

            res.status(201).json({ message: `Successfully created ${userData.username}` });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// Check username and password to allow login
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: { email: req.body.username },
        });

        if (!userData) {
            res.status(400).json({ message: 'No user account found' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password. Please try again.'});
            return;
        }

        req.session.save(() => {
            req.session.user_id = user.id;
            req.session.username = user.username;
            req.session.loggedIn = true;

            res.json({ user: userData, message: 'Login successful!'});
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// User logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;