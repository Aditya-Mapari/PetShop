import React, { useEffect, useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from '../api/axios';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [latestAppointment, setLatestAppointment] = useState(null);
  const [latestOrder, setLatestOrder] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user && (location.state?.refreshLatestAppointment || !latestAppointment)) {
      fetchLatestAppointment();
    }
  }, [user, location.state?.refreshLatestAppointment]);

  const fetchLatestAppointment = () => {
    if (user) {
      axios
        .get(`/users/${user._id}/appointments`)
        .then((response) => {
          if (response.data.length > 0) {
            const sortedAppointments = response.data.sort(
              (a, b) => new Date(b.date) - new Date(a.date) || b.time.localeCompare(a.time)
            );
            setLatestAppointment(sortedAppointments[0]);
          } else {
            setLatestAppointment(null);
          }
        })
        .catch((error) => console.error('Error fetching appointments:', error));
    }
  };

  const fetchAppointments = () => {
    if (user) {
      console.log(`Fetching appointments for user: ${user._id}`); // Log the user ID
      axios
        .get(`/users/${user._id}/appointments`) // Fetch all appointments for the user
        .then((response) => {
          console.log('Fetched appointments:', response.data); // Log the fetched appointments
          if (response.data.length > 0) {
            setAppointments(response.data); // Set appointments
          } else {
            console.log('No appointments found for this user.'); // Log if no appointments are found
            setAppointments([]);
          }
        })
        .catch((error) => {
          console.error('Error fetching appointments:', error);
          setAppointments([]); // Ensure the state is reset if an error occurs
        });
    }
  };

  const fetchOrder = () => {
    if (user) {
      console.log(`Fetching orders for user: ${user._id}`); // Log the user ID
      axios
        .get(`/users/${user._id}/orders`) // Fetch all orders for the user
        .then((response) => {
          console.log('Fetched orders:', response.data); // Log the fetched orders
          if (response.data.length > 0) {
            setLatestOrder(response.data[0]); // Set the most recent order
          } else {
            console.log('No orders found for this user.'); // Log if no orders are found
            setLatestOrder(null);
          }
        })
        .catch((error) => {
          console.error('Error fetching orders:', error);
          setLatestOrder(null); // Ensure the state is reset if an error occurs
        });
    }
  };

  useEffect(() => {
    if (user) {
      console.log('User inside useEffect:', user);
      if (!latestAppointment) fetchLatestAppointment(); // Only fetch if not already fetched
      if (!latestOrder) fetchOrder(); // Only fetch if not already fetched
      if (appointments.length === 0) fetchAppointments(); // Only fetch if appointments are empty
    }
  }, [user]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/login';
  };

  const handleLatestAppointmentClick = () => {
    if (latestAppointment) {
      navigate('/latest-appointment', { state: { appointment: latestAppointment } });
    }
  };

  const handleLatestOrderClick = () => {
    if (latestOrder) {
      navigate('/order-history', { state: { order: latestOrder } });
    }
  };

  const handleViewAppointmentsClick = () => {
    navigate('/latest-appointment');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <h1 className="text-3xl font-extrabold tracking-wide">
          <Link to="/" className="hover:text-gray-200 transition duration-300">
            PetShop
          </Link>
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-lg font-medium">
          <li>
            <Link to="/" className="hover:text-gray-200 transition duration-300">Home</Link>
          </li>
          <li>
            <Link to="/cart" className="hover:text-gray-200 transition duration-300 flex items-center">
              <ShoppingCartIcon className="mr-2" /> Cart
            </Link>
          </li>
          <li>
            <Link to="/wishlist" className="hover:text-gray-200 transition duration-300 flex items-center">
              <FavoriteIcon className="mr-2" /> Wishlist
            </Link>
          </li>
          <li>
            <Link to="/appointments" className="hover:text-gray-200 transition duration-300">
              Appointments
            </Link>
          </li>
          {latestOrder && (
            <li>
              <button
                onClick={handleLatestOrderClick}
                className="hover:text-gray-200 transition duration-300"
              >
                Order
              </button>
            </li>
          )}
          <li>
            <button
              onClick={handleViewAppointmentsClick}
              className="hover:text-gray-200 transition duration-300"
            >
              View All Appointments
            </button>
          </li>
          {user ? (
            <>
              <li className="text-gray-200">Hi, <span className="font-semibold">{user.name}</span></li>
              <li>
                <button onClick={handleLogout} className="hover:text-gray-200 transition duration-300">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" className="hover:text-gray-200 transition duration-300 flex items-center">
                <PersonIcon className="mr-2" /> Login
              </Link>
            </li>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white focus:outline-none" onClick={toggleMenu}>
          {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <ul className="md:hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white text-lg font-medium p-4 space-y-4">
          <li>
            <Link to="/" className="block hover:text-gray-200 transition duration-300">Home</Link>
          </li>
          <li>
            <Link to="/cart" className="block hover:text-gray-200 transition duration-300 flex items-center">
              <ShoppingCartIcon className="mr-2" /> Cart
            </Link>
          </li>
          <li>
            <Link to="/wishlist" className="block hover:text-gray-200 transition duration-300 flex items-center">
              <FavoriteIcon className="mr-2" /> Wishlist
            </Link>
          </li>
          <li>
            <Link to="/appointments" className="block hover:text-gray-200 transition duration-300">
              Appointments
            </Link>
          </li>
          {latestOrder && (
            <li>
              <button
                onClick={handleLatestOrderClick}
                className="block hover:text-gray-200 transition duration-300"
              >
                Order
              </button>
            </li>
          )}
          <li>
            <button
              onClick={handleViewAppointmentsClick}
              className="block hover:text-gray-200 transition duration-300"
            >
              View All Appointments
            </button>
          </li>
          {user ? (
            <>
              <li className="text-gray-200">Hi, <span className="font-semibold">{user.name}</span></li>
              <li>
                <button
                  onClick={handleLogout}
                  className="block hover:text-gray-200 transition duration-300"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link
                to="/login"
                className="block hover:text-gray-200 transition duration-300 flex items-center"
              >
                <PersonIcon className="mr-2" /> Login
              </Link>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
