import FlyMap from "../components/Map";
import SearchResults from "./SearchResults";
import SearchFields from "./SearchFields";

function Home() {
  return (
    <div>
      <SearchResults />
      <SearchFields />
      <FlyMap />
    </div>
  );
}

export default Home;
