import React, { useState } from "react";
import Auth from "../utils/auth";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
// import { UPDATE_BID, SAVE_FLIGHT } from "../utils/mutations";
// import { QUERY_AUCTION } from "../utils/queries";

function Profile() {
  const watchList = require("../../src/assets/icons/watchlist.png");
  const notificationsList = require("../../src/assets/icons/notificationslist.png");
  const settingsList = require("../../src/assets/icons/settingslist.png");
  const paymentsList = require("../../src/assets/icons/paymentslist.png");

  const documentsList = require("../../src/assets/icons/documentslist.png");
  const userImg = require("../../src/assets/icons/loaduser.png");
  const plus = require("../../src/assets/icons/plus2.png");
  const plusHover = require("../../src/assets/icons/plus.png");

  const { loading, data } = useQuery(QUERY_ME);
  const userData = data?.me || {};

  console.log(userData);
  console.log(userData.auctions);

  return (
    <>
      {loading ? (
        <p>Loading....</p>
      ) : (
        <div className="auction">
          <div className="profileDetail">
            <h2>Profile</h2>
            <header>
              <div className="profileColumn">
                <img
                  id="addUserImg"
                  className="icon default"
                  alt="plus"
                  src={plus}
                />
                <img
                  id="addUserImg2"
                  className="icon hover"
                  alt="plus hover"
                  src={plusHover}
                />
                <img id="userImg" alt="userImg" src={userImg} />
              </div>
              <div className="profileColumn">
                <h5>Name: </h5>
                <h5>Email: </h5>
                <h5>Home City:</h5>
                <div id="profileLinks">
                  <a href="/editprofile">
                    <h6>Edit Profile</h6>
                  </a>
                  <a href="/signup">
                    <h6>Update Password</h6>
                  </a>
                  <a href="/" onClick={() => Auth.logout()}>
                    <h6>Logout</h6>
                  </a>
                </div>
              </div>
              <div className="profileColumn">
                <h3>{userData.firstName}</h3>
                <h3>{userData.email}</h3>
                <h3>{userData.homeCity}</h3>
              </div>
            </header>
            <div>
              <div className="profileBlock">
                <div className="profileBlockHeader">
                  <img alt="notificationslist" src={notificationsList} />
                  <h3>Open Bids</h3>
                </div>
                {userData.auctions.map((auction) => {
                  return (
                    <a href={`auctiondetail/${auction._id}`} key={auction._id}>
                      {" "}
                      From: {auction.origin} To: {auction.destination}{" "}
                    </a>
                  );
                })}
              </div>

              <div className="profileBlock">
                <div className="profileBlockHeader">
                  <img alt="watchlist" src={watchList} />
                  <h3>Watchlist</h3>
                </div>
              </div>

              <div className="profileBlock">
                <div className="profileBlockHeader">
                  <img alt="settingsPreference" src={settingsList} />
                  <h3>Settings</h3>
                </div>
              </div>

              <div className="profileBlock">
                <div className="profileBlockHeader">
                  <img alt="paymentlist" src={paymentsList} />
                  <h3>Payment</h3>
                </div>
              </div>

              <div className="profileBlock">
                <div className="profileBlockHeader">
                  <img alt="documents" src={documentsList} />
                  <h3>Documents</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
