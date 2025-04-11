import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const VetCareDetails = () => {
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('');
  const [vetCareType, setVetCareType] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user')); // Get logged-in user

  const handleBooking = async () => {
    if (!user) {
      alert('Please log in to book a vet care appointment.');
      return;
    }

    if (!petName || !petType || !vetCareType || !date || !time) {
      alert('Please fill in all the fields.');
      return;
    }

    const bookingDetails = {
      petName,
      petType,
      vetCareType,
      date,
      time,
    };

    try {
      const response = await axios.post(`/users/${user._id}/vetcare/book`, bookingDetails);
      setConfirmationMessage(
        `Vet Care appointment booked successfully for ${petName} (${petType}) on ${date} at ${time}.`
      );
      setErrorMessage('');

      // Refresh latest appointment in the navbar
      navigate('/', { state: { refreshLatestAppointment: true } });

      setPetName('');
      setPetType('');
      setVetCareType('');
      setDate('');
      setTime('');
    } catch (error) {
      console.error('Error booking vet care appointment:', error);
      setErrorMessage(
        error.response?.data?.error || 'Failed to book vet care appointment. Please try again.'
      );
    }
  };

  return (
    <div className="container mx-auto py-16 px-4">
      <h2 className="text-4xl font-bold mb-8 text-center text-indigo-600">Vet Care Services</h2>

      {/* Description Section */}
      <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
        <h3 className="text-2xl font-bold mb-4 text-indigo-500">Why Choose Our Vet Care Services?</h3>
        <p className="text-gray-600">
          Our vet care services are designed to provide the best medical attention for your beloved pets. 
          From routine checkups to emergency care, our experienced veterinarians are here to ensure your pet's health and well-being.
        </p>
        <ul className="list-disc list-inside text-gray-600 mt-4">
          <li>Comprehensive health checkups</li>
          <li>Vaccination programs</li>
          <li>Emergency and critical care</li>
          <li>Specialized surgical procedures</li>
          <li>Nutrition and dietary consultations</li>
        </ul>
      </div>

      {/* Booking Form Section */}
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h3 className="text-3xl font-bold mb-6 text-indigo-600 text-center">Book an Appointment</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Pet's Name</label>
            <input
              type="text"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 shadow-sm"
              placeholder="Enter your pet's name"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Pet's Type</label>
            <select
              value={petType}
              onChange={(e) => setPetType(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 shadow-sm"
            >
              <option value="">Select Type</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Bird">Bird</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Vet Care Type</label>
            <select
              value={vetCareType}
              onChange={(e) => setVetCareType(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 shadow-sm"
            >
              <option value="">Select Vet Care Type</option>
              <option value="General Checkup">General Checkup</option>
              <option value="Vaccination">Vaccination</option>
              <option value="Surgery">Surgery</option>
              <option value="Emergency Care">Emergency Care</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Preferred Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Preferred Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 shadow-sm"
            />
          </div>
        </div>
        <button
          onClick={handleBooking}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-lg mt-6 hover:from-indigo-600 hover:to-purple-600 transition duration-300 shadow-lg transform hover:scale-105"
        >
          Book Session
        </button>
        {confirmationMessage && (
          <p className="text-green-500 mt-4 font-semibold text-center">{confirmationMessage}</p>
        )}
        {errorMessage && (
          <p className="text-red-500 mt-4 font-semibold text-center">{errorMessage}</p>
        )}
      </div>
      <iframe 
  width="100%" 
  height="300" 
  src="https://www.youtube.com/embed/64bvqnUWTiY" 
  title="YouTube video player" 
  frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
  allowfullscreen>
</iframe>
    </div>
  );
};

export default VetCareDetails;
