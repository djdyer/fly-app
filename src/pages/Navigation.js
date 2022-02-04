import React from "react";

export default function Navigation({ currentPage, handlePageChange }) {
  const logo = require("../../src/assets/icons/fly_logo.png");
  const user = require("../../src/assets/icons/user2.png");
  const notifications = require("../../src/assets/icons/notifications2.png");
  const filter = require("../../src/assets/icons/filter.png");
  const search = require("../../src/assets/icons/search.png");
  const settings = require("../../src/assets/icons/settings.png");
  const payment = require("../../src/assets/icons/transfers.png");
  const documents = require("../../src/assets/icons/documents.png");
  const more = require("../../src/assets/icons/plus.png");

  return (
    <>
      {/* Side Nav (Mobile) */}
      <div id="mobileNav">
        <a
          href="#register"
          onClick={() => handlePageChange("Register")}
          className={currentPage === "Register" ? "h1active" : ""}
        >
          <img className="icon" alt="register" src={user} />
        </a>
        <a
          href="#notifications"
          onClick={() => handlePageChange("Notifications")}
          className={currentPage === "Notifications" ? "h1active" : ""}
        >
          <img className="icon" alt="notifications" src={notifications} />
        </a>
      </div>

      {/* Side Nav (Desktop) */}
      <div id="profileNav" className="navigation slide-left">
        <a
          href="#register"
          onClick={() => handlePageChange("Register")}
          className={currentPage === "Register" ? "h1active" : ""}
        >
          <img className="icon" alt="register" src={user} />
        </a>
        <a
          href="#notifications"
          onClick={() => handlePageChange("Notifications")}
          className={currentPage === "Notifications" ? "h1active" : ""}
        >
          <img className="icon" alt="notifications" src={notifications} />
        </a>
        <a
          href="#filter"
          onClick={() => handlePageChange("Filter")}
          className={currentPage === "Filter" ? "h1active" : ""}
        >
          <img className="icon" alt="filter" src={filter} />
        </a>
      </div>

      {/* Main Nav */}
      <nav id="navBlock" className="navigation slide-right">
        <img id="logo" alt="fly-logo" src={logo} />
        <a
          href="#search"
          onClick={() => handlePageChange("Search")}
          className={currentPage === "Search" ? "h1active" : ""}
        >
          <div className="navTab">
            <img className="icon" alt="search" src={search} />
            <h1 className="glow">Search</h1>
          </div>
        </a>
        <a
          href="#settings"
          onClick={() => handlePageChange("Settings")}
          className={currentPage === "Settings" ? "h1active" : ""}
        >
          <div className="navTab">
            <img className="icon" alt="settings" src={settings} />
            <h1 className="glow">Settings</h1>
          </div>
        </a>
        <a
          href="#payment"
          onClick={() => handlePageChange("Payment")}
          className={currentPage === "Payment" ? "h1active" : ""}
        >
          <div className="navTab">
            <img className="icon" alt="payment" src={payment} />
            <h1 className="glow">Payment</h1>
          </div>
        </a>
        <a
          href="#documents"
          onClick={() => handlePageChange("Documents")}
          className={currentPage === "Documents" ? "h1active" : ""}
        >
          <div className="navTab">
            <img className="icon" alt="documents" src={documents} />
            <h1 className="glow">Documents</h1>
          </div>
        </a>
        <a
          href="#more"
          onClick={() => handlePageChange("More")}
          className={currentPage === "More" ? "h1active" : ""}
        >
          <div className="navTab">
            <img className="icon" alt="more" src={more} />
            <h1 className="glow">More</h1>
          </div>
        </a>
      </nav>
    </>
  );
}
