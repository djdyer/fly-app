import React, { useState, useEffect } from "react";
import Auth from "../utils/auth";
import { useMutation, useQuery } from "@apollo/client";
import {
  UPDATE_BID,
  SAVE_FLIGHT,
  DELETE_FLIGHT,
  UPDATE_LATESTBID_USER,
  UPDATE_BID_HISTORY,
  SAVE_TO_WATCHLIST,
} from "../utils/mutations";
import { QUERY_ME } from "../utils/queries";
import { Link } from "react-router-dom";
import "./auctionButtonPlaceholder.css";

function AuctionButton(props) {
  const watch = require("../../src/assets/icons/watch.png");
  const watchHover = require("../../src/assets/icons/watch2.png");
  const pathArray = window.location.pathname.split("/");
  const auctionId = pathArray[pathArray.length - 1];
  const { loading, data } = useQuery(QUERY_ME);
  const userData = data?.me || {};

  const [bid, setBid] = useState("");
  const [errorMessage, setErrorMessage] = useState("enter your bid");
  const [watchOrWatching, setwatchOrWatching] = useState(false);

  const [updateBid, { error }] = useMutation(UPDATE_BID);
  const [saveflight] = useMutation(SAVE_FLIGHT);
  const [deleteflight] = useMutation(DELETE_FLIGHT);
  const [updateLatestBidUser] = useMutation(UPDATE_LATESTBID_USER);
  const [updateBidHistory] = useMutation(UPDATE_BID_HISTORY);
  const [saveToWatchlist] = useMutation(SAVE_TO_WATCHLIST);

  const handleInputChange = (e) => {
    e.preventDefault();
    try {
      // Getting the value and name of the input which triggered the change
      const { target } = e;
      const inputValue = target.value;
      setBid(inputValue);
    } catch (error) {
      console.error(error);
    }
  };

  const saveToWatch = async (e) => {
    e.preventDefault();
    try {
      await saveToWatchlist({
        variables: { _id: auctionId },
      });
      setwatchOrWatching(true);
    } catch (error) {
      console.error(error);
    }
  };
  async function doLogicToEnterBid() {
    try {
      setErrorMessage("enter your bid");
      if (!+bid) {
        setBid("");
        setErrorMessage("invalid");
      } else if (+bid <= props.auctionData.currentBid) {
        setErrorMessage("cannot bid lower");
      } else if (userData._id === props.auctionData.latestBidUser._id) {
        setErrorMessage("holding lead bid");
      } else {
        await updateBid({
          variables: { currentBid: +bid, _id: auctionId },
        });
        await saveToWatchlist({
          variables: { _id: auctionId },
        });
        setwatchOrWatching(true);
        await deleteflight({
          variables: {
            auctionId: auctionId,
            remuserId: props.auctionData.latestBidUser._id,
          },
        });
        await updateLatestBidUser({
          variables: { _id: auctionId },
        });
        await saveflight({
          variables: { _id: auctionId },
        });

        await updateBidHistory({
          variables: { auctionId: auctionId, bidAmount: +bid },
        });
        props.refechAuction();
      }
    } catch (error) {
      console.error(error);
    }
    setBid("");
  }

  const handlePlaceBid =  (e) => {
    e.preventDefault();
    doLogicToEnterBid();
  };

  const handlePlaceBidEnter =  (e) => {
    e.preventDefault();
    if (e.key === 'Enter' && props.agreeToTerms) {
      doLogicToEnterBid();
    }
  };

  const historyBlock = () => {
    return (
      <div className="bidHistory">
        <div id="bidHeader">BID HISTORY</div>
        {props.auctionData.bidsHistory
          .slice(0)
          .reverse()
          .slice(0, 3)
          .map((history) => {
            return (
              <div className="otherBid" key={history.bidTime}>
                <h5>
                  {history.bidUser.firstName} {history.bidUser.lastName}
                </h5>

                <h5>Time: {new Date(+history.bidTime).toLocaleTimeString()}</h5>
                <h5>Bid: ${history.bidAmount}</h5>
              </div>
            );
          })}
      </div>
    );
  };
  if (
    Auth.loggedIn() &&
    props.auctionData.auctionEndDate > new Date() &&
    !props.endTimer
  ) {
    return (
      <>
        {loading ? null : (
          <>
            {historyBlock()}
            <div className="watchOption">
              {watchOrWatching ||
                userData.watchlistAuctions.find(
                  (AuctionOnWathList) => AuctionOnWathList._id === auctionId
                ) ? (
                <div id="watchOption">
                  <Link to="/profile">
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
                  </Link>
                  <h2>On your Watchlist</h2>
                </div>
              ) : (
                <>
                  <div id="watchOption">
                    <a onClick={saveToWatch} href="">
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
                    <h2>Watch this Auction </h2>
                  </div>
                </>
              )}
            </div>
            <div className="enterBid">
              <input
                // id="enterBid"
                id={
                  errorMessage === "enter your bid"
                    ? "inputPlaceholderColorBlack"
                    : "inputPlaceholderColorRed"
                }
                placeholder={errorMessage}
                value={bid}
                name="number"
                onChange={handleInputChange}
                onKeyUp={handlePlaceBidEnter}
              />
              <button
                className="shadow-pop-br"
                id="submitBtn"
                type="submit"
                style={props.agreeToTerms ? null : { pointerEvents: "none" }}
                onClick={handlePlaceBid}
              >
                {props.agreeToTerms ? <h1 style={{ cursor: 'pointer' }}>PLACE BID</h1> : <h4 style={{ color: "red" }}>You have to agree to terms</h4>}
              </button>
            </div>
          </>
        )}
      </>
    );
  } else if (
    Auth.loggedIn() &&
    props.auctionData.auctionEndDate < new Date() &&
    userData._id === props.auctionData.latestBidUser._id &&
    props.endTimer
  ) {
    return (
      <>
        {historyBlock()}
        <div className="enterBid btnTerms">
          <h2 className="auctionMessage">YOU WIN!</h2>
          <Link
            className="shadow-pop-br"
            id="submitBtn"
            type="submit"
            to="/payment"
          >
            <h1>MAKE PAYMENT</h1>
          </Link>
        </div>
      </>
    );
  } else if (props.auctionData.auctionEndDate < new Date() && props.endTimer) {
    return (
      <>
        {historyBlock()}
        <div className="enterBid">
          <h1 className="auctionMessage">AUCTION CLOSED</h1>
        </div>
      </>
    );
  } else {
    return (
      <>
        {historyBlock()}
        <div className="enterBid">
          <Link
            to="/login"
            className="shadow-pop-br"
            id="submitBtn"
            type="submit"
          >
            <h1>LOGIN TO BID</h1>
          </Link>
        </div>
      </>
    );
  }
}
export default AuctionButton;
