const express = require('express');
const { createEvent, updateEvent, deleteEvent, rsvpEvent, getEvents } = require('../controllers/eventController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', auth, createEvent);
router.put('/:id', auth, updateEvent);
router.delete('/:id', auth, deleteEvent);
router.post('/:id/rsvp', auth, rsvpEvent);
router.get('/', getEvents);

module.exports = router;
