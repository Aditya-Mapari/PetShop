import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { FaCheckCircle, FaClock, FaTimesCircle, FaMapMarkerAlt, FaRupeeSign, FaBox } from 'react-icons/fa';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem('user')); // Get logged-in user

  useEffect(() => {
    if (user) {
      axios
        .get(`/users/${user._id}/orders`) // Fetch all orders from backend
        .then((response) => setOrders(response.data))
        .catch((error) => console.error('Error fetching orders:', error));
    }
  }, [user]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

  const renderStatusBadge = (status) => {
    const base = "inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold";
    switch (status) {
      case 'Delivered':
        return <span className={`${base} bg-green-100 text-green-600`}><FaCheckCircle /> Delivered</span>;
      case 'Pending':
        return <span className={`${base} bg-yellow-100 text-yellow-600`}><FaClock /> Pending</span>;
      case 'Cancelled':
        return <span className={`${base} bg-red-100 text-red-600`}><FaTimesCircle /> Cancelled</span>;
      default:
        return <span className={base}>{status}</span>;
    }
  };

  if (!user) {
    return <p className="text-center mt-8 text-gray-600 text-lg">Please log in to view your orders.</p>;
  }

  return (
    <div className="container mx-auto py-16 px-4 max-w-5xl">
      <h2 className="text-4xl font-extrabold mb-10 text-center bg-gradient-to-r from-fuchsia-500 to-indigo-600 bg-clip-text text-transparent">
        Your Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">You haven’t placed any orders yet.</p>
      ) : (
        <div className="space-y-10">
          {orders.map((order, index) => (
            <div
              key={order._id}
              className="bg-white/80 backdrop-blur-md border border-gray-200 shadow-2xl rounded-3xl p-6 transition-transform hover:scale-[1.01]"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-indigo-700 flex items-center gap-2">
                    <FaBox className="text-indigo-500" />
                    Order #{index + 1}
                  </h3>
                  <p className="text-gray-600"><strong>ID:</strong> {order._id}</p>
                  <p className="text-gray-600"><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
                  <p className="text-gray-600"><strong>Total:</strong> <FaRupeeSign className="inline" /> {formatPrice(order.totalPrice)}</p>
                  <p className="text-gray-600"><strong>Status:</strong> {renderStatusBadge(order.status)}</p>
                </div>
                <button className="mt-4 md:mt-0 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-5 py-2 rounded-full hover:scale-105 transition-transform shadow-md">
                  Track Order
                </button>
              </div>

              <div className="border-t pt-4 mt-4">
                <h4 className="text-lg font-semibold text-indigo-600 mb-3">🛒 Ordered Items:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center bg-gray-100/80 p-3 rounded-xl gap-4 hover:bg-white transition"
                    >
                      <img
                        src={item.productId.image}
                        alt={item.productId.name}
                        className="w-16 h-16 object-cover rounded-xl border"
                      />
                      <div>
                        <p className="font-semibold text-gray-800">{item.productId.name}</p>
                        <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                        <p className="text-gray-500 text-sm">Price: {formatPrice(item.productId.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4 mt-4">
                <h4 className="text-lg font-semibold text-indigo-600 mb-2">📦 Delivery Details:</h4>
                <p className="text-gray-600"><FaMapMarkerAlt className="inline mr-1" /> {order.deliveryAddress || 'Not provided'}</p>
                <p className="text-gray-600"><strong>Payment:</strong> {order.paymentMethod || 'Not specified'}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
