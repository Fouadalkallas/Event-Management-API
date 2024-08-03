const Event = require('../models/Event');
const RSVP = require('../models/RSVP');

exports.createEvent = async (req, res) => {
    const { title, description, category, date, location } = req.body;

    try {
        const event = new Event({ title, description, category, date, location, createdBy: req.user._id });
        await event.save();
        res.status(201).json(event);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateEvent = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const event = await Event.findByIdAndUpdate(id, updates, { new: true });

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.json(event);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteEvent = async (req, res) => {
    const { id } = req.params;

    try {
        const event = await Event.findByIdAndDelete(id);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.json({ message: 'Event deleted' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.rsvpEvent = async (req, res) => {
    const { id } = req.params;

    try {
        const rsvp = new RSVP({ event: id, user: req.user._id, status: req.body.status });
        await rsvp.save();
        res.status(201).json(rsvp);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getEvents = async (req, res) => {
    const { category, date, location } = req.query;

    const filters = {};
    if (category) filters.category = category;
    if (date) filters.date = date;
    if (location) filters.location = location;

    try {
        const events = await Event.find(filters).populate('createdBy', 'name email');
        res.json(events);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
