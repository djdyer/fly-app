import React from "react";

function Auction() {
  const watch = require("../../src/assets/icons/watch.png");
  const watchHover = require("../../src/assets/icons/watch2.png");

  return (
    <div>
      <div className="auction">
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
          <h5>Watch this auction </h5>
        </div>
        <div class="enterBid">
          <input id="enterBid" placeholder="enter your bid" />
          <button className="shadow-pop-br" id="submitBtn">
            <h1>PLACE BID</h1>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Auction;
