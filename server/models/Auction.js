const mongoose = require("mongoose");

const { Schema } = mongoose;

const auctionSchema = new Schema({
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
  bidsHistory: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Bid'
    }
  ],
  aircraft: {
    type: String,
    required: true,
  },
  image : {
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
  latestBidUser: {
    type: Schema.Types.ObjectId,
    ref: 'User'
}
});

const Auction = mongoose.model("Auction", auctionSchema);

module.exports = Auction;
