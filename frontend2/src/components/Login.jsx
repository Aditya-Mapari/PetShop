import React, { useState } from 'react';
import axios from '../api/axios';

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false); // Toggle between login and registration
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // For registration
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/users/login', { email, password }); // POST request to backend
      localStorage.setItem('user', JSON.stringify(response.data)); // Store user data in localStorage
      alert('Login successful!');
      window.location.href = '/'; // Redirect to homepage
    } catch (err) {
      setError('Invalid email or password'); // Handle invalid credentials
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/users/signup', { name, email, password }); // POST request to backend
      alert('Registration successful! Please log in.');
      setIsRegistering(false); // Switch to login form
    } catch (err) {
      setError('Registration failed. Please try again.'); // Handle registration errors
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-blue-500 to-purple-600 py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Pet Shop Logo */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white">PetShop</h1>
          <div className="flex justify-center mt-2 space-x-4">
            <span className="text-white text-2xl">🐶</span>
            <span className="text-white text-2xl">🐱</span>
            <span className="text-white text-2xl">🐰</span>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white p-8 rounded-lg shadow-xl relative overflow-hidden">
          {/* Decorative Paw Prints */}
          <div className="absolute top-0 left-0 opacity-5">
            <div className="text-6xl">🐾</div>
          </div>
          <div className="absolute bottom-0 right-0 opacity-5">
            <div className="text-6xl">🐾</div>
          </div>

          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            {isRegistering ? 'Create Your Pet Account' : 'Welcome Back Pet Lover!'}
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={isRegistering ? handleRegister : handleLogin}>
            {isRegistering && (
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Your Name</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400">👤</span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>
            )}

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Email Address</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-400">✉️</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="yourname@example.com"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Password</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-400">🔒</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {!isRegistering && (
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                    Forgot your password?
                  </a>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 font-medium"
            >
              {isRegistering ? 'Create Account' : 'Sign In'}
            </button>

            {/* Pet Benefits Section */}
            {!isRegistering && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h3 className="text-sm font-medium text-blue-800">Member Benefits</h3>
                <ul className="mt-2 text-sm text-blue-700 space-y-1">
                  <li className="flex items-center">
                    <span className="mr-2">🦴</span> Exclusive pet product discounts
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">📅</span> Easy vet appointment scheduling
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">🎁</span> Birthday treats for your pets
                  </li>
                </ul>
              </div>
            )}
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {isRegistering ? (
                <>
                  Already have an account?{' '}
                  <button
                    type="button"
                    className="font-medium text-blue-600 hover:text-blue-500"
                    onClick={() => {
                      setIsRegistering(false);
                      setError('');
                    }}
                  >
                    Sign in
                  </button>
                </>
              ) : (
                <>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    className="font-medium text-blue-600 hover:text-blue-500"
                    onClick={() => {
                      setIsRegistering(true);
                      setError('');
                    }}
                  >
                    Register now
                  </button>
                </>
              )}
            </p>
          </div>

          {/* Social Login Options */}
          {!isRegistering && (
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <span className="sr-only">Sign in with Google</span>
                  <span>G</span>
                </button>
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <span className="sr-only">Sign in with Facebook</span>
                  <span>f</span>
                </button>
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <span className="sr-only">Sign in with Apple</span>
                  <span>🍎</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center text-white text-sm">
          <p>© 2025 PetShop. All rights for pet lovers reserved.</p>
          <div className="mt-1">
            <a href="#" className="text-white hover:underline mx-2">Privacy Policy</a> | 
            <a href="#" className="text-white hover:underline mx-2">Terms of Service</a> |
            <a href="#" className="text-white hover:underline mx-2">Help Center</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;