const express = require('express');
const Appointment = require('../models/Appointment');
const DoctorsAppointment = require("../models/DoctorsAppointment.js")
const router = express.Router();

// Create a new appointment
router.post('/', async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).send(appointment);
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).send({ error: 'Failed to create appointment' });
  }
});

// Fetch all appointments for a user
router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log('Fetching appointments for user:', userId); // Log the user ID
    const appointments = await Appointment.find({ user: userId }); // Fetch appointments for the user
    console.log('Appointments found:', appointments); // Log the fetched appointments
    res.status(200).send(appointments); // Return the appointments (empty array if none found)
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).send({ error: 'Failed to fetch appointments' });
  }
});

// Update appointment status
router.put('/:appointmentId', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.appointmentId,
      { status: req.body.status },
      { new: true }
    );
    res.send(appointment);
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).send({ error: 'Failed to update appointment' });
  }
});

// Doctors Appointment
router.post('/appointments', async (req, res) => {
  try {
    const { pet, owner, doctor, date, time, reason } = req.body;

    // Validate required fields
    if (!pet || !owner || !doctor || !date || !time || !reason) {
      console.error('Validation failed: Missing required fields.');
      return res.status(400).send({ error: 'Missing required fields in the request.' });
    }

    // Log the incoming data
    console.log('Incoming data for doctor appointment:', req.body);

    // Create a new doctor's appointment
    const appointment = new DoctorsAppointment({
      pet,
      owner,
      doctor,
      date,
      time,
      reason,
    });

    await appointment.save();

    console.log('Doctor appointment saved successfully:', appointment); // Log the saved appointment
    res.status(201).send(appointment); // Return the saved appointment
  } catch (error) {
    console.error('Error creating doctor appointment:', error);
    res.status(500).send({ error: 'Failed to create doctor appointment' });
  }
});

module.exports = router;
