const { Post } = require('../models');

const dashboardController = {
    getUserPosts: async (req, res) => {
        try {
            const userId = req.session.user.id;
            const userPosts = await Post.findAll({ where: { user_id: userId } });
            res.status(200).json(userPosts);
        } catch (error) {
            console.error('Error getting user posts:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    createPost: async (req, res) => {
        try {
            const { title, content } = req.body;
            const userId = req.session.user.id;

            const newPost = await Post.create({ title, content, user_id: userId });
            res.status(201).json(newPost);
        } catch (error) {
            console.error('Error creating post:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    updatePost: async (req, res) => {
        try {
            const postId = req.params.id;
            const { title, content } = req.body;

            const post = await Post.findByPk(postId);
            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }

            post.title = title;
            post.content = content;
            await post.save();

            res.status(200).json(post);
        } catch (error) {
            console.error('Error updating post:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    deletePost: async (req, res) => {
        try {
            const postId = req.params.id;

            const post = await Post.findByPk(postId);
            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }

            await post.destroy();
            res.status(200).json({ message: 'Post deleted successfully' });
        } catch (error) {
            console.error('Error deleting post:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

module.exports = dashboardController;
