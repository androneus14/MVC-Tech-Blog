const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');


// GET ALL POSTS
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_content', 'user_id', 'post_id'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]    
        });
        
        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in,
        });
    } catch(err) {
        res.status(500).json(err);
    }
});

// GET POST BY ID
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_content', 'user_id', 'post_id'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        });

        const posts = postData.get({ plain: true });

        res.render('single-post', {
            posts,
            logged_in: req.session.logged_in,
        });
    } catch(err) {
        res.status(500).json(err);
    }
});

// GET SIGNUP ROUTE
router.get('/signup', (req, res) => {
    res.render('signup');
});

// GET LOGIN PAGE
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
    return;
    }

    res.render('login');
});

module.exports = router;