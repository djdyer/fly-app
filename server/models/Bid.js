const mongoose = require("mongoose");

const { Schema } = mongoose;

const bidSchema = new Schema({
    bidTime: {
        type: Date,
        default: Date.now,
        required: true,
    },
    bidAmount: {
        type: Number,
        required: true,
    },
    bidUser: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Bid = mongoose.model("Bid", bidSchema);

module.exports = Bid;
