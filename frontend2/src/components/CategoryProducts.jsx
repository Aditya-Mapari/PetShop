import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';

const CategoryProducts = () => {
  const { category } = useParams(); // Get the category from the URL
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem('user')); // Get logged-in user

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log(`Fetching products for category: ${category}`); // Log the category
        const response = await axios.get(`/products/category/${category}`); // Call backend endpoint
        console.log('Fetched products:', response.data); // Log the fetched products
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching category products:', error);
        setError(error.response?.data?.error || 'Failed to fetch products.');
        setProducts([]); // Reset products if an error occurs
      }
    };

    fetchProducts();
  }, [category]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

  const handleOrderNow = (productId) => {
    alert(`Order placed for product ID: ${productId}`);
    // Add logic to handle the "Order Now" action, such as adding to cart or redirecting to checkout
  };

  const handleAddToCart = (productId) => {
    if (!user) {
      alert('Please log in to add items to your cart.');
      return;
    }
    axios
      .post(`/users/${user._id}/cart`, { productId })
      .then(() => {
        alert('Product added to cart successfully!');
      })
      .catch((error) => {
        console.error('Error adding product to cart:', error);
        alert('Failed to add product to cart.');
      });
  };

  const handleAddToWishlist = (productId) => {
    if (!user) {
      alert('Please log in to add items to your wishlist.');
      return;
    }
    axios
      .post(`/users/${user._id}/wishlist`, { productId })
      .then(() => {
        alert('Product added to wishlist successfully!');
      })
      .catch((error) => {
        console.error('Error adding product to wishlist:', error);
        alert('Failed to add product to wishlist.');
      });
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (products.length === 0) {
    return <div className="text-gray-500">No products found in this category.</div>;
  }

  return (
    <div className="container mx-auto py-16">
      <h2 className="text-4xl font-bold mb-8 text-center capitalize">{category} Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="p-4 border rounded shadow-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-80 object-cover mb-4"
            />
            <h3 className="text-lg font-bold">{product.name}</h3>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-green-500 font-bold">{formatPrice(product.price)}</p>
            <div className="flex flex-col gap-5 mt-6">
              {/* Order Now & Add to Cart */}
              <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                <button
                  onClick={() => handleOrderNow(product._id)}
                  className="flex-1 bg-teal-600 text-white px-5 py-2.5 rounded-md hover:bg-teal-700 transition duration-300 shadow-sm hover:shadow-md text-sm font-medium"
                >
                  Order Now
                </button>
                <button
                  onClick={() => handleAddToCart(product._id)}
                  className="flex-1 bg-teal-600 text-white px-5 py-2.5 rounded-md hover:bg-teal-700 transition duration-300 shadow-sm hover:shadow-md text-sm font-medium"
                >
                  Add to Cart
                </button>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 dark:border-gray-700" />

              {/* Wishlist Button */}
              <div className="flex justify-center">
                <button
                  onClick={() => handleAddToWishlist(product._id)}
                  className="w-full sm:w-2/3 bg-teal-600 text-white px-5 py-2.5 rounded-md hover:bg-teal-700 transition duration-300 shadow-sm hover:shadow-md text-sm font-medium"
                >
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
