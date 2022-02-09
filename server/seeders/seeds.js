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
    auctions: [auctionsinsert[0], auctionsinsert[2], auctionsinsert[6]]
   
  });

  await User.create({
    firstName: "David",
    lastName: "Dyer",
    email: "davidrossdyer@gmail.com",
    password: "Password2",
    auctions: [auctionsinsert[1], auctionsinsert[3]]
  });

  await User.create({
    firstName: "Julius",
    lastName: "Markauskas",
    email: "juliusmarkauskas@gmail.com",
    password: "Password3",
    auctions: [auctionsinsert[5]]
  });

  await User.create({
    firstName: "Todd",
    lastName: "Trulock",
    email: "toddtrulock@gmail.com",
    password: "Password4",
    auctions: [auctionsinsert[4], auctionsinsert[7]]
  });

  console.log('users seeded');

  process.exit();
});
