import React from "react";
// import Auth from "../utils/auth";
import { useMutation } from "@apollo/client";
import { DELETE_FROM_WATCHLIST } from "../utils/mutations";
import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const watchList = require("../../src/assets/icons/watchlist.png");

function Profilewatchlist({ userData, refetchMe }) {
  const plus = require("../../src/assets/icons/plus.png");
  const plusHover = require("../../src/assets/icons/plus2.png");

  const [deleteFromWatchlist] = useMutation(DELETE_FROM_WATCHLIST);
  const handleDeleteWatch = async (auctionId) => {
    try {
      console.log(auctionId);
      await deleteFromWatchlist({
        variables: { _id: auctionId },
      });
      refetchMe();
    } catch (error) {
      console.log("2", auctionId);
      console.error(error);
    }
  };

  return (
    <div className="profileBlock">
      <div className="profileBlockHeader">
        <img id="profileWatchIcon" alt="watchlist" src={watchList} />
        <h3>Watchlist</h3>
      </div>
      {userData.watchlistAuctions.map((auction) => {
        return (
          <div key={auction._id} className="profileOpenBids watching">
            <Link to={`auctiondetail/${auction._id}`}>
              {" "}
              <h2>
                {" "}
                {auction.origin} {">"} {auction.destination}{" "}
              </h2>
            </Link>
            <button onClick={() => handleDeleteWatch(auction._id)}>
              <a>
                <img
                  id="deleteWatch"
                  className="icon default"
                  alt="plus"
                  src={plus}
                />
                <img
                  id="deleteWatch2"
                  className="icon hover"
                  alt="plus hover"
                  src={plusHover}
                />
                {/* <FontAwesomeIcon icon="fa-solid fa-x" /> */}
              </a>
            </button>
          </div>
        );
      })}
    </div>
  );
}
export default Profilewatchlist;
