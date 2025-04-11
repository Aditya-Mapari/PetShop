import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home'; // Import the Home component
import CategorySection from './components/CategorySection';
import CategoryProducts from './components/CategoryProducts'; // Import the CategoryProducts component
import PetCareBlog from './components/PetCareBlog';
import BlogDetails from './components/BlogDetails'; // Import the BlogDetails component
import Footer from './components/Footer'; // Import the Footer component
import Login from './components/Login'; // Import the Login component
import Cart from './components/Cart'; // Import the Cart component
import Wishlist from './components/Wishlist'; // Import the Wishlist component
import OrderHistory from './components/OrderHistory'; // Import the OrderHistory component
import ErrorBoundary from './components/ErrorBoundary'; // Import the ErrorBoundary component
import DoctorAppointment from './components/DoctorAppointment'; // Import the DoctorAppointment component
import GroomingDetails from './components/GroomingDetails'; // Import the GroomingDetails component
import TrainingDetails from './components/TrainingDetails'; // Import the TrainingDetails component
import VetCareDetails from './components/VetCareDetails'; // Import the VetCareDetails component
import LatestAppointmentPage from './components/LatestAppointmentPage'; // Import the LatestAppointmentPage component
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  const [refreshOrders, setRefreshOrders] = useState(false);
  const [latestAppointment, setLatestAppointment] = useState(null);

  const handleOrderPlaced = () => {
    setRefreshOrders((prev) => !prev); // Toggle state to trigger re-fetch
  };

  const handleNewAppointment = (appointment) => {
    setLatestAppointment(appointment); // Update the latest appointment in the navbar
  };

  return (
    <ErrorBoundary>
      <Router>
        <Navbar latestAppointment={latestAppointment} />
        <Routes>
          <Route path="/" element={<Home />} /> {/* Use Home component for the root route */}
          <Route path="/categories" element={<CategorySection />} />
          <Route path="/categories/:category" element={<CategoryProducts />} /> {/* Ensure this route exists */}
          <Route path="/pet-care-blog" element={<PetCareBlog />} />
          <Route path="/pet-care-blog/:id" element={<BlogDetails />} /> {/* Add route */}
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} /> {/* Add route for Wishlist */}
          <Route path="/order-history" element={<OrderHistory refreshOrders={refreshOrders} />} /> {/* Add route */}
          <Route path="/services/grooming" element={<GroomingDetails onOrderPlaced={handleOrderPlaced} />} /> {/* Ensure this route exists */}
          <Route path="/services/training" element={<TrainingDetails />} /> {/* Ensure this route exists */}
          <Route path="/services/vet-care" element={<VetCareDetails />} /> {/* Ensure this route exists */}
          <Route path="/doctor-appointment" element={<DoctorAppointment />} /> {/* New Route */}
          <Route path="/appointments" element={<DoctorAppointment onNewAppointment={handleNewAppointment} />} /> {/* Add this route */}
          <Route path="/latest-appointment" element={<LatestAppointmentPage />} /> {/* Add this route */}
        </Routes>
        <Footer />
      </Router>
    </ErrorBoundary>
  )
}

export default App





