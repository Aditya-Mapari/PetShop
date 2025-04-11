const express = require('express');
const User = require('../models/User');
const Wishlist = require('../models/Wishlist'); // Import the Wishlist model
const Cart = require('../models/Cart'); // Import the Cart model
const Order = require('../models/Order'); // Import the Order model
const Appointment = require('../models/Appointment'); // Import the Appointment model
const Product = require('../models/Product'); // Import the Product model

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (user) {
      res.send(user); // Return user data
    } else {
      res.status(401).send({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).send({ error: 'Server error' });
  }
});

// Fetch cart items
router.get('/:userId/cart', async (req, res) => {
  try {
    
    const userId = req.params.userId;
    console.log(`Fetching cart items for user: ${userId}`); // Log the user ID

    const cart = await Cart.findOne({ user: userId }).populate('products.product'); // Populate product details
    if (!cart) {
      console.log(`Cart not found for user: ${userId}`); // Log if no cart is found
      return res.status(200).send([]); // Return an empty array instead of 404
    }

    if (cart.products.length === 0) {
      console.log(`No products found in the cart for user: ${userId}`); // Log if no products are found
      return res.status(200).send([]); // Return an empty array
    }

    console.log(`Cart products for user ${userId}:`, cart.products); // Log the cart products
    res.status(200).send(cart.products); // Send the populated cart products
  } catch (error) {
    console.error('Error fetching cart items:', error); // Log the error
    res.status(500).send({ error: 'Failed to fetch cart items' });
  }
});

// Add product to cart
router.post('/:userId/cart', async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.params.userId });
    if (!cart) {
      cart = new Cart({ user: req.params.userId, products: [] });
    }
    const productIndex = cart.products.findIndex(
      (item) => item.product.toString() === req.body.productId
    );
    if (productIndex !== -1) {
      cart.products[productIndex].quantity += 1; // Increment quantity if product already exists
    } else {
      cart.products.push({ product: req.body.productId, quantity: 1 }); // Add new product to cart
    }
    await cart.save();
    res.send(cart.products);
  } catch (error) {
    console.error('Error adding product to cart:', error);
    res.status(500).send({ error: 'Failed to add product to cart' });
  }
});

// Update product quantity in cart
router.put('/:userId/cart/:productId', async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).send({ error: 'Cart not found' });
    }

    const productIndex = cart.products.findIndex((item) => item.product.toString() === productId);
    if (productIndex !== -1) {
      cart.products[productIndex].quantity = quantity; // Update quantity
    }

    await cart.save();
    const updatedCart = await Cart.findOne({ user: userId }).populate('products.product'); // Populate updated product details
    res.send(updatedCart.products);
  } catch (error) {
    console.error('Error updating cart item:', error);
    res.status(500).send({ error: 'Failed to update cart item' });
  }
});

// Remove product from cart
router.delete('/:userId/cart/:productId', async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).send({ error: 'Cart not found' });
    }

    cart.products = cart.products.filter((item) => item.product.toString() !== productId);
    await cart.save();
    res.send(cart.products);
  } catch (error) {
    console.error('Error removing product from cart:', error);
    res.status(500).send({ error: 'Failed to remove product from cart' });
  }
});

// Add product to wishlist
router.post('/:userId/wishlist', async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.params.userId });
    if (!wishlist) {
      wishlist = new Wishlist({ user: req.params.userId, products: [] });
    }
    if (!wishlist.products.includes(req.body.productId)) {
      wishlist.products.push(req.body.productId); // Add product to wishlist if not already present
    }
    await wishlist.save();

    // Fetch updated wishlist with populated product details
    const updatedWishlist = await Wishlist.findOne({ user: req.params.userId }).populate('products');
    res.send(updatedWishlist.products); // Return updated wishlist
  } catch (error) {
    res.status(400).send({ error: 'Failed to add product to wishlist' });
  }
});

