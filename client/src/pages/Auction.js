import React from "react";
import AuctionMap from "../components/AuctionMap";

function Auction() {
  const watch = require("../../src/assets/icons/watch.png");
  const watchHover = require("../../src/assets/icons/watch2.png");
  const plane = require("../../src/assets/icons/plane.png");
  const more = require("../../src/assets/icons/more.png");

  return (
    <div>
      <div className="auction">
        <div className="auctionDetail">
          <div id="myPlane"></div>

          <div id="auctionHeader">
            <div id="trip">
              <h2>Origin</h2>
              <img className="planeIcon" alt="plane icon" src={plane} />
              <h2>Destination</h2>
            </div>
            <div id="countdown">COUNTDOWN</div>
          </div>
          <AuctionMap />
          <div id="auctionBody">
            <div className="auctionBodyColumn">
              <h3>Date/Time:</h3>
              <h3>Aircraft:</h3>
              <h3>Flight Num:</h3>
              <h3>Cabin Size:</h3>
              <h3>Flight Time:</h3>
              <h3>Operator:</h3>
            </div>
            <div className="auctionBodyColumn">
              <h3>Leading Bid:</h3>
              <h3>Terms+Conditions</h3>
              <h3>Service Detail</h3>
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
          <div className="enterBid">
            <input id="enterBid" placeholder="enter your bid" />
            <button className="shadow-pop-br" id="submitBtn">
              <h1>PLACE BID</h1>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auction;
