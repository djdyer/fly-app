import { gql } from "@apollo/client";

export const QUERY_AUCTIONS = gql`
  query auctions {
    auctions {
      _id
      auctionEndDate
      destination
      origin
      flightDate
      image
      currentBid
      bidsHistory {
        bidTime
        bidAmount
        bidUser {
          _id
          firstName
          lastName
        }
      }
      aircraft
      flightNum
      cabinSize
      operator
      termsConfirm
      latestBidUser {
        _id
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($_id: ID!) {
    user(_id: $_id) {
      _id
      firstName
      lastName
      email
      homeCity
    }
  }
`;

export const QUERY_ME = gql`
  query user {
    me {
      _id
      firstName
      lastName
      email
      homeCity
      winingAuctions {
        _id
        auctionEndDate
        destination
        origin
        flightDate
        image
        currentBid
        aircraft
        flightNum
        cabinSize
        operator
        termsConfirm
        latestBidUser {
          _id
        }
      }
      watchlistAuctions {
        _id
        auctionEndDate
        destination
        origin
        flightDate
        image
        currentBid
        aircraft
        flightNum
        cabinSize
        operator
        termsConfirm
        latestBidUser {
          _id
        }
      }
    }
  }
`;

export const QUERY_AUCTION = gql`
  query auction($_id: ID!) {
    auction(_id: $_id) {
      _id
      auctionEndDate
      destination
      origin
      flightDate
      image
      currentBid
      bidsHistory {
        bidTime
        bidAmount
        bidUser {
          _id
          firstName
          lastName
        }
      }
      aircraft
      flightNum
      cabinSize
      operator
      termsConfirm
      latestBidUser {
        _id
      }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($flight: ID!) {
    checkout(flight: $flight) {
      session
    }
  }
`;
