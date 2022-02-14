const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
  _id: ID!
  firstName: String!
  lastName: String!
  email: String!
  password: String!
  auctions: [Auction]
  homeCity: String
}

  type Auction {
    _id: ID!
    auctionEndDate: String
    destination: String
    origin: String
    flightDate: String
    image: String
    currentBid: Float
    bidsHistory: [Bid]
    aircraft: String
    flightNum: String
    cabinSize: String
    operator: String
    termsConfirm: Boolean
    latestBidUser: User
  }

  
  type Bid {
    bidTime: String!
    bidAmount: Float
    bidUser: User
  }

  type Auth {
    token: ID
    user: User
  }


type Order {
    _id: ID
    purchaseDate: String
    flight: Auction
  }  

  type Query {
    users: [User]
    user(_id: ID!): User
    me: User
    auction(_id: ID!): Auction
    auctions: [Auction]
    order(_id: ID!): Order
    checkout(flight: ID!): Checkout
  }

  type Checkout {
    session: ID
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
    saveflight(auctions: ID!): User
    updateBid(_id: ID!, currentBid: Float!): Auction
    updateLatestBidUser(auctions: ID!): Auction
    deleteflight(auctionId: ID!, remuserId: ID!): User
    addOrder(flight: ID!): Order
    
  }
`;

module.exports = typeDefs;
