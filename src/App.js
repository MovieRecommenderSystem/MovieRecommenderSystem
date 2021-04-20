import React, { Component } from "react";
import { Route } from "react-router-dom";

import Landing from "./components/Landing/Landing";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/" component={Landing}/>
      </div>
    );
  }
}

export default App;
