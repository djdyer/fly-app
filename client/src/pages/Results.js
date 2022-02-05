import React from 'react';

function Results() {
    const plane = require("../../src/assets/icons/plane.png");
    const more = require("../../src/assets/icons/more.png");

  return <div>


    <div className="allResults">

      <div id="result">
        <div id="header1">
          <div id="trip">
            <h2>Origin</h2>
            <img className="planeIcon" src={plane}/>
            <h2>Destination</h2>
          </div>

          <div id="costDetail">
            <h2>$ Cost</h2>
            <img className="icon" id="moreBtn" src={more} />
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

      <div id="result">
        <div id="header1">
          <div id="trip">
            <h2>Origin</h2>
            <img className="planeIcon" src={plane} />
            <h2>Destination</h2>
          </div>

          <div id="costDetail">
            <h2>$ Cost</h2>
            <img className="icon" id="moreBtn" src={more} />
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

      <div id="result">
        <div id="header1">
          <div id="trip">
            <h2>Origin</h2>
            <img className="planeIcon" src={plane} />
            <h2>Destination</h2>
          </div>

          <div id="costDetail">
            <h2>$ Cost</h2>
            <img className="icon" id="moreBtn" src={more} />
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
    </div>

    <main>
      <div id="map"></div>
    </main>
  </div>;
}

export default Results;
