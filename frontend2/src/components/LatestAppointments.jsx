import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

const LatestAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const user = JSON.parse(localStorage.getItem('user')); // Get logged-in user

  useEffect(() => {
    if (user) {
      axios
        .get(`/users/${user._id}/appointments`) // Fetch all appointments for the user
        .then((response) => setAppointments(response.data))
        .catch((error) => console.error('Error fetching appointments:', error));
    }
  }, [user]);

  if (!user) {
    return <p className="text-center mt-8 text-gray-600">Please log in to view your appointments.</p>;
  }

  return (
    <div className="container mx-auto py-16 px-4">
      <h2 className="text-4xl font-bold mb-8 text-center text-indigo-600">Your Appointments</h2>
      {appointments.length === 0 ? (
        <p className="text-center text-gray-600">You have no appointments yet.</p>
      ) : (
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
      )}
    </div>
  );
};

export default LatestAppointments;
