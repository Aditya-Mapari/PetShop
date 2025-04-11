const mongoose = require('mongoose');
const Doctor = require('../models/Doctor');

mongoose.connect('mongodb://localhost:27017/petshop')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
  });

const addDoctor = async () => {
  try {
    const doctor = new Doctor({
      name: "Dr. Emily Brown",
      specialization: "Dermatologist",
      experience: 5,
      fees: 600,
      availability: [
        {
          date: new Date("2023-09-15"),
          timeSlots: ["10:00 AM", "12:00 PM", "3:00 PM"]
        }
      ]
    });
    await doctor.save();
    console.log('Doctor added successfully:', doctor);
    mongoose.connection.close();
  } catch (error) {
    console.error('Error adding doctor:', error);
    mongoose.connection.close();
  }
};

addDoctor();
