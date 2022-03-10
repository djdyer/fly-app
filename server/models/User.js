const mongoose = require("mongoose");

const { Schema } = mongoose;
const bcrypt = require("bcrypt");
// const Auction = require('./Auction');

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must use a valid email address"],
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    homeCity: {
      type: String,
      trim: true,
    },
    winingAuctions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Auction",
      },
    ],
    watchlistAuctions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Auction",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// set up pre-save middleware to create password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.virtual("auctionsCount").get(function () {
  return this.auctions.length;
});

const User = mongoose.model("User", userSchema);

module.exports = User;
