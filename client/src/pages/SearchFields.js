import React from "react";

function SearchFields() {
  return (
    <div>
      <div id="searchFields" className="slide-down">
        <input className="shadow-pop-br" placeholder="ATLANTA" id="origin"  type="text"/>

        <input
          className="shadow-pop-br"
          placeholder="DESTINATION"
          id="destination"
          type="text"
        />

        <button className="shadow-pop-br" id="searchBtn">
          <h1>SEARCH</h1>
        </button>
      </div>
    </div>
  );
}

export default SearchFields;
