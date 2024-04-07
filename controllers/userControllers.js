const { User } = require('../models');

const userController = {
    signup: async (req, res) => {
        try {
            const { username, password } = req.body;

            // Check if username already exists
            const existingUser = await User.findOne({ where: { username } });
            if (existingUser) {
                return res.status(400).json({ message: 'Username already exists' });
            }

            // Create new user
            const newUser = await User.create({ username, password });

            // Return success message
            res.status(201).json({ message: 'User created successfully', user: newUser });
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    login: async (req, res) => {
        try {
            const { username, password } = req.body;

            // Find user by username
            const user = await User.findOne({ where: { username } });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Check password
            const isValidPassword = await user.checkPassword(password);
            if (!isValidPassword) {
                return res.status(401).json({ message: 'Invalid password' });
            }

            // Set user session
            req.session.user = user;

            // Return success message
            res.status(200).json({ message: 'Login successful', user });
        } catch (error) {
            console.error('Error logging in:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    logout: (req, res) => {
        try {
            // Destroy user session
            req.session.destroy();

            // Return success message
            res.status(200).json({ message: 'Logout successful' });
        } catch (error) {
            console.error('Error logging out:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

module.exports = userController;
