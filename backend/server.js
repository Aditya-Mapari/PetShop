const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());

// Allow requests from all origins
app.use(cors());

// Serve static files
app.use('/images', express.static(path.join(__dirname, 'public/images'))); // Serve static images

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/petshop', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the application if the connection fails
  });

// Routes
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes'); // Import productRoutes
const appointmentRoutes = require('./routes/appointmentRoutes'); // Import appointmentRoutes
const doctorRoutes = require('./routes/doctorRoutes'); // Import doctorRoutes
const serviceRoutes = require('./routes/serviceRoutes'); // Import serviceRoutes
const bookingRoutes = require('./routes/bookingRoutes'); // Import bookingRoutes
const doctorAppointmentRoutes = require('./routes/doctorAppointmentRoutes'); // Import doctorAppointmentRoutes

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes); // Register productRoutes
app.use('/api/appointments', appointmentRoutes); // Register appointmentRoutes
app.use('/api/doctors', doctorRoutes); // Register doctorRoutes
app.use('/api/services', serviceRoutes); // Register serviceRoutes
app.use('/api/bookings', bookingRoutes); // Register bookingRoutes
app.use('/api/doctor-appointments', doctorAppointmentRoutes); // Register doctorAppointmentRoutes

app.listen(5000, () => console.log('Server running on port 5000'));
