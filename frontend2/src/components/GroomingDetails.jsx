import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom'; // Add this import

const GroomingDetails = () => {
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('');
  const [groomingPackage, setGroomingPackage] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Define navigate here

  const user = JSON.parse(localStorage.getItem('user')); // Retrieve the logged-in user

  const handleBooking = async () => {
    if (!user) {
      alert('Please log in to book a grooming session.');
      return;
    }

    if (!petName || !petType || !groomingPackage || !date || !time) {
      alert('Please fill in all the fields.');
      return;
    }

    const bookingDetails = {
      petName,
      petType,
      groomingPackage,
      date,
      time,
    };

    try {
      const response = await axios.post(`/users/${user._id}/grooming/book`, bookingDetails); // Ensure correct API endpoint
      setConfirmationMessage(
        `Grooming session booked successfully for ${petName} (${petType}) on ${date} at ${time}.`
      );
      setErrorMessage('');

      // Update the latest appointment in the navbar
      if (response.data) {
        navigate('/', { state: { refreshLatestAppointment: true } }); // Use navigate here
      }

      setPetName('');
      setPetType('');
      setGroomingPackage('');
      setDate('');
      setTime('');
    } catch (error) {
      console.error('Error booking grooming session:', error);
      setErrorMessage(
        error.response?.data?.error || 'Failed to book grooming session. Please try again.'
      );
    }
  };

  return (
    <div className="container mx-auto py-16 px-4">
      <h2 className="text-4xl font-bold mb-8 text-center text-indigo-600">Grooming Services</h2>

      {/* Introduction Section */}
      <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
        <h3 className="text-2xl font-bold mb-4 text-indigo-500">Introduction</h3>
        <p className="text-gray-600">
          Grooming is essential for your pet's health and happiness. Our professional groomers provide top-notch services to ensure your pet looks and feels their best.
        </p>
      </div>

      {/* Grooming Programs Section */}
      <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
        <h3 className="text-2xl font-bold mb-4 text-indigo-500">Grooming Programs Offered</h3>
        <ul className="list-disc list-inside text-gray-600">
          <li>🐾 <strong>Basic Grooming</strong>: Bathing, brushing, and nail trimming</li>
          <li>✨ <strong>Deluxe Grooming</strong>: Includes basic grooming plus ear cleaning and teeth brushing</li>
          <li>🌟 <strong>Premium Grooming</strong>: All deluxe services plus a haircut and styling</li>
        </ul>
      </div>

      {/* Booking Form Section */}
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h3 className="text-3xl font-bold mb-6 text-indigo-600 text-center">Book a Grooming Session</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pet's Name */}
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
          {/* Pet's Type */}
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
          {/* Grooming Package */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Grooming Package</label>
            <select
              value={groomingPackage}
              onChange={(e) => setGroomingPackage(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 shadow-sm"
            >
              <option value="">Select Package</option>
              <option value="Basic Grooming">Basic Grooming</option>
              <option value="Deluxe Grooming">Deluxe Grooming</option>
              <option value="Premium Grooming">Premium Grooming</option>
            </select>
          </div>
          {/* Preferred Date */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Preferred Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 shadow-sm"
            />
          </div>
          {/* Preferred Time */}
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
          Book a Session
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
  height="400" 
  src="https://www.youtube.com/embed/ADmn3Gfum-k" 
  title="YouTube video player" 
  frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
  allowfullscreen>
</iframe>
    </div>
  );
};

export default GroomingDetails;