// Fetch wishlist items
router.get('/:userId/wishlist', async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.params.userId }).populate('products'); // Populate product details
    if (!wishlist) {
      return res.status(404).send({ error: 'Wishlist not found' });
    }
    res.send(wishlist.products);
  } catch (error) {
    res.status(400).send({ error: 'Failed to fetch wishlist items' });
  }
});

// Remove product from wishlist
router.delete('/:userId/wishlist/:productId', async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.params.userId });
    if (!wishlist) {
      return res.status(404).send({ error: 'Wishlist not found' });
    }
    wishlist.products = wishlist.products.filter((id) => id.toString() !== req.params.productId);
    await wishlist.save();
    res.send(wishlist.products);
  } catch (error) {
    res.status(400).send({ error: 'Failed to remove product from wishlist' });
  }
});

// Place an order (including grooming sessions)
router.post('/:userId/orders', async (req, res) => {
  try {
    const { items, totalPrice, deliveryAddress, paymentMethod, category, userName, details, date, time } = req.body;

    // Validate required fields
    if (!items || !totalPrice || !deliveryAddress || !paymentMethod || !category || !userName || !details || !date || !time) {
      return res.status(400).send({ error: 'Missing required fields in the request.' });
    }

    const order = new Order({
      user: req.params.userId,
      items,
      totalPrice,
      deliveryAddress,
      paymentMethod,
      category,
      userName,
      details,
      date,
      time,
    });

    await order.save();

    const populatedOrder = await Order.findById(order._id).populate('items.productId');

    res.status(201).send({
      orderId: populatedOrder._id,
      userName: populatedOrder.userName,
      products: populatedOrder.items.map((item) => ({
        name: item.productId?.name || 'Unknown Product',
        quantity: item.quantity,
      })),
      deliveryDays: Math.floor(Math.random() * 3) + 3, // Random delivery days (3-5 days)
    });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(400).send({ error: 'Failed to place order' });
  }
});

// Fetch order history
router.get('/:userId/orders', async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log(`Fetching orders for user: ${userId}`); // Log the user ID
    const orders = await Order.find({ user: userId }).populate('items.productId'); // Fetch orders for the user
    if (!orders || orders.length === 0) {
      console.log(`No orders found for user: ${userId}`); // Log if no orders are found
      return res.status(200).send([]); // Return an empty array instead of 404
    }
    console.log(`Orders found:`, orders); // Log the fetched orders
    res.status(200).send(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).send({ error: 'Failed to fetch orders.' });
  }
});

// Clear order history
router.delete('/:userId/orders', async (req, res) => {
  try {
    const userId = req.params.userId;
    const result = await Order.deleteMany({ user: userId }); // Delete all orders for the user
    if (result.deletedCount > 0) {
      res.status(200).send({ message: 'Order history cleared successfully.' });
    } else {
      res.status(404).send({ error: 'No orders found for this user.' });
    }
  } catch (error) {
    console.error('Error clearing order history:', error);
    res.status(500).send({ error: 'Failed to clear order history.' });
  }
});

// Fetch appointment history
router.get('/:userId/appointments', async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log(`Fetching appointments for user: ${userId}`); // Log the user ID
    const appointments = await Appointment.find({ user: userId }); // Fetch appointments for the user
    if (!appointments || appointments.length === 0) {
      console.log(`No appointments found for user: ${userId}`); // Log if no appointments are found
      return res.status(200).send([]); // Return an empty array instead of 404
    }
    console.log(`Appointments found:`, appointments); // Log the fetched appointments
    res.status(200).send(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).send({ error: 'Failed to fetch appointments.' });
  }
});

