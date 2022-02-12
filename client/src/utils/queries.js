import { gql } from '@apollo/client';

export const QUERY_AUCTIONS= gql`
query auctions {
  auctions {
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
      }
}
`

export const QUERY_USER = gql`
query user($_id: ID!) {
  user(_id: $_id) {
    _id
    firstName
    lastName
    email
  }
}
`;

export const QUERY_ME = gql`
query user{
    me {
      _id
      firstName
      lastName
      email
      auctions {
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
    aircraft
    flightNum
    cabinSize
    operator
    termsConfirm
  }
}
`;

