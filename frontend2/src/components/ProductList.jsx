import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

const ProductList = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem('user')); // Get logged-in user

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log(`Fetching products for category: ${category}`); // Log the category
        const response = await axios.get(`/category/${category}`); // Call backend endpoint
        console.log('Fetched products:', response.data); // Log the fetched products
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error.response?.data?.error || 'Failed to fetch products.');
        setProducts([]); // Reset products if an error occurs
      }
    };

    fetchProducts();
  }, [category]);

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

  const addToWishlist = async (productId) => {
    if (!user) {
      alert('Please log in to add items to your wishlist.');
      return;
    }
    try {
      await axios.post(`/users/${user._id}/wishlist`, { productId });
      alert('Product added to wishlist');
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      alert('Failed to add product to wishlist.');
    }
  };

  const placeOrder = async (productId) => {
    if (!user) {
      alert('Please log in to place an order.');
      return;
    }
    try {
      const product = products.find((p) => p._id === productId);
      const order = {
        items: [{ productId, quantity: 1 }],
        totalPrice: product.price,
      };
      await axios.post(`/users/${user._id}/orders`, order);
      alert('Order placed successfully!');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order.');
    }
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (products.length === 0) {
    return <div className="text-gray-500">No products found in this category.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {products.map((product) => (
        <div
          key={product._id}
          className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2"
        >
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-t-lg"
              onError={(e) => (e.target.src = '/default-image.jpg')} // Fallback image
            />
            <div className="absolute top-2 right-2 bg-indigo-500 text-white text-xs px-2 py-1 rounded-full shadow-md">
              New
            </div>
          </div>
          <div className="p-4">
            <h2 className="text-lg font-bold text-gray-800 truncate">{product.name}</h2>
            <p className="text-sm text-gray-600 mt-1 truncate">{product.description}</p>
            <p className="text-xl font-semibold text-green-500 mt-2">₹{product.price}</p>
            <div className="flex justify-between items-center mt-4">
              <button
                className="bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-indigo-600 transition duration-300 shadow-md"
                onClick={() => addToCart(product._id)}
              >
                Add to Cart
              </button>
              <button
                className="bg-amber-400 text-white px-4 py-2 rounded-full hover:bg-amber-500 transition duration-300 shadow-md"
                onClick={() => addToWishlist(product._id)}
              >
                Wishlist
              </button>
            </div>
            <button
              className="w-full bg-teal-500 text-white px-4 py-2 rounded-full mt-4 hover:bg-teal-600 transition duration-300 shadow-md"
              onClick={() => placeOrder(product._id)}
            >
              Order Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
