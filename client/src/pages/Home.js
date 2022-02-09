import FlyMap from "../components/FlyMap";
import TopResults from "./TopResults";
import SearchFields from "./SearchFields";
import Signup from "./Signup";
import Login from "./Login";
import AuctionDetail from "./AuctionDetail";
import AllResultsFilter from "./AllResultsFilter";

function Home() {
  return (
    <div>
      <AllResultsFilter />
      {/* <AuctionDetail /> */}
      {/* <Signup /> */}
      {/* <Login /> */}
      {/* <TopResults /> */}
      {/* <SearchFields /> */}
      <FlyMap />
    </div>
  );
}

export default Home;
