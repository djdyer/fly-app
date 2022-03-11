import React from "react";
import { Link } from "react-router-dom";

function Auction({ auction }) {
  const plane = require("../../src/assets/icons/plane.png");
  const more = require("../../src/assets/icons/more.png");
  const moreHover = require("../../src/assets/icons/more2.png");

  return (
    <a>
      <Link to={`auctiondetail/${auction._id}`}>
        <div id="result">
          <div id="header1">
            <div id="trip">
              <h2>{auction.origin}</h2>
              <img className="planeIcon" alt="plane icon" src={plane} />
              <h2>{auction.destination}</h2>
            </div>

            <div id="costDetail">
              <h2>$ {auction.currentBid}</h2>
              <img
                className="icon default"
                id="moreBtn"
                alt="more button"
                src={more}
              />
              <img
                className="icon hover"
                id="moreBtn"
                alt="more button hover"
                src={moreHover}
              />
            </div>
          </div>

          <div id="header2">
            <h3>Flight No: {auction.flightNum}</h3>
            <h3>Cabin Size: {auction.cabinSize}</h3>
            <h3>{new Date(+auction.flightDate).toLocaleDateString()}</h3>
          </div>

          <div>
            <img
              alt="plane"
              className="plane"
              src={`/images/planes/${auction.image}`}
            />
          </div>
        </div>
      </Link>
    </a>
  );
}

export default Auction;
