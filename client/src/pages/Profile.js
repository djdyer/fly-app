import React, { useState } from "react";
import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import Profilewatchlist from "../components/Profilewatchlist";
import { uploadAvatar } from "../utils/uploadAvatar";
import { Link } from "react-router-dom";
// import Timer from "../components/Timer";

function Profile() {
  const notificationsList = require("../../src/assets/icons/notificationslist.png");
  const settingsList = require("../../src/assets/icons/settingslist.png");
  const paymentsList = require("../../src/assets/icons/paymentslist.png");
  const documentsList = require("../../src/assets/icons/documentslist.png");
  const userImg = require("../../src/assets/icons/loaduser.png");
  const plus = require("../../src/assets/icons/plus.png");
  const plusHover = require("../../src/assets/icons/plus2.png");

  const { loading, data, error, refetch: refechMe } = useQuery(QUERY_ME);
  const userData = data?.me || {};
  refechMe();

  // const [imageUrl, setImageUrl] = useState({
  //   imageUrl: "",
  // });

  // function showWidget() {
  //   let widget = window.cloudinary.createUploadWidget(
  //     {
  //       cloudName: "dzjvfg4wt",
  //       uploadPreset: "ml_default",
  //     },
  //     (error, result) => {
  //       if (!error && result && result.event === "success") {
  //         console.log("RESULT.INFO.URL", result.info.url);
  //         // setImageUrl(result.info.secure_url);
  //         setImageUrl("");
  //       }
  //     }
  //   );
  //   widget.open();
  // }

  return (
    <>
      {loading ? null : (
        <div className="profile">
          <div className="profileDetail fade-in">
            <h2>Profile</h2>
            <header>
              <div className="profileColumn">
                <a onClick={uploadAvatar()}>
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
                  {/* <input
                    type="file"
                    id="avatar"
                    name="avatar"
                    accept="image/png, image/jpeg"
                  ></input> */}

                  {/* <figure className="inputField">
                    <label htmlFor="Image">Image :</label>
                    <button
                      id="uploadbtn"
                      onClick={showWidget}
                      type="button"
                      className=""
                    ></button>
                  </figure> */}
                </a>
                <img id="userImg" alt="userImg" src={userImg} />
              </div>
              <div className="profileColumn">
                <h5>Name: </h5>
                <h5>Email: </h5>
                <h5>Home City:</h5>
                <div id="profileLinks">
                  <Link to="/editprofile">
                    <h6>Edit</h6>
                  </Link>
                  <Link to="/" onClick={() => Auth.logout()}>
                    <h6>Logout</h6>
                  </Link>
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
                  <h3>Winning Bids</h3>
                </div>
                {userData.winingAuctions.map((auction) => {
                  return (
                    <div key={auction._id} className="profileOpenBids">
                      <Link to={`auctiondetail/${auction._id}`}>
                        {" "}
                        <h2>
                          {" "}
                          {auction.origin} {" > "} {auction.destination}{" "}
                          {/* <Timer
                            auctionEndDate={+auctionData.auctionEndDate}
                            setEndTimer={setEndTimer}
                            refechAuction={refechAuction}
                          /> */}
                        </h2>
                      </Link>
                    </div>
                  );
                })}
              </div>

              <Profilewatchlist userData={userData} refechMe={refechMe} />

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

              <div className="profileBlock">
                <div className="profileBlockHeader">
                  <img alt="settingsPreference" src={settingsList} />
                  <h3>Settings</h3>
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
