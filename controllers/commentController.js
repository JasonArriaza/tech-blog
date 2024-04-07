const { Comment } = require('../models');

const commentController = {
    getAllComments: async (req, res) => {
        try {
            const postId = req.params.postId;
            const comments = await Comment.findAll({ where: { post_id: postId } });
            res.status(200).json(comments);
        } catch (error) {
            console.error('Error getting all comments:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    createComment: async (req, res) => {
        try {
            const { content } = req.body;
            const userId = req.session.user.id;
            const postId = req.params.postId;

            const newComment = await Comment.create({ content, user_id: userId, post_id: postId });
            res.status(201).json(newComment);
        } catch (error) {
            console.error('Error creating comment:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    updateComment: async (req, res) => {
        try {
            const commentId = req.params.id;
            const { content } = req.body;

            const comment = await Comment.findByPk(commentId);
            if (!comment) {
                return res.status(404).json({ message: 'Comment not found' });
            }

            comment.content = content;
            await comment.save();

            res.status(200).json(comment);
        } catch (error) {
            console.error('Error updating comment:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    deleteComment: async (req, res) => {
        try {
            const commentId = req.params.id;

            const comment = await Comment.findByPk(commentId);
            if (!comment) {
                return res.status(404).json({ message: 'Comment not found' });
            }

            await comment.destroy();
            res.status(200).json({ message: 'Comment deleted successfully' });
        } catch (error) {
            console.error('Error deleting comment:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

module.exports = commentController;
