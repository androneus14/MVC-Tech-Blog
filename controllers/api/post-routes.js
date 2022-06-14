const router = require("express").Router();
const { Comment, Post, User } = require("../../models");
const withAuth = require("../../utils/auth");
const { post } = require("./user-routes");

// Get all posts
router.get("/", async (req, res) => {
    try {
        const postData = await Post.findAll({
            attributes: [
                "id",
                "title",
                "content",
                "created_at"
            ],
            order: [
                ["created_at", "DESC"]
            ],
            include: [{
                model: User,
                attributes: ["username"]
            },
            {
                model: Comment,
                attributes: [
                    "id",
                    "comment_content",
                    "post_id",
                    "user_id",
                    "created_at"
                ],
                include: {
                    model: User,
                    attributes: ["username"]
                }
            }]
        });
        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Get single post by ID
router.get("/:id", async (req, res) => {
    try {
        const postData = await Post.findbyPk({
            where: {
                id: req.params.id
            },
            attributes: [
                "id",
                "title",
                "content",
                "created_at"
            ],
            order: [
                ["created_at", "DESC"]
            ],
            include: [
                {
                    model: User,
                    attributes: ["username"]
                },
                {
                    model: Comment,
                    attributes: [
                        "id",
                        "comment_content",
                        "post_id",
                        "user_id",
                        "created_at"
                    ],
                },
            ],
        });
        if (!postData) {
            res.status(404).json({ message: "No posts found with this id" });
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Create a new post. withAuth redirects to login page if user is not logged in.
router.post("/", withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id,
        });
        res.status(200).json({ message: "Here is the new post! "});
    } catch (err) {
        console.log("Failed to create new post", err);
        res.status(500).json(err);
    }
});

// Update user post. withAuth redirects to login page if user is not logged in.
router.put("/:id", withAuth, async (req, res) => {
    try {
        const updatePost = await Post.update(
            {
                title: req.body.title,
                content: req.body.content,
            },
            {
                where: {
                    id: req.params.id
                },
            },
        );
        if (!updatePost) {
            res.status(404).json({ message: "No posts found with this id" })
            return;
        }
        res.status(200).json(updatePost);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Delete user post. withAuth redirects to login page if user is not logged in.
router.delete("/:id", withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id
            },
        });
        if (!postData) {
            res.status(404).json({ message: "No posts found with this id "});
            return;
        }
        res.json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;