const express = require('express');
const DoctorsAppointment = require('../models/DoctorsAppointment');
const router = express.Router();

// Create a new doctor's appointment
router.post('/', async (req, res) => {
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

// Fetch all doctor appointments
router.get('/', async (req, res) => {
  try {
    const appointments = await DoctorsAppointment.find();
    console.log('Fetched doctor appointments:', appointments); // Log the fetched appointments
    res.status(200).send(appointments);
  } catch (error) {
    console.error('Error fetching doctor appointments:', error);
    res.status(500).send({ error: 'Failed to fetch doctor appointments' });
  }
});

// Fetch a specific doctor appointment by ID
router.get('/:id', async (req, res) => {
  try {
    const appointment = await DoctorsAppointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).send({ error: 'Doctor appointment not found' });
    }
    res.status(200).send(appointment);
  } catch (error) {
    console.error('Error fetching doctor appointment:', error);
    res.status(500).send({ error: 'Failed to fetch doctor appointment' });
  }
});

// Delete a doctor appointment by ID
router.delete('/:id', async (req, res) => {
  try {
    const result = await DoctorsAppointment.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).send({ error: 'Doctor appointment not found' });
    }
    res.status(200).send({ message: 'Doctor appointment deleted successfully.' });
  } catch (error) {
    console.error('Error deleting doctor appointment:', error);
    res.status(500).send({ error: 'Failed to delete doctor appointment' });
  }
});

module.exports = router;
