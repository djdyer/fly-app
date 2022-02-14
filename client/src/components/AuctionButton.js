import React, { useState, useEffect } from "react";
import Auth from "../utils/auth";
import { useMutation } from "@apollo/client";
import { UPDATE_BID, SAVE_FLIGHT, DELETE_FLIGHT, UPDATE_LATESTBID_USER } from "../utils/mutations";
import { QUERY_CHECKOUT } from '../utils/queries';
import { useLazyQuery } from '@apollo/client';
import { loadStripe } from '@stripe/stripe-js';
import { idbPromise } from '../utils/helpers';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

function AuctionButton(props) {
  const pathArray = window.location.pathname.split("/");
  const auctionId = pathArray[pathArray.length - 1];
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }

    const [bid, setBid] = useState("");

    const [updateBid, { error }] = useMutation(UPDATE_BID);
    const [saveflight] = useMutation(SAVE_FLIGHT);
    const [deleteflight] = useMutation(DELETE_FLIGHT);
    const [updateLatestBidUser] = useMutation(UPDATE_LATESTBID_USER);

    const handleInputChange = (e) => {
        // Getting the value and name of the input which triggered the change
        const { target } = e;
        // const inputType = target.name;
        const inputValue = target.value;
        setBid(inputValue);

    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!+bid) {
                console.log("Not a number");
                setBid("");
                return;
            }
            if ((+bid) <= props.currentBid) {
                console.log("You cant bid lower");
                return;

            }
            const response = await updateBid({
                variables: { currentBid: +bid, _id: auctionId },
            });

            const responseDeleteFlight = await deleteflight({
                variables: { auctionId: auctionId, remuserId: props.auctionData.latestBidUser._id },
            });

            await updateLatestBidUser({
                variables: { _id: auctionId },
            });

            const responseSaveFlight = await saveflight({
                variables: { _id: auctionId },
            });

            console.log(responseSaveFlight, responseDeleteFlight)
            if (!response) {
                throw new Error("something went wrong!");
            }
        } catch (err) {
            console.error(err);
        }

        setBid("");
        return;
      }
      if (+bid <= props.currentBid) {
        console.log("You cant bid lower");
        return;
      }
      const response = await updateBid({
        variables: { currentBid: +bid, _id: auctionId },
      });
      const responseSaveFlight = await saveflight({
        variables: { _id: auctionId },
      });

      const responseDeleteFlight = await deleteflight({
        variables: {
          auctionId: auctionId,
          remuserId: props.auctionData.latestBidUser._id,
        },
      });
      console.log(responseSaveFlight, responseDeleteFlight);
      if (!response) {
        throw new Error("something went wrong!");
      }
    } catch (err) {
      console.error(err);
    }

    setBid("");
  };

  if (Auth.loggedIn() && props.auctionData.auctionEndDate > new Date()) {
    return (
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
    );
  } else if (Auth.loggedIn() && props.auctionData.auctionEndDate < new Date()) {
    return (
      <div className="enterBid btnTerms">
        <button
          className="shadow-pop-br"
          id="submitBtn"
          type="submit"
          onClick={submitCheckout}
        >
          <h1>MAKE PAYMENT</h1>
        </button>
      </div>
    );
  } else {
    return (
      <div className="enterBid">
        <a className="shadow-pop-br" id="submitBtn" type="submit" href="/login">
          <h1>LOGIN TO BID</h1>
        </a>
        {error ? (
          <div>
            <p className="error-text" style={{ color: "red" }}>
              BID ERROR
            </p>
          </div>
        ) : null}
      </div>
    );
  }

  // return (
  //     <>
  //         {Auth.loggedIn() ? (

  //             <div className="enterBid">
  //                 <input
  //                     id="enterBid"
  //                     placeholder="enter your bid"
  //                     value={bid}
  //                     name="number"
  //                     onChange={handleInputChange}
  //                 />
  //                 <button
  //                     className="shadow-pop-br"
  //                     id="submitBtn"
  //                     type="submit"
  //                     onClick={handleFormSubmit}
  //                 >
  //                     <h1>PLACE BID</h1>
  //                 </button>
  //             </div>
  //         ) : (
  //             <div className="enterBid">
  //                 <a
  //                     className="shadow-pop-br"
  //                     id="submitBtn"
  //                     type="submit"
  //                     href="/login"
  //                 >
  //                     <h1>LOGIN TO BID</h1>
  //                 </a>
  //                 {error ? <div>
  //                     <p className="error-text" style={{ color: "red" }}>BID ERROR</p>
  //                 </div> : null
  //                 }
  //             </div>
  //         )}

  //     </>
  // )
}
export default AuctionButton;
