const mongoose = require('mongoose');

const DoctorsAppointmentSchema = new mongoose.Schema({
  pet: { type: String, required: true },
  owner: { type: String, required: true },
  doctor: { type: String, required: true },
  date: { type: String, required: true }, // Ensure the date is stored as a string
  time: { type: String, required: true }, // Ensure the time is stored as a string
  reason: { type: String, required: true },
}, { timestamps: true }); // Automatically add createdAt and updatedAt fields

module.exports = mongoose.model('DoctorsAppointment', DoctorsAppointmentSchema);
