import React, { useEffect, useState } from "react";
import Auction from "../components/Auction";
import { useQuery } from "@apollo/client";
import { QUERY_AUCTIONS } from "../utils/queries";

function TopResults() {
  const { loading, data } = useQuery(QUERY_AUCTIONS);

  const oneDay = 24 * 60 * 60 * 1000;
  if (loading) {
    return <p>Loading ....</p>;
  } else {
    console.log(data.auctions);
    return (
      <>
        <div className="topResultsContainer">
          <div id="topResultsHeader">
            <h2>DEPARTING SOON:</h2>
          </div>
          <div className="topResults">
            {data.auctions.map((auction) => {
              if (
                auction.auctionEndDate > new Date() &&
                auction.auctionEndDate < +new Date() + oneDay
              ) {
                return <Auction key={auction._id} auction={auction} />;
              }
            })}
          </div>
        </div>
      </>
    );
  }
}
export default TopResults;
