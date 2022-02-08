import FlyMap from "../components/FlyMap";
import TopResults from "./TopResults";
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
      {/* <TopResults /> */}
      {/* <SearchFields /> */}
      <FlyMap />
    </div>
  );
}

export default Home;
