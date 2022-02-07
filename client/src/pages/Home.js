import FlyMap from "../components/Map";
import SearchResults from "./SearchResults";
import SearchFields from "./SearchFields";
import Signup from "./Signup";
import Login from "./Login";

function Home() {
  return (
    <div>
      <Signup />
      {/* <Login /> */}
      <SearchResults />
      <SearchFields />
      <FlyMap />
    </div>
  );
}

export default Home;
