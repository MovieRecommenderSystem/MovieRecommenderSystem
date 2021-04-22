import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Landing from "./components/Landing/Landing";
import "./App.css";
import SignUpEmail from "./containers/SignUp/SignUpEmail/SignUpEmail";
import SignIn from "./containers/SignIn/SignIn";
import AuthOptions from "./containers/AuthOptions/AuthOptions";
import SignUpPhone from "./containers/SignUp/SignUpPhone/SignUpPhone";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
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
