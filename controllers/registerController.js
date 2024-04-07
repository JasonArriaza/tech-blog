const { User } = require('../models');

const registerController = {
    registerUser: async (req, res) => {
        try {
            const { username, password } = req.body;

            // Check if username already exists
            const existingUser = await User.findOne({ where: { username } });
            if (existingUser) {
                return res.status(400).json({ message: 'Username already exists' });
            }

            // Create new user
            const newUser = await User.create({ username, password });

            res.status(201).json({ message: 'User registered successfully', user: newUser });
        } catch (error) {
            console.error('Error registering user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

module.exports = registerController;
