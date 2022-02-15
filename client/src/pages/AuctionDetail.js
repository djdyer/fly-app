import React, { useState } from "react";
import AuctionMap from "../components/AuctionMap";
import AuctionButton from "../components/AuctionButton";
import Auth from "../utils/auth";
import { useQuery, useMutation } from "@apollo/client";
import { UPDATE_BID, SAVE_FLIGHT } from "../utils/mutations";
import { QUERY_AUCTION } from "../utils/queries";
import Timer from "../components/Timer";

function AuctionDetail() {
  const plane = require("../../src/assets/icons/plane.png");
  const pathArray = window.location.pathname.split("/");
  const auctionId = pathArray[pathArray.length - 1];
  const { loading, data } = useQuery(QUERY_AUCTION, {
    variables: { _id: auctionId },
  });
  const auctionData = data?.auction || {};
  console.log(auctionData);

  return (
    <div>
      {loading ? (
        <p>Loading .....</p>
      ) : (
        <div className="auction">
          <div className="auctionDetail fade-in">
            <div id="myPlane">
              <img
                alt="plane"
                className="plane"
                src={`/images/planes/${auctionData.image}`}
              />
            </div>

            <div id="auctionHeader">
              <div id="trip">
                <h2>{auctionData.origin}</h2>
                <img className="planeIcon" alt="plane icon" src={plane} />
                <h2>{auctionData.destination}</h2>
              </div>
              <div id="timerBlock">
                <h2>CLOSING:</h2>
                <div id="countdown">
                  <Timer auctionEndDate={+auctionData.auctionEndDate} />
                </div>
              </div>
            </div>
            <AuctionMap />
            <div id="auctionBody">
              <div className="auctionBodyColumn">
                <div className="auctionRow">
                  <h3>Date:</h3>
                  {new Date(+auctionData.flightDate).toLocaleDateString()}
                </div>
                <div className="auctionRow">
                  <h3>Time:</h3>
                  {new Date(+auctionData.flightDate).toLocaleTimeString()}
                </div>
                <div className="auctionRow">
                  <h3>Aircraft:</h3>
                  {auctionData.aircraft}
                </div>

                <div className="auctionRow">
                  <h3>Flight Num:</h3>
                  {auctionData.flightNum}
                </div>

                <div className="auctionRow">
                  <h3>Cabin Size:</h3>
                  {auctionData.cabinSize}
                </div>

                <div className="auctionRow">
                  <h3>Operator:</h3>
                  {auctionData.operator}
                </div>
              </div>
              <div className="auctionBodyColumn">
                <div className="leadingBidContainer">
                  Leading Bid:
                  <div id="leadingBid">
                    <h2>${auctionData.currentBid}</h2>
                  </div>
                </div>
                <div className="termsContainer">
                  <input type="checkbox" id="termsConfirm"></input>
                  <h3>
                    Agree to <a href="/termsandcondtions">Terms+Conditions</a>
                    {auctionData.termsConfirm}
                  </h3>
                </div>
                <div className="serviceContainer">
                  Service Detail:
                  <a id="addServiceLink" href="/servicedetail">
                    Read More
                  </a>
                </div>
                <li>In-flight attendence available.</li>
                <li>Bar stocked with non-alcoholic beverages.</li>
              </div>
            </div>
            <div className="bidHistory">
              <div id="bidHeader">Bid History</div>
              {auctionData?.bidsHistory.map((history) => {
                return (
                  <table className="otherBid" key={history._id}>
                    <tr>
                      <h5>
                        {history.bidUser.firstName} {history.bidUser.lastName}
                      </h5>
                    </tr>
                    <tr>
                      <h5>
                        Time: {new Date(+history.bidTime).toLocaleTimeString()}
                      </h5>
                    </tr>
                    <tr>
                      <h5>Bid: ${history.bidAmount}</h5>
                    </tr>
                  </table>
                );
              })}
            </div>
            <AuctionButton auctionData={auctionData} />
          </div>
        </div>
      )}
    </div>
  );
}

export default AuctionDetail;
