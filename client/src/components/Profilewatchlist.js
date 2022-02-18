import React from "react";
// import Auth from "../utils/auth";
import { useMutation } from "@apollo/client";
import { DELETE_FROM_WATCHLIST } from "../utils/mutations";

const watchList = require("../../src/assets/icons/watchlist.png");


function Profilewatchlist({userData, refechMe}) {
    const [deleteFromWatchlist] = useMutation(DELETE_FROM_WATCHLIST)
    const handleDeleteWatch = async (auctionId) => {
       
        try {
          console.log(auctionId)
          await deleteFromWatchlist({
            variables: { _id: auctionId },
          });
          refechMe();

         } catch (error) {
            console.log("2",auctionId)
          console.error(error);
        }
      };


    return (
        <div className="profileBlock">
            <div className="profileBlockHeader">
                <img alt="watchlist" src={watchList} />
                <h3>Watchlist</h3>
            </div>
            {userData.watchlistAuctions.map((auction) => {
                return (
                    <div key={auction._id} className="profileOpenBids">
                        <a href={`auctiondetail/${auction._id}`}>
                            {" "}
                            <h2>
                                {" "}
                                From: {auction.origin} To: {auction.destination}{" "}
                            </h2>
                        </a>
                        <button
                            onClick={() => handleDeleteWatch(auction._id)}
                        >
                            <h1>DELETE</h1>
                        </button>
                    </div>
                
                );
            })}

        </div>
    )
}
export default Profilewatchlist;