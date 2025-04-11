import React, { useState } from 'react';

const DoctorAppointment = ({ onNewAppointment }) => {
  const [petName, setPetName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [reason, setReason] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [appointments, setAppointments] = useState([]); // State to store booked appointments

  const doctors = [
    'Dr. John Doe - Specialist in Dogs',
    'Dr. Jane Smith - Specialist in Cats',
    'Dr. Emily Brown - Exotic Pets Specialist',
  ];

  const handleAppointmentBooking = () => {
    if (!petName || !ownerName || !appointmentDate || !appointmentTime || !reason || !selectedDoctor) {
      alert('Please fill in all the fields.');
      return;
    }

    const newAppointment = {
      petName,
      ownerName,
      appointmentDate,
      appointmentTime,
      reason,
      selectedDoctor,
    };

    setAppointments((prev) => [...prev, newAppointment]); // Add new appointment to the list
    setConfirmationMessage(
      `Appointment booked successfully with ${selectedDoctor} for ${petName} on ${appointmentDate} at ${appointmentTime}.`
    );

    // Pass the latest appointment to the navbar
    if (onNewAppointment) {
      onNewAppointment(newAppointment);
    }

    // Clear form fields
    setPetName('');
    setOwnerName('');
    setAppointmentDate('');
    setAppointmentTime('');
    setReason('');
    setSelectedDoctor('');
  };

  return (
    <div className="container mx-auto py-16 px-4">
      <h2 className="text-4xl font-bold mb-8 text-center text-indigo-600">Book a Doctor Appointment</h2>
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg mx-auto">
        <div className="grid grid-cols-1 gap-6">
          {/* Pet's Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Pet's Name</label>
            <input
              type="text"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              placeholder="Enter your pet's name"
            />
          </div>
          {/* Owner's Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Owner's Name</label>
            <input
              type="text"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              placeholder="Enter your name"
            />
          </div>
          {/* Select Doctor */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Select Doctor</label>
            <select
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
            >
              <option value="">Select a doctor</option>
              {doctors.map((doctor, index) => (
                <option key={index} value={doctor}>
                  {doctor}
                </option>
              ))}
            </select>
          </div>
          {/* Appointment Date */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Appointment Date</label>
            <input
              type="date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
            />
          </div>
          {/* Appointment Time */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Appointment Time</label>
            <input
              type="time"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
            />
          </div>
          {/* Reason for Appointment */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Reason for Appointment</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              placeholder="Enter the reason for the appointment"
              rows="4"
            ></textarea>
          </div>
        </div>
        {/* Confirm Appointment Button */}
        <button
          onClick={handleAppointmentBooking}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-lg mt-6 hover:from-indigo-600 hover:to-purple-600 transition duration-300 shadow-lg"
        >
          Confirm Appointment
        </button>
        {/* Confirmation Message */}
        {confirmationMessage && (
          <p className="text-green-500 mt-4 font-semibold text-center">{confirmationMessage}</p>
        )}
      </div>

      {/* List of Appointments */}
      {appointments.length > 0 && (
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6 text-center text-indigo-600">Your Appointments</h3>
          <div className="space-y-4">
            {appointments.map((appointment, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
              >
                <p><strong>Pet:</strong> {appointment.petName}</p>
                <p><strong>Owner:</strong> {appointment.ownerName}</p>
                <p><strong>Doctor:</strong> {appointment.selectedDoctor}</p>
                <p><strong>Date:</strong> {appointment.appointmentDate}</p>
                <p><strong>Time:</strong> {appointment.appointmentTime}</p>
                <p><strong>Reason:</strong> {appointment.reason}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorAppointment;
