import React, { useEffect, useState } from "react";
import Auction from "../components/Auction";
import { useQuery } from "@apollo/client";
import { QUERY_AUCTIONS } from "../utils/queries";
import searchFilterData from "../utils/allResultsFilterSearch";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../style/datePicker.css";
let freezSearchValues = {
  filterOrigin: "",
  filterDestination: "",
  dateDestination: "",
  operator: "",
  aircraft: "",
  cabinSize: "",
};

export default function AllResultsFilter() {
  const { loading, data, error } = useQuery(QUERY_AUCTIONS);
  const auctionsData = data?.auctions || {};

  const plus = require("../../src/assets/icons/plus.png");
  const plusHover = require("../../src/assets/icons/plus2.png");
  const calendar = require("../../src/assets/icons/calendar.png");

  const [searchPressed, setsearchPressed] = useState(false);

  const [filter, setFilter] = useState({
    filterOrigin: "",
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
  const [selectedDate, setSelectedDate] = useState("");

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setsearchPressed(false);
  };
  filter.dateDestination = selectedDate;

  const handleInputSearchChange = (e) => {
    e.preventDefault();
    setsearchPressed(false);
    const { name, value, options, selectedIndex } = e.target;
    setFilter({
      ...filter,
      [name]: value.trim(),
    });
    if (options) {
      setFilter({
        ...filter,
        [name]: options[selectedIndex].value,
      });
    }
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
      filterDestination: "",
      dateDestination: "",
      operator: "",
      aircraft: "",
      cabinSize: "",
    });
    setsearchPressed(false);
    setSelectedDate("");

    freezSearchValues = {
      filterOrigin: "",
      filterDestination: "",
      dateDestination: "",
      operator: "",
      aircraft: "",
      cabinSize: "",
    };
  };

  const handleFilterExtraOptions = (e) => {
    e.preventDefault();
    setsearchPressed(false);
    const { name, checked } = e.target;
    setFilterExtraOptions({
      ...filterExtraOptions,
      [name]: checked,
    });
  };

  const serachParameters = () => {
    if (searchPressed) {
      freezSearchValues = { ...filter };
      return freezSearchValues;
    } else {
      return freezSearchValues;
    }
  };

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
                <DatePicker
                  selected={filter.dateDestination}
                  onSelect={handleDateSelect}
                  placeholderText="DATE"
                  minDate={new Date()}
                  calendarIcon={calendar}
                />

                <div id="calendarIcon">
                  <img className="icon default" alt="calendar" src={calendar} />
                </div>
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
                      <option value="10-20">10-20</option>
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
                    <label htmlFor="addService">
                      <h5>In-Flight Service</h5>
                    </label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="addPremiumBar"
                      name="addPremiumBar"
                      onChange={handleFilterExtraOptions}
                    ></input>
                    <label htmlFor="addPremiumBar">
                      <h5>Premium Bar</h5>
                    </label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="addWiFi"
                      name="addWiFi"
                      onChange={handleFilterExtraOptions}
                    ></input>
                    <label htmlFor="addWiFi">
                      <h5>WiFi</h5>
                    </label>
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
                  </a>
                </div>
              </button>

              <button
                className="shadow-pop-br"
                id="searchBtn"
                onClick={() => setsearchPressed(true)}
              >
                <h1>SEARCH</h1>
              </button>
            </div>

            <div id="resultsHeader">
              <h2>AUCTIONS:</h2>
            </div>

            <div id="filteredResults">
              {!searchPressed ? (
                searchFilterData(auctionsData, serachParameters()).map(
                  (auction) => {
                    return <Auction key={auction._id} auction={auction} />;
                  }
                )
              ) : searchPressed &&
                searchFilterData(auctionsData, serachParameters()).length >
                  0 ? (
                searchFilterData(auctionsData, serachParameters()).map(
                  (auction) => {
                    return <Auction key={auction._id} auction={auction} />;
                  }
                )
              ) : (
                <div id="filterResultsError">
                  <h2>NO RESULTS</h2>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
