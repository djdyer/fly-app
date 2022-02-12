const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  flight: 
    {
      type: Schema.Types.ObjectId,
      ref: 'Auction'
    }
  
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
