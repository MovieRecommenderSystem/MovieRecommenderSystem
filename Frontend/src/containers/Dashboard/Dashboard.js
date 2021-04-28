import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Aux from "../../hoc/Aux/Aux.js";
import Footer from "../../components/UI/Footer/Footer";
import NavBar from "../../components/Navigation/NavBar";

class Dashboard extends Component {

  state={
    
  }

  render() {
    return this.props.auth ? (
      <Aux>
        <NavBar />

        <Footer />
      </Aux>
    ) : (
      <Redirect from="/dashboard" to="/signin" />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(Dashboard);
