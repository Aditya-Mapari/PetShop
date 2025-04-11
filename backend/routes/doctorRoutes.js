const express = require('express');
const Doctor = require('../models/Doctor');
const router = express.Router();

// Fetch all doctors
router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find(); // Fetch all doctors
    res.send(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).send({ error: 'Failed to fetch doctors' });
  }
});

// Add a new doctor
router.post('/', async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).send(doctor);
  } catch (error) {
    console.error('Error adding doctor:', error);
    res.status(500).send({ error: 'Failed to add doctor' });
  }
});

// Seed doctors
router.post('/seed', async (req, res) => {
  try {
    const doctors = [
      {
        name: 'Dr. John Doe',
        specialization: 'Veterinary',
        experience: 10,
        fees: 500,
        availability: [
          { date: new Date(), timeSlots: ['10:00 AM', '11:00 AM', '2:00 PM'] },
        ],
      },
      {
        name: 'Dr. Jane Smith',
        specialization: 'Surgeon',
        experience: 8,
        fees: 700,
        availability: [
          { date: new Date(), timeSlots: ['9:00 AM', '1:00 PM', '3:00 PM'] },
        ],
      },
    ];
    await Doctor.insertMany(doctors);
    res.status(201).send({ message: 'Doctors seeded successfully!' });
  } catch (error) {
    console.error('Error seeding doctors:', error);
    res.status(500).send({ error: 'Failed to seed doctors' });
  }
});

module.exports = router;
