const db = require('../config/connection');
const { User, Auction } = require('../models');
const auctiondata = require("./auctionsData");

db.once('open', async () => {

  await Auction.deleteMany();

  const auctionsinsert =  await Auction.insertMany(auctiondata);
  console.log('auctions seeded');

  await User.deleteMany();

  await User.create({
    firstName: "Vincent",
    lastName: "Momot",
    email: "vincemomot@gmail.com",
    password: "Password1",
    auctions: [auctionsinsert[0]._id, auctionsinsert[2]._id, auctionsinsert[6]._id],
    homeCity: "Atlanta"
  });

  await User.create({
    firstName: "David",
    lastName: "Dyer",
    email: "davidrossdyer@gmail.com",
    password: "Password2",
    auctions: [auctionsinsert[1]._id, auctionsinsert[3]._id],
    homeCity: "Atlanta"
  });

  await User.create({
    firstName: "Julius",
    lastName: "Markauskas",
    email: "juliusmarkauskas@gmail.com",
    password: "12345678",
    auctions: [auctionsinsert[5]._id],
    homeCity: "Atlanta"
  });

  await User.create({
    firstName: "Todd",
    lastName: "Trulock",
    email: "toddtrulock@gmail.com",
    password: "Password4",
    auctions: [auctionsinsert[4]._id, auctionsinsert[7]._id],
    homeCity: "Atlanta"
  });

  console.log('users seeded');

  process.exit();
});
