const db = require('../config/connection');
const { User, Auction, Bid } = require('../models');
const auctiondata = require("./auctionsData");

db.once('open', async () => {

  await Auction.deleteMany();

  const auctionsinsert = await Auction.insertMany(auctiondata);
  console.log('auctions seeded');

  await User.deleteMany();

  const users = [];
  users.push(await User.create(
    {
      firstName: "Vincent",
      lastName: "Momot",
      email: "vincemomot@gmail.com",
      password: "Password1",
      auctions: [auctionsinsert[0]._id, auctionsinsert[2]._id, auctionsinsert[6]._id],
      homeCity: "Atlanta"
    }));
    
    users.push(await User.create(
    {
      firstName: "David",
      lastName: "Dyer",
      email: "davidrossdyer@gmail.com",
      password: "Password2",
      auctions: [auctionsinsert[1]._id, auctionsinsert[3]._id],
      homeCity: "Atlanta"
    }));

    users.push(await User.create(
    {
      firstName: "Julius",
      lastName: "Markauskas",
      email: "juliusmarkauskas@gmail.com",
      password: "12345678",
      auctions: [auctionsinsert[5]._id],
      homeCity: "Atlanta"
    }));

    users.push(await User.create(
    {
      firstName: "Todd",
      lastName: "Trulock",
      email: "toddtrulock@gmail.com",
      password: "Password4",
      auctions: [auctionsinsert[4]._id, auctionsinsert[7]._id],
      homeCity: "Atlanta"
    }));
  
  console.log('users seeded');


  await Auction.findByIdAndUpdate(
    { _id: auctionsinsert[0]._id },
    { latestBidUser: users[0].id },
  );
  await Auction.findByIdAndUpdate(
    { _id: auctionsinsert[1]._id },
    { latestBidUser: users[1].id },
  );
  await Auction.findByIdAndUpdate(
    { _id: auctionsinsert[2]._id },
    { latestBidUser: users[0].id },
  );
  await Auction.findByIdAndUpdate(
    { _id: auctionsinsert[3]._id },
    { latestBidUser: users[1].id },
  );
  await Auction.findByIdAndUpdate(
    { _id: auctionsinsert[4]._id },
    { latestBidUser: users[3].id },
  );
  await Auction.findByIdAndUpdate(
    { _id: auctionsinsert[5]._id },
    { latestBidUser: users[2].id },
  );
  await Auction.findByIdAndUpdate(
    { _id: auctionsinsert[6]._id },
    { latestBidUser: users[0].id },
  );
  await Auction.findByIdAndUpdate(
    { _id: auctionsinsert[7]._id },
    { latestBidUser: users[3].id },
  );

console.log("latestBidUser updated")


  await Bid.deleteMany();

  const bids = await Bid.insertMany([{
    bidAmount: auctionsinsert[0].currentBid,
    bidUser: users[0]._id,
  },
  {
    bidAmount: auctionsinsert[1].currentBid,
    bidUser: users[1]._id,
  },
  {
    bidAmount: auctionsinsert[2].currentBid,
    bidUser: users[0]._id,
  },
  {
    bidAmount: auctionsinsert[3].currentBid,
    bidUser: users[1]._id,
  },
  {
    bidAmount: auctionsinsert[4].currentBid,
    bidUser: users[3]._id,
  },
  {
    bidAmount: auctionsinsert[5].currentBid,
    bidUser: users[2]._id,
  },
  {
    bidAmount: auctionsinsert[6].currentBid,
    bidUser: users[0]._id,
  },
  {
    bidAmount: auctionsinsert[7].currentBid,
    bidUser: users[3]._id,
  },
  ]);

  console.log('bids seeded');

for (let i = 0; i < auctionsinsert.length; i++) {
  await Auction.findByIdAndUpdate(
    { _id: auctionsinsert[i]._id },
    { $addToSet: { bidsHistory: bids[i]._id } },
  );
}
console.log('auction bidsHistory updated')

  process.exit();
});
