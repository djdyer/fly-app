import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// import Auth from "./utils/auth";
import Home from "./pages/Home";
import Navigation from "./pages/Navigation";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AuctionDetail from "./pages/AuctionDetail";
import AllResultsFilter from "./pages/AllResultsFilter";
import FlyMap from "./components/FlyMap";
import Profile from "./pages/Profile";
import Payment from "./pages/Payment";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <FlyMap />
        <Navigation />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/search" component={AllResultsFilter} />
          <Route exact path="/auctiondetail/:id" component={AuctionDetail} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/payment" component={Payment} />
          <Route render={() => <h1>Not Found!</h1>} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
