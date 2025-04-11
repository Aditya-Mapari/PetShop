import React from 'react';
import Hero from './Hero';
import CategorySection from './CategorySection';
import PetCareBlog from './PetCareBlog';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Hero />
      <CategorySection />
      {/* Book Doctor Appointment Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Book a Doctor Appointment</h2>
          <p className="text-gray-600 mb-6">
            Schedule a personal appointment with a veterinary doctor for your pet's health and well-being.
          </p>
          <button
            onClick={() => navigate('/appointments')} // Ensure this navigates to the correct route
            className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300"
          >
            Book Now
          </button>
        </div>
      </section>
      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              className="bg-gray-100 shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => navigate('/services/grooming')}
            >
              <h3 className="text-2xl font-bold mb-4">Grooming</h3>
              <p className="text-gray-600">
                Professional grooming services to keep your pet clean, healthy, and looking great.
              </p>
            </div>
            <div
              className="bg-gray-100 shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => navigate('/services/training')}
            >
              <h3 className="text-2xl font-bold mb-4">Training</h3>
              <p className="text-gray-600">
                Expert training programs to teach your pet obedience and new skills.
              </p>
            </div>
            <div
              className="bg-gray-100 shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => navigate('/services/vet-care')} // Ensure this navigates to the correct route
            >
              <h3 className="text-2xl font-bold mb-4">Vet Care</h3>
              <p className="text-gray-600">
                Comprehensive veterinary care to ensure your pet's health and well-being.
              </p>
            </div>
          </div>
        </div>
      </section>
      <PetCareBlog />
    </div>
  );
};

export default Home;
