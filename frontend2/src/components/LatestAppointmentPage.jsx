import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../api/axios'; // Import axios

const LatestAppointmentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const user = JSON.parse(localStorage.getItem('user')); // Get logged-in user

  useEffect(() => {
    if (location.state?.appointments) {
      setAppointments(location.state.appointments); // Use appointments passed via navigation
    } else if (user) {
      // Fetch appointments if not passed via navigation
      fetchAppointments();
    }
  }, [location.state, user]);

  const fetchAppointments = async () => {
    try {
      console.log(`Fetching appointments for user: ${user._id}`); // Log the user ID
      const response = await axios.get(`/appointments/${user._id}`); // Ensure this matches the backend route
      console.log('Fetched appointments:', response.data); // Log the fetched appointments
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      alert(error.response?.data?.error || 'Failed to fetch appointments. Please try again later.');
    }
  };

  const clearAppointments = async () => {
    if (!user) {
      alert('Please log in to clear appointments.');
      return;
    }
    if (window.confirm('Are you sure you want to clear all appointments?')) {
      try {
        console.log(`Clearing appointments for user: ${user._id}`); // Log the user ID
        const response = await axios.delete(`/users/${user._id}/appointments`); // Ensure this matches the backend route
        console.log('Clear appointments response:', response.data); // Log the response
        alert(response.data.message || 'All appointments cleared successfully.');
        setAppointments([]); // Clear appointments from frontend state
      } catch (error) {
        console.error('Error clearing appointments:', error);
        alert(error.response?.data?.error || 'Failed to clear appointments.');
      }
    }
  };

  if (appointments.length === 0) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <h2 className="text-3xl font-bold text-red-500">No Appointments Found</h2>
        <button
          onClick={() => navigate('/')}
          className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Go Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-16 px-4">
      <h2 className="text-4xl font-bold mb-8 text-center text-indigo-600">Your Appointments</h2>
      <div className="text-center mb-6">
        <button
          onClick={clearAppointments}
          className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition duration-300"
        >
          Clear All Appointments
        </button>
      </div>
      <div className="space-y-6">
        {appointments.map((appointment, index) => (
          <div
            key={appointment._id}
            className="bg-white shadow-lg rounded-lg p-6 border border-gray-200"
          >
            <h3 className="text-lg font-bold text-indigo-700 mb-2">
              Appointment #{index + 1}
            </h3>
            <p className="text-gray-600">
              <span className="font-semibold">Type:</span> {appointment.type}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Pet Name:</span> {appointment.petName}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Pet Type:</span> {appointment.petType}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Details:</span> {appointment.details}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Date:</span> {new Date(appointment.date).toLocaleDateString()}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Time:</span> {appointment.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestAppointmentPage;
