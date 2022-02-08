const mongoose = require("mongoose");

const { Schema } = mongoose;

const auctionInfo = new Schema({
  auctionEndDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  origin: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  flightDate: {
    required: true,
    type: Date,
  },
  currentBid: {
    type: Number,
    required: true,
  },
  aircraft: {
    type: String,
    required: true,
  },
  flightNum: {
    type: String,
    required: true,
  },
  cabinSize: {
    type: Number,
    required: true,
  },
  operator: {
    type: String,
    required: true,
  },
  termsConfirm: {
    type: Boolean,
    required: true,
  },
});

const Auction = mongoose.model("Auction", auctionInfo);

module.exports = Auction;
