import React from "react";

function SearchResults() {
  const plane = require("../../src/assets/icons/plane.png");
  const more = require("../../src/assets/icons/more.png");
  const moreHover = require("../../src/assets/icons/more2.png");

  return (
    <div className="allResultsContainer">
      <div className="allResults">
        <a href="result1">
          <div id="result">
            <div id="header1">
              <div id="trip">
                <h2>Origin</h2>
                <img className="planeIcon" alt="plane icon" src={plane} />
                <h2>Destination</h2>
              </div>

              <div id="costDetail">
                <h2>$ Cost</h2>
                <img
                  className="icon default"
                  id="moreBtn"
                  alt="more button"
                  src={more}
                />
                <img
                  className="icon hover"
                  id="moreBtn"
                  alt="more button hover"
                  src={moreHover}
                />
              </div>
            </div>

            <div id="planeImg1">
              <div id="header2">
                <h3>Flight Num:</h3>
                <h3>Cabin Size:</h3>
                <h3>Date/Time:</h3>
              </div>
            </div>
          </div>
        </a>

        <a href="result2">
          <div id="result">
            <div id="header1">
              <div id="trip">
                <h2>Origin</h2>
                <img className="planeIcon" alt="plane icon" src={plane} />
                <h2>Destination</h2>
              </div>

              <div id="costDetail">
                <h2>$ Cost</h2>
                <img
                  className="icon default"
                  id="moreBtn"
                  alt="more button"
                  src={more}
                />
                <img
                  className="icon hover"
                  id="moreBtn"
                  alt="more button hover"
                  src={moreHover}
                />
              </div>
            </div>

            <div id="planeImg2">
              <div id="header2">
                <h3>Flight Num:</h3>
                <h3>Cabin Size:</h3>
                <h3>Date/Time:</h3>
              </div>
            </div>
          </div>
        </a>

        <a href="result3">
          <div id="result">
            <div id="header1">
              <div id="trip">
                <h2>Origin</h2>
                <img className="planeIcon" alt="plane icon" src={plane} />
                <h2>Destination</h2>
              </div>

              <div id="costDetail">
                <h2>$ Cost</h2>
                <img
                  className="icon default"
                  id="moreBtn"
                  alt="more button"
                  src={more}
                />
                <img
                  className="icon hover"
                  id="moreBtn"
                  alt="more button hover"
                  src={moreHover}
                />
              </div>
            </div>

            <div id="planeImg3">
              <div id="header2">
                <h3>Flight Num:</h3>
                <h3>Cabin Size:</h3>
                <h3>Date/Time:</h3>
              </div>
            </div>
          </div>
        </a>
      </div>
    
    </div>
  );
}

export default SearchResults;
