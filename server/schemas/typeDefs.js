const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Auction {
    _id: ID!
    auctionEndDate: String!
    destination: String!
    origin: String!
    flightDate: String!
    image: String!
    currentBid: Float!
    aircraft: String!
    flightNum: String!
    cabinSize: String!
    operator: String!
    termsConfirm: Boolean!
  }

  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    auctions: [Auction]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    users: [User]
    user(_id: ID!): User
    me: User
    auction(_id: ID!): Auction
    auctions: [Auction]
    checkout(products: [ID]!): Checkout
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
    saveflight(auction: ID!): User
    updateBid(_id: ID!, currentBid: Float!): Auction
  }
`;

module.exports = typeDefs;
