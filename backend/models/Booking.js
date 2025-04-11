const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User
  service: { type: String, required: true }, // Service name (e.g., Grooming)
  date: { type: Date, required: true }, // Booking date
  time: { type: String, required: true }, // Booking time
  additionalNotes: { type: String }, // Optional notes from the user
  status: { type: String, default: 'Pending' }, // Booking status (e.g., Pending, Confirmed, Completed)
});

module.exports = mongoose.model('Booking', bookingSchema);
