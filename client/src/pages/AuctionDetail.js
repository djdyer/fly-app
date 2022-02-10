import React from "react";
import AuctionMap from "../components/AuctionMap";
import { useQuery, useMutation } from "@apollo/client";
import { UPDATE_BID, SAVE_FLIGHT } from "../utils/mutations";
import { QUERY_AUCTION } from "../utils/queries"
function AuctionDetail() {
  const watch = require("../../src/assets/icons/watch.png");
  const watchHover = require("../../src/assets/icons/watch2.png");
  const plane = require("../../src/assets/icons/plane.png");
  const pathArray = window.location.pathname.split("/");
  const auctionId = pathArray[pathArray.length - 1];
  // console.log(auctionId)
  const { loading, data } = useQuery(QUERY_AUCTION, { variables: { _id: auctionId } });
  console.log("x", loading)
  console.log("y", data)

  const auctionData = data?.auction || {};
  console.log(auctionData);
  const { _id }= auctionData;
  console.log("ccc",_id);
  // const [updatedBid, setBid] = useState("");

  // const [updateBid, { error }] = useMutation(UPDATE_BID);

  // const [saveflight, { error }] = useMutation(SAVE_FLIGHT);

  // const handleUpdateBid = async (flightId) => {
  //   const bidToUpdate = ""; /////////
  //   const token = Auth.loggedIn() ? Auth.getToken() : null;

  //   if (!token) {
  //     return false;
  //   }

  //   try {
  //     const response = await updateBid({
  //       variables: {...bidToUpdate},
  //     });

  //     if (!response) {
  //       throw new Error('something went wrong!');
  //     }

  //     setBid(bid);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

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
            <div id="countdown">00:00:00:00</div>
          </div>
          <AuctionMap />
          <div id="auctionBody">
            <div className="auctionBodyColumn">
              <h3>
                Date:
                {auctionData.flightDate}
              </h3>
              <h3>
                Time:
                {auctionData.flightTime}
              </h3>
              <h3>
                Aircraft:  
                {auctionData.aircraft}
              </h3>
              <h3>
                Flight Num:   
                {auctionData.flightNum}
              </h3>
              <h3>
                Cabin Size:  
                {auctionData.cabinSize}
              </h3>
              <h3>Operator: {auctionData.operator}</h3>
            </div>
            <div className="auctionBodyColumn">
              <div className="leadingBidContainer">
                Leading Bid:
                <div id="leadingBid">
                  $
                  {auctionData.currentBid}
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
                <a id="addService" href="/servicedetail">
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

export default AuctionDetail;