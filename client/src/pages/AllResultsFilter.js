import React, {useState} from "react";
import Auction from "../components/Auction";
import { useQuery } from "@apollo/client";
import { QUERY_AUCTIONS } from "../utils/queries";

export default function AllResultsFilter() {
  const { loading, data, error } = useQuery(QUERY_AUCTIONS);
  // const auctionsData = data?.auctions || {};
// console.log(auctionsData)

  const search = require("../../src/assets/icons/search2.png");
  const [filter, setFilter] = useState({filterOrigin: "", dateOrigin: "", filterDestination: "", dateDestination: ""});
 
  const handleInputSearchChange = (e) => {
    e.preventDefault();
      const { name, value } = e.target;
      setFilter({
        ...filter,
        [name]: value,
      });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

  }
  const handleClearSearch = (e) => {
    e.preventDefault();
    setFilter({filterOrigin: "", dateOrigin: "", filterDestination: "", dateDestination: ""})
  }

console.log(filter)

  return (
    <>
      {loading ? (
        null
      ) : (
        <div className="filter slide-left">
          <div id="filterContainer">
            <div className="filterRow">
              <img id="searchIcon" className="icon" alt="search" src={search} />
              <h2>Search </h2>
            </div>

            <div className="filterFields">
              <div className="filterRow">
                <input id="filterOrigin" name="filterOrigin" placeholder="Origin" value={filter.origin} onChange={handleInputSearchChange}></input>
                <input type="date" name="dateOrigin" value={filter.originDate} onChange={handleInputSearchChange}></input>
              </div>

              <div className="filterRow">
                <input id="filterDestination" name="filterDestination" placeholder="Destination" value={filter.destination} onChange={handleInputSearchChange}></input>
                <input type="date" name="dateDestination" value={filter.destiantionDate} onChange={handleInputSearchChange}></input>
              </div>
            </div>

            <div className="filterBody">
              <div className="filterRow">
                <div className="filterColumn">
                  <h5>Aircraft:</h5>
                  <h5>Operator:</h5>
                  <h5>Cabin Size:</h5>
                </div>
                <div className="filterColumn">
                  <form id="filterAircraft">
                    <select>
                      <option value="Aerion">Aerion</option>
                      <option value="Airbus">Airbus</option>
                      <option value="Bombardier">Bombardier</option>
                      <option value="Cessna">Cessna</option>
                      <option value="Cirrus">Cirrus</option>
                      <option value="Dassault Falcon">Dassault Falcon</option>
                      <option value="Eclipse">Eclipse</option>
                      <option value="Embraer Legacy">Embraer Legacy</option>
                      <option value="Gulfstream">Gulfstream</option>
                      <option value="Hawker">Hawker</option>
                      <option value="Honda Jet">Honda Jet</option>
                      <option value="King Air">King Air</option>
                      <option value="Learjet">Learjet</option>
                      <option value="Pilatus">Pilatus</option>
                    </select>
                  </form>
                  <form id="filterOperator">
                    <select>
                      <option value="NetJets Inc.">NetJets Inc.</option>
                      <option value="Flexjet">Flexjet</option>
                      <option value="Vista Global Holding">
                        Vista Global Holding
                      </option>
                      <option value="Fly Exclusive">Fly Exclusive</option>
                      <option value="Jet Linx">Jet Linx</option>
                      <option value="PlaneSense">PlaneSense</option>
                      <option value="Jet Edge">Jet Edge</option>
                      <option value="Solairus Aviation">Solairus Aviation</option>
                      <option value="Airshare">Airshare</option>
                      <option value="Nicholas Air">Nicholas Air</option>
                      <option value="AirSprint">AirSprint</option>
                      <option value="Thrive Aviation">Thrive Aviation</option>
                      <option value="Aero Air">Aero Air</option>
                      <option value="Worldwide Jet Charter">
                        Worldwide Jet Charter
                      </option>
                      <option value="Jet Access">Jet Access</option>
                    </select>
                  </form>
                  <form id="filterCabinSize">
                    <select>
                      <option value="16 or more">{`\>`} 20</option>
                      <option value="10-15">11-19</option>
                      <option value="5-10">{`\<`} 10 </option>
                    </select>
                  </form>
                </div>
              </div>
              <div className="filterRow">
                <div className="filterColumn">
                  <h5>In-Flight Service:</h5>
                  <h5>Premium Bar:</h5>
                  <h5>WiFi:</h5>
                </div>
                <div className="filterColumn">
                  <input type="checkbox" id="addService"></input>
                  <input type="checkbox" id="addPremiumBar"></input>
                  <input type="checkbox" id="addWiFi"></input>
                </div>
              </div>
            </div>

            <button className="shadow-pop-br" id="searchBtn"  onClick={handleSearchSubmit}>
              <h1>SEARCH</h1>
            </button>
            <button onClick={handleClearSearch}>
              <h1>Clear search</h1>
            </button>
            
            <div id="resultsHeader">
              <h2>All Auctions:</h2>
            </div>

            <div id="filteredResults">
              {data?.auctions.map((auction) => {
                return <Auction key={auction._id} auction={auction} />;
              })}
            </div>
          </div>
        </div>)}
    </>
  );
}
