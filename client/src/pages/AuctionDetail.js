import React, { useState } from "react";
import AuctionMap from "../components/AuctionMap";
import AuctionButton from "../components/AuctionButton";
import Auth from "../utils/auth";
import { useQuery, useMutation } from "@apollo/client";
import { UPDATE_BID, SAVE_FLIGHT } from "../utils/mutations";
import { QUERY_AUCTION } from "../utils/queries";
import Timer from "../components/Timer";
import { Link } from "react-router-dom";
import Popup from "../components/TermsPopUp";

function AuctionDetail() {
  const plane = require("../../src/assets/icons/plane.png");
  const pathArray = window.location.pathname.split("/");
  const auctionId = pathArray[pathArray.length - 1];
  
  const [fromAuctionDetail, setFromAuctionDetail] = useState(true)

  const {
    loading,
    data,
    refetch: refetchAuction,
  } = useQuery(QUERY_AUCTION, {
    variables: { _id: auctionId },
  });
  refetchAuction();
  const [endTimer, setEndTimer] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(Boolean);

  const handleAgreeToTerms = (e) => {
    const { checked } = e.target;
    setAgreeToTerms(checked);
  };

  const auctionData = data?.auction || {};

  return (
    <div>
      {loading ? null : (
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
                <div id="timerStack">
                  <div id="timerHeader">
                    <h6>D</h6>
                    <h6>H</h6>
                    <h6>M</h6>
                    <h6>S</h6>
                  </div>
                  <div id="countdown">
                    <Timer
                      auctionEndDate={+auctionData.auctionEndDate}
                      setEndTimer={setEndTimer}
                      refetchAuction={refetchAuction}
                      fromAuctionDetail={fromAuctionDetail}
                      setFromAuctionDetail={setFromAuctionDetail}
                    />
                  </div>
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
                  <h2 id="leadBidTitle">LEAD BID:</h2>
                  <div id="leadingBid">
                    <h2>${auctionData.currentBid}</h2>
                  </div>
                </div>
                <div className="termsContainer">
                  <input
                    type="checkbox"
                    id="termsConfirm"
                    checked={agreeToTerms}
                    onChange={handleAgreeToTerms}
                  ></input>
                  <label htmlFor="termsConfirm">Agree:&nbsp;</label>
                  <Popup agreeToTerms={agreeToTerms} setAgreeToTerms={setAgreeToTerms}/>
                </div>
                <div className="serviceContainer">
                  Service Detail:&nbsp;
                  <Link to="/servicedetail" id="addServiceLink">
                    <h3>Read More</h3>
                  </Link>
                </div>
                <li>In-flight attendence available.</li>
                <li>Bar stocked with non-alcoholic beverages.</li>
              </div>
            </div>
            <AuctionButton
              auctionData={auctionData}
              refetchAuction={refetchAuction}
              endTimer={endTimer}
              agreeToTerms={agreeToTerms}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default AuctionDetail;
