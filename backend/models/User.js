const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  orders: [
    {
      items: [
        { productId: mongoose.Schema.Types.ObjectId, quantity: Number }
      ],
      totalPrice: Number,
      date: Date
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
