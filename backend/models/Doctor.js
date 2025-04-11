const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Doctor's name
  specialization: { type: String, required: true }, // Specialization (e.g., Veterinary, Surgeon)
  experience: { type: Number, required: true }, // Years of experience
  fees: { type: Number, required: true }, // Consultation fees
  availability: [
    {
      date: { type: Date, required: true }, // Available date
      timeSlots: [{ type: String }], // Available time slots
    },
  ],
});

module.exports = mongoose.model('Doctor', doctorSchema);
