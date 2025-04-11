const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the User
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }], // Array of Product references
});

module.exports = mongoose.model('Wishlist', wishlistSchema); // Ensure the collection name is 'wishlists'
