import React, { Component, Suspense } from "react";
import { Switch, Route } from "react-router-dom";

// import Landing from "./components/Landing/Landing";
import "./App.css";
// import Dashboard from "./containers/Dashboard/Dashboard";
// import SignUpEmail from "./containers/SignUp/SignUpEmail/SignUpEmail";
// import SignIn from "./containers/SignIn/SignIn";
// import AuthOptions from "./containers/AuthOptions/AuthOptions";
// import SignUpPhone from "./containers/SignUp/SignUpPhone/SignUpPhone";

const SignUpEmail = React.lazy(() =>
  new Promise((resolve) => setTimeout(resolve, 100)).then(() =>
    import("./containers/SignUp/SignUpEmail/SignUpEmail")
  )
);
const Dashboard = React.lazy(() =>
  new Promise((resolve) => setTimeout(resolve, 100)).then(() =>
    import("./containers/Dashboard/Dashboard")
  )
);
const Landing = React.lazy(() =>
  new Promise((resolve) => setTimeout(resolve, 100)).then(() =>
    import("./components/Landing/Landing")
  )
);
const SignIn = React.lazy(() =>
  new Promise((resolve) => setTimeout(resolve, 100)).then(() =>
    import("./containers/SignIn/SignIn")
  )
);
const AuthOptions = React.lazy(() =>
  new Promise((resolve) => setTimeout(resolve, 100)).then(() =>
    import("./components/AuthOptions/AuthOptions")
  )
);
const SignUpPhone = React.lazy(() =>
  new Promise((resolve) => setTimeout(resolve, 100)).then(() =>
    import("./containers/SignUp/SignUpPhone/SignUpPhone")
  )
);
const Choose = React.lazy(() =>
  new Promise((resolve) => setTimeout(resolve, 100)).then(() =>
    import("./components/Choose/Choose")
  )
);

class App extends Component {
  render() {
    return (
      <div className="App">
        <Suspense fallback={<div className="loader">Loading...</div>}>
          <Switch>
            <Route path="/choose" component={Choose} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/auth-options" component={AuthOptions} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup/phone" component={SignUpPhone} />
            <Route path="/signup/email" component={SignUpEmail} />
            <Route path="/signup/google" component={SignUpEmail} />
            <Route path="/" component={Landing} />
          </Switch>
        </Suspense>
      </div>
    );
  }
}

export default App;
