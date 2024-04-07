const express = require('express');
const router = express.Router();

const authenticateController = require('../controllers/authenticateController');
const registerController = require('../controllers/registerController');
const dashboardController = require('../controllers/dashboardController');
const blogPostController = require('../controllers/blogPostController');
const commentController = require('../controllers/commentController');

router.post('/login', authenticateController.authenticateUser);

router.post('/register', registerController.registerUser);

router.get('/dashboard', dashboardController.getDashboard);
router.post('/dashboard/posts', dashboardController.createPost);
router.put('/dashboard/posts/:id', dashboardController.updatePost);
router.delete('/dashboard/posts/:id', dashboardController.deletePost);

router.get('/posts', blogPostController.getAllPosts);
router.get('/posts/:id', blogPostController.getPostById);
router.post('/posts/:id/comments', commentController.createComment);

module.exports = router;
