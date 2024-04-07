const sessionController = {
    checkSession: (req, res, next) => {
        // Check if user session exists
        if (req.session.user) {
            next();
        } else {
            res.redirect('/login');
        }
    },

    initializeSession: (req, user) => {
        req.session.user = user;
    },

    destroySession: (req) => {
        // Destroy user session
        req.session.destroy();
    }
};

module.exports = sessionController;

