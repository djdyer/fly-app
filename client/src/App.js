import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';

import Home from "./pages/Home";
import Navigation from "./pages/Navigation";



function App() {
  return (
    <div>
      <Router>

        <Navigation />
        <Switch>
          <Route exact path='/' component={Home} />
          {/* <Route exact path='/search' component={Search} />
          <Route exact path='/settings' component={Settings} />
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

      <Home />







    </div>
  );
}

export default App;
