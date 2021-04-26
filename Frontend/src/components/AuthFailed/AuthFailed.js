import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Aux from "../../hoc/Aux/Aux";

class AuthFailed extends Component {
  componentDidUnmount() {
    this.props.onErrorFalse();
  }
  render() {
    return (
      <Aux>
        {this.props.error ? (
          <h1>Error!</h1>
        ) : (
          <Redirect from="/authFailed" to="/" />
        )}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onErrorFalse: () => dispatch({ type: "False_Error" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthFailed);
