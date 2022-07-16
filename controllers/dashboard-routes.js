const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// GET ALL POSTS OF USERS
router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id,
            },
            attributes: ['id', 'title', 'content', 'created_at'],
            include: [{
                model: Comment,
                attributes: [
                    'id',
                    'comment_content',
                    'user_id',
                    'post_id',
                    'created_at',
                ],
                include: { 
                    model: User,
                    attributes: ['username']
                },
            }]
        })

        const posts = postData.map((postData) => postData.get({ plain: true }));

        res.render('dashboard', {
            posts,
            logged_in: true,
        });
    } catch(err) {
        res.status(500).json(err);
    }
});

// GET POST BY ID (allows user to edit their post)
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: Comment,
                    attributes: [
                        'id',
                        'comment_content',
                        'user_id',
                        'post_id'
                    ],
                    include: {
                        model: User,
                        attributes: ['username']
                    },
                }
            ]
        });

        const posts = postData.get({ plain: true });

        res.render('edit-post', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;