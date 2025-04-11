const express = require('express');
const Booking = require('../models/Booking');
const router = express.Router();

// Create a new booking
router.post('/', async (req, res) => {
  try {
    const { timeSlot, ...otherData } = req.body;

    if (!timeSlot) {
      return res.status(400).send({ error: 'Time slot is required' });
    }

    const booking = new Booking({ timeSlot, ...otherData });
    await booking.save();
    res.status(201).send(booking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).send({ error: 'Failed to create booking' });
  }
});

// Fetch available time slots
router.get('/available-time-slots', async (req, res) => {
  try {
    // Example: Replace this with actual logic to fetch available time slots
    const availableTimeSlots = [
      '09:00 AM - 10:00 AM',
      '10:00 AM - 11:00 AM',
      '11:00 AM - 12:00 PM',
      '01:00 PM - 02:00 PM',
      '02:00 PM - 03:00 PM',
    ];
    res.send(availableTimeSlots);
  } catch (error) {
    console.error('Error fetching time slots:', error);
    res.status(500).send({ error: 'Failed to fetch time slots' });
  }
});

// Fetch all bookings for a user
router.get('/:userId', async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.userId });
    res.send(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).send({ error: 'Failed to fetch bookings' });
  }
});

module.exports = router;
