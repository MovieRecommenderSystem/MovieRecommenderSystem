import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Landing from "./components/Landing/Landing";
import "./App.css";
import SignUp from "./containers/SignUp/SignUp";

class App extends Component {
  render() {
    return (
      <div className="App">
          <Switch>
            <Route path="/signup" component={SignUp} />
            <Route path="/" component={Landing} />
          </Switch>
      </div>
    );
  }
}

export default App;
