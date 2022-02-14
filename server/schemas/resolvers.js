const { AuthenticationError } = require('apollo-server-express');
const { User, Auction, Order, Bid } = require('../models');

const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate("auctions");

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
    users: async () => {
      return await User.find({}).populate('auctions').populate({
        path: 'auctions', populate: 'bidsHistory'}).populate({
          path: 'auctions.bidsHistory', populate: 'bidUser'});
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id }).populate("auctions");
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    auctions: async () => {
      return await Auction.find({}).populate("bidsHistory").populate({
        path: 'bidsHistory',
        populate: 'bidUser'
      });
    },
    auction: async (parent, args) => {
        return await Auction.findOne({ _id: args._id }).populate("bidsHistory").populate({
          path: 'bidsHistory',
          populate: 'bidUser'
        });
    },

    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate("auctions");

        return user.orders.id(_id);
      }

      throw new AuthenticationError('Not logged in');
    },

    checkout: async (parent, args, context) => {
      const order = new Order({ flight: args.flight });
      console.log("1",order)
      const { flight } = await order.populate('flight').execPopulate();
      console.log("1",order)
      const url = new URL(context.headers.referer).origin;
      const line_items = [];



        const newFlight = await stripe.flight.create({
          aircraft: flight.aircraft,
          origin: flight.origin,
          destination: flight.destination
        });

        const price = await stripe.prices.create({
          flight: flight.id,
          unit_amount: 12345,
          //flight.currentBid * 100,
          currency: 'usd',
        });

        // line_items.push({
        //   price: price.id,
        //   quantity: 1
        // });
      

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
      });

      return { session: session.id };
    }
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    updateBid: async (parent, args) => {
        const updatedBidSum =  await Auction.findByIdAndUpdate(
          { _id: args._id },
          {  currentBid: args.currentBid },
          { new: true }
        );
      return updatedBidSum;    
      
    },
    saveflight: async (parent, {auctions}, context) => {
      if (context.user) {
        const updatedUser =  await User.findByIdAndUpdate(
          { _id: context.user._id }, 
          { $addToSet: { auctions: auctions } },
          { new: true }
        );
  
      return updatedUser;
      }
    
      throw new AuthenticationError('You need to be logged in!');
      
    },
    updateLatestBidUser: async (parent, {auctions}, context) => {
      if (context.user) {
        const updatedAuctionUser =  await Auction.findByIdAndUpdate(
          { _id: auctions },
          { latestBidUser: context.user._id },
          { new: true }
        );
  
      return updatedAuctionUser;
      }
    
      throw new AuthenticationError('You need to be logged in!');
      
    },

    deleteflight: async (parent, args, context) => {
      if (context.user) {

        const remUserAucion =  await User.findOneAndUpdate(
        { _id: args.remuserId },
        { $pull: { auctions: args.auctionId } },
        { new: true }
      );
      return remUserAucion;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    updateBidHistory: async (parent, args, context) => {
      if (context.user) {
        const bidHistory = await Bid.create({ bidAmount: args.bidAmount, bidUser: context.user._id });
        const addBidHistory =  await Auction.findByIdAndUpdate(
          { _id: args.auctionId },
          { $push: { bidsHistory: bidHistory } },
          { new: true }
        );
  
      return addBidHistory;
      }
    
      throw new AuthenticationError('You need to be logged in!');
      
    },

    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    }
  }
};

module.exports = resolvers;
