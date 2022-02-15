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

import Auth from "./utils/auth";
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
        <Navigation />
        <FlyMap />
        <Switch>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/" component={Home} />
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/search">
            <AllResultsFilter />
          </Route>
          <Route exact path="/auctiondetail/:id">
            <AuctionDetail />
          </Route>
          <Route exact path="/payment">
            <Payment />
          </Route>
          {/* <Route exact path='/settings' component={Settings} />
          <Route exact path='/payment' component={Payment} />
          <Route exact path='/documents' component={Documents} />
          <Route exact path='/more' component={More} />
          <Route exact path='/notifications' component={Notifications} />
          <Route exact path='/filter' component={Filter} /> */}
          <Route
            render={function () {
              return <h1>Not Found</h1>;
            }}
          />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
