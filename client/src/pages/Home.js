import FlyMap from "../components/FlyMap";
import SearchResults from "./SearchResults";
import SearchFields from "./SearchFields";
import Signup from "./Signup";
import Login from "./Login";
import Auction from "./Auction";

function Home() {
  return (
    <div>
      <Auction />
      {/* <Signup /> */}
      {/* <Login /> */}
      {/* <SearchResults /> */}
      {/* <SearchFields /> */}
      <FlyMap />
    </div>
  );
}

export default Home;