// Clear all appointments for a user
router.delete('/:userId/appointments', async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log('Clearing appointments for user:', userId); // Log the user ID
    const result = await Appointment.deleteMany({ user: userId }); // Delete all appointments for the user
    if (result.deletedCount > 0) {
      console.log('Appointments cleared for user:', userId); // Log successful deletion
      res.status(200).send({ message: 'All appointments cleared successfully.' });
    } else {
      console.log('No appointments found for user:', userId); // Log if no appointments were found
      res.status(404).send({ error: 'No appointments found for this user.' });
    }
  } catch (error) {
    console.error('Error clearing appointments:', error);
    res.status(500).send({ error: 'Failed to clear appointments.' });
  }
});

// Book a grooming session
router.post('/:userId/grooming/book', async (req, res) => {
  try {
    const { petName, petType, groomingPackage, date, time } = req.body;

    // Validate required fields
    if (!petName || !petType || !groomingPackage || !date || !time) {
      return res.status(400).send({ error: 'Missing required fields in the request.' });
    }

    // Validate date format
    if (isNaN(Date.parse(date))) {
      return res.status(400).send({ error: 'Invalid date format.' });
    }

    // Validate time format (HH:MM)
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!timeRegex.test(time)) {
      return res.status(400).send({ error: 'Invalid time format.' });
    }

    // Ensure the user exists
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).send({ error: 'User not found.' });
    }

    // Create a new appointment
    const appointment = new Appointment({
      user: req.params.userId,
      type: 'Grooming',
      petName,
      petType,
      details: groomingPackage,
      date,
      time,
    });

    await appointment.save();

    res.status(201).send(appointment); // Return the saved appointment
  } catch (error) {
    console.error('Error booking grooming session:', error);
    res.status(500).send({ error: 'Failed to book grooming session.' });
  }
});

// Book a training session
router.post('/:userId/training/book', async (req, res) => {
  try {
    const { petName, petType, trainingGoal, preferredPackage, date, time } = req.body;

    // Validate required fields
    if (!petName || !petType || !trainingGoal || !preferredPackage || !date || !time) {
      return res.status(400).send({ error: 'Missing required fields in the request.' });
    }

    // Ensure the user exists
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).send({ error: 'User not found.' });
    }

    // Create a new appointment
    const appointment = new Appointment({
      user: req.params.userId,
      type: 'Training',
      petName,
      petType,
      details: `${trainingGoal} - ${preferredPackage}`,
      date,
      time,
    });

    await appointment.save();

    res.status(201).send(appointment); // Return the saved appointment
  } catch (error) {
    console.error('Error booking training session:', error); // Log the error for debugging
    res.status(500).send({ error: 'Failed to book training session.' });
  }
});

// Book a vet care session
router.post('/:userId/vetcare/book', async (req, res) => {
  try {
    const { petName, petType, vetCareType, date, time } = req.body;

     if (!petName || !petType || !vetCareType || !date || !time) {
      return res.status(400).send({ error: 'Missing required fields in the request.' });
    }

    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).send({ error: 'User not found.' });
    }

    const appointment = new Appointment({
      user: req.params.userId,
      type: 'Vet Care',
      petName,
      petType,
      details: vetCareType,
      date,
      time,
    });

    await appointment.save();

    res.status(201).send(appointment); // Return the saved appointment
  } catch (error) {
    console.error('Error booking vet care appointment:', error);
    res.status(500).send({ error: 'Failed to book vet care appointment.' });
  }
});

// Book a pet care session
router.post('/:userId/petcare/book', async (req, res) => {
  try {
    const { petName, petType, petCareType, date, time } = req.body;

    if (!petName || !petType || !petCareType || !date || !time) {
      return res.status(400).send({ error: 'Missing required fields in the request.' });
    }

    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).send({ error: 'User not found.' });
    }

    const appointment = new Appointment({
      user: req.params.userId,
      type: 'Pet Care',
      petName,
      petType,
      details: petCareType,
      date,
      time,
    });

    await appointment.save();

    res.status(201).send(appointment); // Return the saved appointment
  } catch (error) {
    console.error('Error booking pet care session:', error);
    res.status(500).send({ error: 'Failed to book pet care session.' });
  }
});

module.exports = router;
