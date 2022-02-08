import React from "react";
import Auth from "../utils/auth";

export default function Navigation({ currentPage, handlePageChange }) {
  const logo = require("../../src/assets/icons/fly_logo.png");
  const user = require("../../src/assets/icons/user.png");
  const userHover = require("../../src/assets/icons/user2.png");
  const notifications = require("../../src/assets/icons/notifications.png");
  const notificationsHover = require("../../src/assets/icons/notifications2.png");
  const filter = require("../../src/assets/icons/filter.png");
  const filterHover = require("../../src/assets/icons/filter2.png");
  const search = require("../../src/assets/icons/search.png");
  const searchHover = require("../../src/assets/icons/search2.png");
  const settings = require("../../src/assets/icons/settings.png");
  const settingsHover = require("../../src/assets/icons/settings2.png");
  const payment = require("../../src/assets/icons/transfers.png");
  const paymentHover = require("../../src/assets/icons/transfers2.png");
  const documents = require("../../src/assets/icons/documents.png");
  const documentsHover = require("../../src/assets/icons/documents2.png");
  const more = require("../../src/assets/icons/plus.png");
  const moreHover = require("../../src/assets/icons/plus2.png");

  return (
    <>
      {/* Side Nav (Mobile) */}
      <div id="mobileNav">
        <a href="signup" onClick={() => handlePageChange("Signup")}>
          <img className="icon default" alt="signup" src={user} />
          <img className="icon hover" alt="userHover" src={userHover} />
        </a>
        <a
          href="notifications"
          onClick={() => handlePageChange("Notifications")}
        >
          <img
            className="icon default"
            alt="notifications"
            src={notifications}
          />
          <img
            className="icon hover"
            alt="notificationsHover"
            src={notificationsHover}
          />
        </a>
      </div>

      {/* Side Nav (Desktop) */}
      <div id="profileNav" className="navigation slide-left">
      {Auth.loggedIn() ? (
                <>
                <a href="/" onClick={Auth.logout}> Logout</a>
                </>
              ) : (
                <a href="signup" onClick={() => handlePageChange("Signup")}>
                <img className="icon default" alt="signup" src={user} />
                <img className="icon hover" alt="signupHover" src={userHover} />
              </a>              )}

        <a
          href="notifications"
          onClick={() => handlePageChange("Notifications")}
        >
          <img
            className="icon default"
            alt="notifications"
            src={notifications}
          />
          <img
            className="icon hover"
            alt="notificationsHover"
            src={notificationsHover}
          />
        </a>
        <a href="filter" onClick={() => handlePageChange("Filter")}>
          <img className="icon default" alt="filter" src={filter} />
          <img className="icon hover" alt="filterHover" src={filterHover} />
        </a>
      </div>

      {/* Main Nav */}
      <nav id="navBlock" className="navigation slide-right">
        <img id="logo" alt="fly-logo" src={logo} />
        <a href="search" onClick={() => handlePageChange("Search")}>
          <div className="navTab">
            <img className="icon default" alt="search" src={search} />
            <img className="icon hover" alt="searchHover" src={searchHover} />
            <h1>Search</h1>
          </div>
        </a>

        <a href="settings" onClick={() => handlePageChange("Settings")}>
          <div className="navTab">
            <img className="icon default" alt="settings" src={settings} />
            <img
              className="icon hover"
              alt="settingsHover"
              src={settingsHover}
            />
            <h1>Settings</h1>
          </div>
        </a>

        <a href="payment" onClick={() => handlePageChange("Payment")}>
          <div className="navTab">
            <img className="icon default" alt="payment" src={payment} />
            <img className="icon hover" alt="paymentHover" src={paymentHover} />
            <h1>Payment</h1>
          </div>
        </a>

        <a href="documents" onClick={() => handlePageChange("Documents")}>
          <div className="navTab">
            <img className="icon default" alt="documents" src={documents} />
            <img
              className="icon hover"
              alt="documentsHover"
              src={documentsHover}
            />
            <h1>Documents</h1>
          </div>
        </a>

        <a href="more" onClick={() => handlePageChange("More")}>
          <div className="navTab">
            <img className="icon default" alt="more" src={more} />
            <img className="icon hover" alt="moreHover" src={moreHover} />
            <h1>More</h1>
          </div>
        </a>
      </nav>
    </>
  );
}
