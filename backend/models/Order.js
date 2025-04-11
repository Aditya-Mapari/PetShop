const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Reference to the Product
      quantity: { type: Number, required: true }, // Quantity of the product
    },
  ],
  totalPrice: { type: Number, required: true }, // Total price of the order
  date: { type: Date, default: Date.now }, // Timestamp for when the order was placed
  status: { type: String, default: 'Pending' },
  deliveryAddress:{type:String,default:"Not Provided"},
  paymentMethod:{type:String,default:"COD"}
   // Order status (e.g., Pending, Shipped, Delivered)
});

module.exports = mongoose.model('Order', orderSchema);
