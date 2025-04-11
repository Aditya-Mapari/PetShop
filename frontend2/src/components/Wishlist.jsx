import React, { useEffect, useState } from 'react';
import axios from "../api/axios";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const user = JSON.parse(localStorage.getItem('user')); // Get logged-in user

  useEffect(() => {
    if (user) {
      axios
        .get(`/users/${user._id}/wishlist`) // Fetch wishlist items from backend
        .then((response) => setWishlistItems(response.data))
        .catch((error) => console.error('Error fetching wishlist items:', error));
    }
  }, [user]);

  const removeFromWishlist = (productId) => {
    axios
      .delete(`/users/${user._id}/wishlist/${productId}`) // Remove item from wishlist
      .then(() => {
        setWishlistItems((prevItems) => prevItems.filter((item) => item._id !== productId));
      })
      .catch((error) => {
        console.error('Error removing item from wishlist:', error);
        alert('Failed to remove item from wishlist.');
      });
  };

  const addToCart = async (productId) => {
    if (!user) {
      alert('Please log in to add items to your cart.');
      return;
    }
    try {
      await axios.post(`/users/${user._id}/cart`, { productId });
      alert('Product added to cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart.');
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

  if (!user) {
    return <p className="text-center mt-8">Please log in to view your wishlist.</p>;
  }

  return (
    <div className="container mx-auto py-16">
      <h2 className="text-3xl font-bold mb-8 text-center">Your Wishlist</h2>
      {wishlistItems.length === 0 ? (
        <p className="text-center">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div key={item._id} className="p-4 border rounded shadow-lg">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-32 object-cover mb-4"
              />
              <h3 className="text-lg font-bold">{item.name}</h3>
              <p className="text-green-500">{formatPrice(item.price)}</p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => removeFromWishlist(item._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Remove
                </button>
                <button
                  onClick={() => addToCart(item._id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
