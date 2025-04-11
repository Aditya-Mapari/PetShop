import React, { useState } from 'react';
import axios from '../api/axios'; // Import axios

const TrainingDetails = () => {
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('');
  const [trainingGoal, setTrainingGoal] = useState('');
  const [preferredPackage, setPreferredPackage] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const user = JSON.parse(localStorage.getItem('user')); // Get logged-in user

  const handleBooking = async () => {
    if (!user) {
      alert('Please log in to book a training session.');
      return;
    }

    if (!petName || !petType || !trainingGoal || !preferredPackage || !date || !time) {
      alert('Please fill in all the fields.');
      return;
    }

    const bookingDetails = {
      petName,
      petType,
      trainingGoal,
      preferredPackage,
      date,
      time,
    };

    try {
      const response = await axios.post(`/users/${user._id}/training/book`, bookingDetails);
      setConfirmationMessage(
        `Training session booked successfully for ${petName} (${petType}) on ${date} at ${time}.`
      );
      setErrorMessage('');
      setPetName('');
      setPetType('');
      setTrainingGoal('');
      setPreferredPackage('');
      setDate('');
      setTime('');
    } catch (error) {
      console.error('Error booking training session:', error);
      setErrorMessage(
        error.response?.data?.error || 'Failed to book training session. Please try again.'
      );
    }
  };

  return (
    <div className="container mx-auto py-16 px-4">
      <h2 className="text-4xl font-bold mb-8 text-center text-indigo-600">Training Services</h2>

      {/* Introduction Section */}
      <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
        <h3 className="text-2xl font-bold mb-4 text-indigo-500">Introduction</h3>
        <p className="text-gray-600">
          Training builds a strong bond between pets and owners. Our professional trainers make learning fun and effective!
        </p>
      </div>

      {/* Training Programs Section */}
      <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
        <h3 className="text-2xl font-bold mb-4 text-indigo-500">Training Programs Offered</h3>
        <ul className="list-disc list-inside text-gray-600">
          <li>🐶 <strong>Puppy Training</strong>: Basic commands (sit, stay, come)</li>
          <li>🐕 <strong>Obedience Training</strong>: Leash manners, social behavior</li>
          <li>🐾 <strong>Behavioral Training</strong>: Barking, chewing, aggression issues</li>
          <li>🎓 <strong>Advanced Training</strong>: Tricks & agility, off-leash training</li>
        </ul>
      </div>

      {/* Meet Our Trainers Section */}
      <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
        <h3 className="text-2xl font-bold mb-4 text-indigo-500">Meet Our Trainers</h3>
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-bold text-gray-700">John Doe</h4>
            <p className="text-gray-600">Experience: 10+ years</p>
            <p className="text-gray-600">Specialties: Puppy training, obedience training</p>
          </div>
          <div>
            <h4 className="text-lg font-bold text-gray-700">Jane Smith</h4>
            <p className="text-gray-600">Experience: 8+ years</p>
            <p className="text-gray-600">Specialties: Behavioral training, advanced agility</p>
          </div>
        </div>
      </div>

      {/* Booking Form Section */}
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h3 className="text-3xl font-bold mb-6 text-indigo-600 text-center">Schedule & Booking</h3>
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
            <label className="block text-gray-700 font-semibold mb-2">Training Goal</label>
            <select
              value={trainingGoal}
              onChange={(e) => setTrainingGoal(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 shadow-sm"
            >
              <option value="">Select Goal</option>
              <option value="Obedience">Obedience</option>
              <option value="Agility">Agility</option>
              <option value="Behavioral">Behavioral</option>
              <option value="Tricks">Tricks</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Preferred Package</label>
            <select
              value={preferredPackage}
              onChange={(e) => setPreferredPackage(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 shadow-sm"
            >
              <option value="">Select Package</option>
              <option value="Puppy Training">Puppy Training</option>
              <option value="Obedience Training">Obedience Training</option>
              <option value="Advanced Training">Advanced Training</option>
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
  height="315" 
  src="https://www.youtube.com/embed/4oy5EKsFT44" 
  title="YouTube video player" 
  frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
  allowfullscreen>
</iframe>
    </div>
  );
};

export default TrainingDetails;
