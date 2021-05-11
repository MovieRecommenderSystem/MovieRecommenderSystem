import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import NavItem from "./NavItem/NavItem";
import Logo from "../UI/Logo/Logo";
import classes from "./NavBar.module.css";

class NavBar extends Component {
  state = {
    focus: false,
    searchQuery: "",
  };

  onFocusHandler = () => {
    this.setState({
      focus: !this.state.focus,
    });
  };

  onSearchChangeHandler = (event) => {
    this.setState({
      searchQuery: event.target.value,
    });
  };

  submitQueryHandler = () => {
    this.props.history.replace({
      pathname: "/search-results",
      search: "?search=" + this.state.searchQuery,
    });
  };

  render() {
    return (
      <div className={classes.NavBar}>
        <NavLink
          to={this.props.auth ? "/dashboard" : "/"}
          className={classes.NavLink}
        >
          <Logo />
        </NavLink>
        {(this.props.location.pathname === "/dashboard" ||
          this.props.location.pathname === "/search-results" ||
          this.props.match.path === "/movie/:id") && (
            <div
              className={
                classes.SearchParent + " " + (this.state.focus && classes.Active)
              }
              onFocus={this.onFocusHandler}
              onBlur={this.onFocusHandler}
            >
              <i onClick={this.submitQueryHandler} className="fas fa-search"></i>
              <input
                className={classes.Search}
                id="Search"
                placeholder="Search for a movie"
                name="Search"
                value={this.state.Search}
                onChange={this.onSearchChangeHandler}
              />
            </div>
          )}
        <ul className={classes.NavItems}>
          {(this.props.location.pathname === "/dashboard" ||
            this.props.location.pathname === "/search-results" ||
            this.props.match.path === "/movie/:id") && (
              <NavItem link="/watchlist">
                <button className={classes.Button}>Watchlist</button>
              </NavItem>
            )}
          <NavItem link="/premium">
            <button className={classes.Button + " " + classes.Plus}>
              Get Plus
            </button>
          </NavItem>
          {this.props.location.pathname === "/signin" && (
            <NavItem link="/auth-options">
              <button className={classes.Button}>Sign Up</button>
            </NavItem>
          )}
          {(this.props.location.pathname === "/" ||
            this.props.location.pathname === "/signup/email" ||
            this.props.location.pathname === "/auth-options" ||
            this.props.location.pathname === "/signup/phone" ||
            this.props.location.pathname === "/choose") && (
              <NavItem link="/signin">
                <button className={classes.Button}>Sign In</button>
              </NavItem>
            )}
          {(this.props.location.pathname === "/dashboard" ||
            this.props.location.pathname === "/search-results" ||
            this.props.match.path === "/movie/:id") && (
              <NavItem link="/profile">
                <button id="profile" className={classes.Button}>
                  <i className="fas fa-user-circle"></i>
                </button>
              </NavItem>
            )}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(withRouter(NavBar));
