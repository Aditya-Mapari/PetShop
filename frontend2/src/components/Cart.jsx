import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [orderDetails, setOrderDetails] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));
  const [userId,setUserId] =useState("");


  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const user =JSON.parse(localStorage.getItem('user')); 
        setUserId(user._id)
        // Assume user ID is stored in localStorage
        console.log(`Fetching cart items for user: ${user._id}`); // Log the user ID
        const response = await axios.get(`/users/${user._id}/cart`);
        console.log('Fetched cart items:', response.data); // Log the fetched cart items
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error); // Log the error
        setError('Failed to fetch cart items. Please try again later.');
      }
    };

    fetchCartItems();
  }, []);

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2);
  };

  const handlePlaceOrder = () => {
    setIsPlacingOrder(true);
  };

  const confirmOrder = async () => {
    if (!deliveryAddress) {
      alert('Please enter a delivery address.');
      return;
    }
    if (cartItems.length === 0) {
      alert('Your cart is empty. Add items to proceed.');
      return;
    }

    const orderDetails = {
      items: cartItems.map((item) => ({
        productId: item.product._id,
        quantity: item.quantity,
      })),
      totalPrice: parseFloat(calculateTotalPrice()),
      deliveryAddress,
      paymentMethod,
      userName: user.name || 'Guest',
      category: 'Cart Order',
      details: 'Order placed from cart',
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString(),
    };

    try {
      const response = await axios.post(`/users/${user._id}/orders`, orderDetails);
      setOrderDetails({ ...response.data, userName: user.name || 'Guest' });
      setCartItems([]);
      setIsPlacingOrder(false);
    } catch (error) {
      console.error('Error during checkout:', error.response?.data || error.message);
      alert(
        `Failed to process checkout. ${
          error.response?.data?.error || 'Please check your input and try again.'
        }`
      );
    }
  };

  const handleUpdateQuantity = async (productId, quantity) => {
    if (quantity < 1) return; // Prevent quantity from going below 1
    try {
      
      const response = await axios.put(`/users/${userId}/cart/${productId}`, { quantity });
      setCartItems(response.data);
    } catch (error) {
      console.error('Error updating item quantity:', error);
      setError('Failed to update item quantity. Please try again later.');
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      
      await axios.delete(`/users/${userId}/cart/${productId}`);
      setCartItems((prevItems) => prevItems.filter((item) => item.product._id !== productId));
    } catch (error) {
      console.error('Error removing item from cart:', error);
      setError('Failed to remove item. Please try again later.');
    }
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!user) {
    return <p className="text-center mt-8">Please log in to view your cart.</p>;
  }

  if (cartItems.length === 0) {
    return <div className="text-gray-500">Your cart is empty.</div>;
  }

  return (
    <div className="container mx-auto py-16">
      <h2 className="text-3xl font-bold mb-8 text-center">Your Cart</h2>

      {orderDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-3xl shadow-2xl text-center max-w-lg w-full relative">
            <div className="flex justify-center items-center mb-6">
              <div className="bg-green-100 text-green-600 rounded-full p-6 shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="white" />
                  <path
                    d="M9 12l2 2 4-4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <h3 className="text-3xl font-extrabold text-gray-800 mb-4">Order Confirmed!</h3>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Order ID:</span> {orderDetails.orderId}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Name:</span> {orderDetails.userName}
            </p>
            <p className="text-gray-600 mb-4">
              <span className="font-semibold">Delivery in:</span> {orderDetails.deliveryDays} days
            </p>

            <div className="text-left mb-6">
              <h4 className="text-lg font-semibold text-indigo-600 mb-3">Items in your order:</h4>
              <ul className="space-y-2">
                {Array.isArray(orderDetails.products) && orderDetails.products.length > 0 ? (
                  orderDetails.products.map((product, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow-sm"
                    >
                      <span className="text-gray-800 font-medium">{product.name}</span>
                      <span className="text-gray-500">x{product.quantity}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500">No products found in the order.</li>
                )}
              </ul>
            </div>

            <button
              onClick={() => setOrderDetails(null)}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-full hover:from-indigo-600 hover:to-purple-600 transition duration-300 shadow-lg transform hover:scale-105"
            >
              Close
            </button>

            <div className="absolute -top-4 -right-4 bg-indigo-500 w-10 h-10 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 bg-purple-500 w-10 h-10 rounded-full animate-pulse"></div>
          </div>
        </div>
      )}

      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : isPlacingOrder ? (
        <div className="mt-8 p-4 border rounded shadow-lg">
          <h3 className="text-xl font-bold mb-4">Order Confirmation</h3>
          <ul className="mb-4">
            {cartItems.map((item) => (
              <li key={item.product._id} className="flex justify-between mb-2">
                <span>{item.product.name} (x{item.quantity})</span>
                <span>{formatPrice(item.product.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <p className="text-lg font-bold mb-4">Total Price: {formatPrice(calculateTotalPrice())}</p>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Delivery Address</label>
            <textarea
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              placeholder="Enter your delivery address"
              rows="3"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full px-4 py-2 border rounded"
            >
              <option value="COD">Cash on Delivery</option>
              <option value="Online">Online Payment</option>
            </select>
          </div>
          <button
            onClick={confirmOrder}
            className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition duration-300 shadow-md"
          >
            Confirm Order
          </button>
          <button
            onClick={() => setIsPlacingOrder(false)}
            className="bg-gray-500 text-white px-6 py-3 rounded-full ml-4 hover:bg-gray-600 transition duration-300 shadow-md"
          >
            Cancel
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cartItems.map((item) => (
              <div key={item.product._id} className="p-4 border rounded shadow-lg">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-full h-32 object-cover mb-4"
                />
                <h3 className="text-lg font-bold">{item.product.name}</h3>
                <p className="text-green-500">{formatPrice(item.product.price)}</p>
                <div className="flex items-center mt-4">
                  <button
                    onClick={() => handleUpdateQuantity(item.product._id, item.quantity - 1)}
                    className="bg-gray-300 text-black px-2 py-1 rounded hover:bg-gray-400 transition duration-300"
                  >
                    -
                  </button>
                  <span className="mx-4">{item.quantity}</span>
                  <button
                    onClick={() => handleUpdateQuantity(item.product._id, item.quantity + 1)}
                    className="bg-gray-300 text-black px-2 py-1 rounded hover:bg-gray-400 transition duration-300"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.product._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded mt-4 hover:bg-red-600 transition duration-300"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="mt-8 p-4 border rounded shadow-lg">
            <h3 className="text-xl font-bold">Cart Summary</h3>
            <p className="mt-2">Total Items: {cartItems.reduce((total, item) => total + item.quantity, 0)}</p>
            <p className="mt-2">Total Price: {formatPrice(calculateTotalPrice())}</p>
            <button
              onClick={handlePlaceOrder}
              className="bg-blue-500 text-white px-6 py-3 rounded-full mt-4 hover:bg-blue-600 transition duration-300 shadow-md"
            >
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
