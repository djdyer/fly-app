const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Auction {
    _id: ID
    auctionEndDate: String!
    destination: String!
    origin: String!
    flightDate: String!
    currentBid: Float!
    aircraft: String!
    flightNum: String!
    cabinSize: String!
    operator: String!
    termsAndConds: String!
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
    checkout(products: [ID]!): Checkout
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
