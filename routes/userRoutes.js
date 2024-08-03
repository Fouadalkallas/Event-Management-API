const express = require('express');
const {
    getProfile,
    updateProfile,
    getUserEvents,
    getRSVPedEvents
} = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

// Route to get the profile of the current user
router.get('/profile', auth, getProfile);

// Route to update the profile of the current user
router.put('/profile', auth, updateProfile);

// Route to get all events created by the current user
router.get('/events', auth, getUserEvents);

// Route to get all events the current user has RSVPed to
router.get('/rsvps', auth, getRSVPedEvents);

module.exports = router;
