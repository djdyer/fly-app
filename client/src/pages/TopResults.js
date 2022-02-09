import React, { useEffect, useState } from "react";
import Auction from "../components/Auction";
import { useQuery } from "@apollo/client";
import {QUERY_AUCTIONS} from "../utils/queries"

function TopResults() {
    const { data } = useQuery(QUERY_AUCTIONS);


  return (
    <div className="topResultsContainer">
      <div className="topResults">
   {data?.auctions.map((auction)=>{
     return  <Auction key={auction._id} auction={auction}/>
   })}
   
     </div>
    </div>
  );
}

export default TopResults;
