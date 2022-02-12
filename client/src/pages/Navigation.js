import React from "react";
import Auth from "../utils/auth";

export default function Navigation({ currentPage, handlePageChange }) {
  const logo = require("../../src/assets/icons/fly_logo.png");
  const user = require("../../src/assets/icons/user.png");
  const userHover = require("../../src/assets/icons/user2.png");
  const notifications = require("../../src/assets/icons/notifications.png");
  const notificationsHover = require("../../src/assets/icons/notifications2.png");
  // const filter = require("../../src/assets/icons/filter.png");
  // const filterHover = require("../../src/assets/icons/filter2.png");
  const search = require("../../src/assets/icons/search.png");
  const searchHover = require("../../src/assets/icons/search2.png");
  const settings = require("../../src/assets/icons/settings.png");
  const settingsHover = require("../../src/assets/icons/settings2.png");
  const payment = require("../../src/assets/icons/transfers.png");
  const paymentHover = require("../../src/assets/icons/transfers2.png");
  const documents = require("../../src/assets/icons/documents.png");
  const documentsHover = require("../../src/assets/icons/documents2.png");
  const logout = require("../../src/assets/icons/logout2.png");
  const logoutHover = require("../../src/assets/icons/logout.png");

  return (
    <>
      {/* Side Nav (Mobile) */}
      <div id="mobileNav">
        <a href="/signup" onClick={() => handlePageChange("Signup")}>
          <img className="icon default" alt="signup" src={user} />
          <img className="icon hover" alt="userHover" src={userHover} />
        </a>
        <a
          href="/notifications"
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
            <a href="/" onClick={Auth.logout}>
              {" "}
              <img className="icon default" alt="logout" src={logout} />
              <img className="icon hover" alt="logoutHover" src={logoutHover} />
            </a>
          </>
        ) : (
          <a href="/signup" onClick={() => handlePageChange("Signup")}>
            <img className="icon default" alt="signup" src={user} />
            <img className="icon hover" alt="signupHover" src={userHover} />
          </a>
        )}

        <a
          href="/notifications"
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

      {/* Main Nav */}
      <nav id="navBlock" className="navigation slide-right">
        <a href="/">
          <img id="logo" alt="fly-logo" src={logo} />
        </a>
        <a href="/search" onClick={() => handlePageChange("Search")}>
          <div className="navTab">
            <img className="icon default" alt="search" src={search} />
            <img className="icon hover" alt="searchHover" src={searchHover} />
            <h1>Search</h1>
          </div>
        </a>
        {Auth.loggedIn() ? (
        <a href="/profile" onClick={() => handlePageChange
          ("Profile")}>
          <div className="navTab">
            <img className="icon default" alt="profile" src={user} />
            <img
              className="icon hover"
              alt="profileHover"
              src={userHover}
            />
            <h1>Profile</h1>
          </div>
        </a>
        ):(
          <a href="/login" onClick={() => handlePageChange
            ("Login")}>
            <div className="navTab">
              <img className="icon default" alt="login" src={user} />
              <img
                className="icon hover"
                alt="profileHover"
                src={userHover}
              />
              <h1>Profile</h1>
            </div>
          </a>

        )}

        <a href="/payment" onClick={() => handlePageChange("Payment")}>
          <div className="navTab">
            <img className="icon default" alt="payment" src={payment} />
            <img className="icon hover" alt="paymentHover" src={paymentHover} />
            <h1>Payment</h1>
          </div>
        </a>

        <a href="/documents" onClick={() => handlePageChange("Documents")}>
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

        <a href="/settings" onClick={() => handlePageChange("Settings")}>
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
      </nav>
    </>
  );
}
