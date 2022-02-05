import FlyMap from "../components/Map";
import Results from "./Results";
import SearchFields from "./SearchFields";

function SearchResults() {
  return (
    <div>
      <Results/>
         <SearchFields/>
      <FlyMap />
   
    </div>
  );
}

export default SearchResults;
