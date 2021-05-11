import React, { Component, Suspense } from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";

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
const SearchResults = React.lazy(() =>
  new Promise((resolve) => setTimeout(resolve, 100)).then(() =>
    import("./containers/SearchResults/SearchResults")
  )
);
const Movie = React.lazy(() =>
  new Promise((resolve) => setTimeout(resolve, 100)).then(() =>
    import("./containers/Movie/Movie")
  )
);

class App extends Component {
  render() {
    return (
      <div className="App">
        <Suspense fallback={<div className="loader">Loading...</div>}>
          <Switch>
            <Route path="/movie/:id" component={Movie} />
            <Route path="/search-results" component={SearchResults} />
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
