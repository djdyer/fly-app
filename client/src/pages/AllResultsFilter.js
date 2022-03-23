import React, { useEffect, useState } from "react";
import Auction from "../components/Auction";
import { useQuery } from "@apollo/client";
import { QUERY_AUCTIONS } from "../utils/queries";

export default function AllResultsFilter() {
  const { loading, data, error } = useQuery(QUERY_AUCTIONS);
  const auctionsData = data?.auctions || {};
  const [searchPressed, setsearchPressed] = useState(false);
  const plus = require("../../src/assets/icons/plus.png");
  const plusHover = require("../../src/assets/icons/plus2.png");
  const [filter, setFilter] = useState({
    filterOrigin: "",
    dateOrigin: "",
    filterDestination: "",
    dateDestination: "",
    operator: "",
    aircraft: "",
    cabinSize: "",
  });
  const [filterExtraOptions, setFilterExtraOptions] = useState({
    addService: false,
    addPremiumBar: false,
    addWiFi: false,
  });

  const handleInputSearchChange = (e) => {
    e.preventDefault();
    const { name, value, options, selectedIndex } = e.target;
    setFilter({
      ...filter,
      [name]: value.trim(),
    });
    setFilter({
      ...filter,
      [name]: options[selectedIndex].value,
    });
  };

  const handleClearSearch = () => {
    document.getElementById("operatorDefaultOption").options.selectedIndex = 0;
    document.getElementById("aircraftDefaultOption").options.selectedIndex = 0;
    document.getElementById("cabinSizeDefaultOption").options.selectedIndex = 0;
    document.getElementById("addService").checked = false;
    document.getElementById("addPremiumBar").checked = false;
    document.getElementById("addWiFi").checked = false;
    setFilterExtraOptions({
      addService: false,
      addPremiumBar: false,
      addWiFi: false,
    });
    setFilter({
      filterOrigin: "",
      dateOrigin: "",
      filterDestination: "",
      dateDestination: "",
      operator: "",
      aircraft: "",
      cabinSize: "",
    });
    setsearchPressed(false);
  };

  const handleFilterExtraOptions = (e) => {
    const { name, checked } = e.target;
    setFilterExtraOptions({
      ...filterExtraOptions,
      [name]: checked,
    });
  };
  const handleSeachButton = () => {
    Object.values(filter).every((item) => item === "")
      ? setsearchPressed(false)
      : setsearchPressed(true);
  };

  const searchFilterData = (auctionsData, filter, loading) => {
    if (loading) {
      return;
    } else {
      const afterSearch = auctionsData.filter(
        (obj) => obj.origin.toLowerCase() === filter.filterOrigin.toLowerCase()
      );
      console.log(afterSearch);
      return afterSearch;
    }
  };
  console.log(1111, searchFilterData(auctionsData, filter, loading));
  return (
    <>
      {loading ? null : (
        <div className="filter fade-in">
          <div id="filterContainer">
            <div className="filterRow">
              <h2>Search </h2>
            </div>

            <div className="filterFields">
              <div className="filterRow">
                <input
                  id="filterOrigin"
                  name="filterOrigin"
                  placeholder="ORIGIN"
                  value={filter.filterOrigin}
                  onChange={handleInputSearchChange}
                ></input>
              </div>

              <div className="filterRow">
                <input
                  id="filterDestination"
                  name="filterDestination"
                  placeholder="DESTINATION"
                  value={filter.filterDestination}
                  onChange={handleInputSearchChange}
                ></input>
              </div>

              <div className="filterRow">
                <input
                  type="date"
                  className="calendar"
                  name="dateDestination"
                  value={filter.dateDestination}
                  onChange={handleInputSearchChange}
                ></input>
              </div>
            </div>

            <div className="filterBody">
              <div className="filterRow">
                <div className="filterColumn">
                  <h5>Aircraft</h5>
                  <h5>Operator</h5>
                  <h5>Cabin Size</h5>
                </div>
                <div className="filterColumn">
                  <form id="filterAircraft">
                    <select
                      onChange={handleInputSearchChange}
                      id="aircraftDefaultOption"
                      name="aircraft"
                    >
                      <option value="">All</option>
                      {auctionsData
                        .map((auction) => (
                          <option key={auction._id} value={auction.aircraft}>
                            {auction.aircraft}
                          </option>
                        ))
                        .filter(
                          (value, index, self) => self.indexOf(value) === index
                        )}
                    </select>
                  </form>
                  <form id="filterOperator">
                    <select
                      onChange={handleInputSearchChange}
                      id="operatorDefaultOption"
                      name="operator"
                    >
                      <option value="">All</option>
                      {auctionsData
                        .map((auction) => (
                          <option key={auction._id} value={auction.operator}>
                            {auction.operator}
                          </option>
                        ))
                        .filter(
                          (value, index, self) => self.indexOf(value) === index
                        )}
                    </select>
                  </form>
                  <form id="filterCabinSize">
                    <select
                      onChange={handleInputSearchChange}
                      id="cabinSizeDefaultOption"
                      name="cabinSize"
                    >
                      <option value="">All</option>
                      <option value=">20">{`\>`} 20</option>
                      <option value="11-19">11-19</option>
                      <option value="<10">{`\<`} 10 </option>
                    </select>
                  </form>
                </div>
              </div>
              <div className="filterRow">
                <div className="filterColumn">
                  <div>
                    <input
                      type="checkbox"
                      id="addService"
                      name="addService"
                      onChange={handleFilterExtraOptions}
                    ></input>
                    <label htmlFor="addService">In-Flight Service</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="addPremiumBar"
                      name="addPremiumBar"
                      onChange={handleFilterExtraOptions}
                    ></input>
                    <label htmlFor="addPremiumBar">Premium Bar</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="addWiFi"
                      name="addWiFi"
                      onChange={handleFilterExtraOptions}
                    ></input>
                    <label htmlFor="addWiFi">WiFi</label>
                  </div>
                </div>
              </div>
            </div>
            <div id="searchClear">
              <button onClick={handleClearSearch}>
                <div id="clearFlex">
                  <h3>CLEAR</h3>
                  <a>
                    <img
                      id="clearSearch"
                      className="icon default"
                      alt="plus"
                      src={plus}
                    />
                    <img
                      id="clearSearch2"
                      className="icon hover"
                      alt="plus hover"
                      src={plusHover}
                    />
                    {/* <FontAwesomeIcon icon="fa-solid fa-x" /> */}
                  </a>
                </div>
              </button>

              <button
                className="shadow-pop-br"
                id="searchBtn"
                onClick={handleSeachButton}
              >
                <h1>SEARCH</h1>
              </button>
            </div>

            <div id="resultsHeader">
              <h2>AUCTIONS:</h2>
            </div>

            <div id="filteredResults">
              {/* {searchPressed ? auctionsData.map((auction) => { 
                return <Auction key={auction._id} auction={auction}}) :  */}

              {!searchPressed ? (
                auctionsData.map((auction) => {
                  return <Auction key={auction._id} auction={auction} />;
                  // if (Object.values(filter).every((item) => item === "")) {
                  //   return <Auction key={auction._id} auction={auction} />;
                  // } else if (
                  //   // filter.filterOrigin.toLowerCase() ===
                  //   // auction.origin.toLowerCase() ||
                  //   // filter.filterDestination.toLowerCase() ===
                  //   // auction.destination.toLowerCase() ||
                  //   // filter.aircraft === auction.aircraft ||
                  //   // filter.operator === auction.operator ||
                  //   // new Date(filter.dateOrigin).toLocaleDateString() ===
                  //   // new Date(+auction.flightDate).toLocaleDateString() ||
                  //   // new Date(filter.dateDestination).toLocaleDateString() ===
                  //   // new Date(+auction.flightDate).toLocaleDateString()
                  // ) {
                  //   return <Auction key={auction._id} auction={auction} />;
                  // }
                })
              ) : true ? (
                searchFilterData(auctionsData, filter, loading).map(
                  (auction) => {
                    return <Auction key={auction._id} auction={auction} />;
                  }
                )
              ) : (
                <h1 style={{ color: "red" }}>No results</h1>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
