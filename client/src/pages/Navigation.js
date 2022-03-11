import React from "react";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";

const logo = require("../../src/assets/icons/fly_logo.png");
const user = require("../../src/assets/icons/user.png");
const userHover = require("../../src/assets/icons/user2.png");
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

export default function Navigation() {
  return (
    <>
      <div id="mobileNav">
        <Link to="/" >
          <img id="mobileLogo" alt="home" src={logo} />
        </Link>
      </div>

      {/* Main Nav */}
      <nav id="navBlock" className="navigation slide-right">
        <Link to="/">
          <img id="logo" alt="fly-logo" src={logo} />
        </Link>
        <a >
          <Link to="/search">
            <div className="navTab">
              <img className="icon default search" alt="search" src={search} />
              <img
                className="icon hover search"
                alt="searchHover"
                src={searchHover}
              />
              <h1>Search</h1>
            </div>
          </Link>
        </a>
        {Auth.loggedIn() ? (
          <a>
            <Link to="/profile">
              <div className="navTab">
                <img className="icon default" alt="profile" src={logout} />
                <img
                  className="icon hover"
                  alt="profileHover"
                  src={logoutHover}
                />
                <h1>Profile</h1>
              </div>
            </Link>
          </a>
        ) : (
          <a>
            <Link to="/login">
              <div className="navTab">
                <img className="icon default" alt="login" src={user} />
                <img className="icon hover" alt="profileHover" src={userHover} />
                <h1>Profile</h1>
              </div>
            </Link>
          </a>
        )}

        <a>
          <Link to="/payment">
            <div className="navTab">
              <img className="icon default" alt="payment" src={payment} />
              <img className="icon hover" alt="paymentHover" src={paymentHover} />
              <h1>Payment</h1>
            </div>
          </Link>
        </a>

        <a>
          <Link to="/documents">
            <div className="navTab">
              <img className="icon default" alt="documents" src={documents} />
              <img
                className="icon hover"
                alt="documentsHover"
                src={documentsHover}
              />
              <h1>Documents</h1>
            </div>
          </Link>
        </a>

        <a>
          <Link to="/settings">
            <div className="navTab">
              <img
                className="icon default settings"
                alt="settings"
                src={settings}
              />
              <img
                className="icon hover settings"
                alt="settingsHover"
                src={settingsHover}
              />
              <h1>Settings</h1>
            </div>
          </Link>
        </a>
      </nav>
    </>
  );
}
