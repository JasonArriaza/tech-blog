const checkAuthentication = (req, res, next) => {
    // Check if user is authenticated
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
};

module.exports = { checkAuthentication };

