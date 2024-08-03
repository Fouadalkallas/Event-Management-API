const User = require('../models/User');
const Event = require('../models/Event');
const RSVP = require('../models/RSVP');

// Get the profile of the current user
exports.getProfile = async (req, res) => {
    try {
        // Fetch user information excluding password
        const user = await User.findById(req.user._id).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update the profile of the current user
exports.updateProfile = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Fetch the current user
        const user = await User.findById(req.user._id);

        // Update user fields if provided
        if (name) user.name = name;
        if (email) user.email = email;
        if (password) user.password = password;

        // Save updated user information
        await user.save();
        res.json({ message: 'Profile updated successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all events created by the current user
exports.getUserEvents = async (req, res) => {
    try {
        // Fetch events created by the user
        const events = await Event.find({ createdBy: req.user._id });
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all events the current user has RSVPed to
exports.getRSVPedEvents = async (req, res) => {
    try {
        // Fetch RSVP entries for the user and populate event details
        const rsvps = await RSVP.find({ user: req.user._id }).populate('event');
        // Extract and return the event details
        res.json(rsvps.map(rsvp => rsvp.event));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
