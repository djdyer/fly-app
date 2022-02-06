const mongoose = require('mongoose');

const { Schema } = mongoose;

const flightInfo = new Schema({
  orderDate: {
    type: Date,
    default: Date.now
  },
  details: {
    type: String,
    }
});

const Order = mongoose.model('Flight', flightInfo);

module.exports = Order;
