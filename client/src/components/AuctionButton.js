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

function AuctionButton(props) {
  const watch = require("../../src/assets/icons/watch.png");
  const watchHover = require("../../src/assets/icons/watch2.png");
  const pathArray = window.location.pathname.split("/");
  const auctionId = pathArray[pathArray.length - 1];
  const { loading, data } = useQuery(QUERY_ME);
  const userData = data?.me || {};

  console.log(userData);
  const [bid, setBid] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
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

  const handlePlaceBid = async (e) => {
    e.preventDefault();
    try {
      setErrorMessage("");
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
  };

  const historyBlock = () => {
    return (
      <div className="bidHistory">
        <div id="bidHeader">Bid History</div>
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
                <a href="/profile">
                  <h2>* on your watchlist</h2>
                </a>
              ) : (
                <>
                  <div id="watchOption">
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
                        onClick={saveToWatch}
                      />
                    </a>
                    <h2>Watch this Auction </h2>
                  </div>
                </>
              )}
            </div>
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
                onClick={handlePlaceBid}
              >
                <h1>PLACE BID</h1>
              </button>
            </div>
            {errorMessage ? (
              <div>
                <p id="alert">{errorMessage}</p>
              </div>
            ) : null}
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
          <a
            className="shadow-pop-br"
            id="submitBtn"
            type="submit"
            href="/payment"
          >
            <h1>MAKE PAYMENT</h1>
          </a>
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
          <a
            className="shadow-pop-br"
            id="submitBtn"
            type="submit"
            href="/login"
          >
            <h1>LOGIN TO BID</h1>
          </a>
        </div>
      </>
    );
  }
}
export default AuctionButton;
