const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to authenticate the user based on JWT token
const auth = async (req, res, next) => {
    // Get the token from the Authorization header
    const token = req.header('Authorization').replace('Bearer ', '');

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Find the user by the id in the token
        const user = await User.findOne({ _id: decoded.id });

        if (!user) {
            throw new Error();
        }

        // Attach the user to the request object
        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Please authenticate' });
    }
};

module.exports = auth;
