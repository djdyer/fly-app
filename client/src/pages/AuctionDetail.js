import React, { useState } from "react";
import AuctionMap from "../components/AuctionMap";
import Auth from '../utils/auth';

import { useQuery, useMutation } from "@apollo/client";
import { UPDATE_BID, SAVE_FLIGHT } from "../utils/mutations";
import { QUERY_AUCTION } from "../utils/queries";
import Timer from "../components/Timer";


function AuctionDetail() {
  const watch = require("../../src/assets/icons/watch.png");
  const watchHover = require("../../src/assets/icons/watch2.png");
  const plane = require("../../src/assets/icons/plane.png");
  const pathArray = window.location.pathname.split("/");
  const auctionId = pathArray[pathArray.length - 1];
  // console.log(auctionId)
  const { loading, data } = useQuery(QUERY_AUCTION, {
    variables: { _id: auctionId },
  });

  const auctionData = data?.auction || {};

  const [bid, setBid] = useState("");

  const [updateBid, { error }] = useMutation(UPDATE_BID);

  const handleInputChange = (e) => {
    // Getting the value and name of the input which triggered the change
    const { target } = e;
    // const inputType = target.name;
    const inputValue = target.value;
    setBid(inputValue);

    console.log(bid);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
    if (!+bid) {
      console.log("Not a number");
      setBid("");
      return;
    }
    if ((+bid) <= auctionData.currentBid) {
      console.log("You cant bid lower");
      return;

    }
      const response = await updateBid({
        variables: { currentBid: +bid, _id: auctionId },
      });

      if (!response) {
        throw new Error("something went wrong!");
      }
    } catch (err) {
      console.error(err);
    }

    setBid("");
  };

  return (
    <div>
      <div className="auction">
        <div className="auctionDetail">
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
            <div id="countdown">00:00:00:00<Timer flightDate={+auctionData.flightDate} /></div>
          </div>
          <AuctionMap />
          <div id="auctionBody">
            <div className="auctionBodyColumn">
              <div className="auctionRow">
                <h3>Date:</h3>
                {(new Date(+auctionData.flightDate).toLocaleDateString())}
              </div>
              <div className="auctionRow">
                <h3>Time:</h3>
                {(new Date(+auctionData.flightDate).toLocaleTimeString())}
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
            <div className="otherBid">
              <h5>Username</h5>
              <h5>Time Stamp</h5>
              <h5>Bid Amount</h5>
            </div>
            <div className="otherBid">
              <h5>Username</h5>
              <h5>Time Stamp</h5>
              <h5>Bid Amount</h5>
            </div>
            <div className="otherBid">
              <h5>Username</h5>
              <h5>Time Stamp</h5>
              <h5>Bid Amount</h5>
            </div>
          </div>
          <div className="watchOption">
            <a href="/watchlist">
              <img
                id="watchIcon"
                className="icon default"
                alt="watch"
                src={watch}
              />
              <img
                id="watchIcon2"
                className="icon hover"
                alt="watch hover"
                src={watchHover}
              />
            </a>
            <h3>Watch this Auction </h3>
          </div>
          {Auth.loggedIn() ? (

            <div className="enterBid">
              <input
                id="enterBid"
                placeholder="enter your bid"
                value={bid}
                name="number"
                onChange={handleInputChange}
              />
              <button
                className="shadow-pop-br"
                id="submitBtn"
                type="submit"
                onClick={handleFormSubmit}
              >
                <h1>PLACE BID</h1>
              </button>
            </div>
          ) : (
            <div className="enterBid">
              <a
                className="shadow-pop-br"
                id="submitBtn"
                type="submit"
                href="/login"
              >
                <h1>LOGIN TO BID</h1>
              </a>
            </div>
          )}
        </div>
      </div>
          {error ? <div>
            <p className="error-text" style={{ color: "red" }}>BID ERROR</p>
          </div> : null
          }
    </div>
  );
}

export default AuctionDetail;
