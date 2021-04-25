import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Landing from "./components/Landing/Landing";
import "./App.css";
import Dashboard from "./containers/Dashboard/Dashboard";
import SignUpEmail from "./containers/SignUp/SignUpEmail/SignUpEmail";
import SignIn from "./containers/SignIn/SignIn";
import AuthOptions from "./containers/AuthOptions/AuthOptions";
import SignUpPhone from "./containers/SignUp/SignUpPhone/SignUpPhone";
import AuthFailed from "./components/AuthFailed/AuthFailed";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/authFailed" component={AuthFailed} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/auth-options" component={AuthOptions} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup/phone" component={SignUpPhone} />
          <Route path="/signup/email" component={SignUpEmail} />
          <Route path="/signup/google" component={SignUpEmail} />
          <Route path="/" component={Landing} />
        </Switch>
      </div>
    );
  }
}

export default App;
