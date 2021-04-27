import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";

import NavItem from "./NavItem/NavItem";
import Logo from "../UI/Logo/Logo";
import classes from "./NavBar.module.css";
import axios from "../../axios-auth";

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
    axios.post("/api/search", this.state.searchQuery).then((response) => {
      console.log(response.data);
    });
  };

  render() {
    return (
      <div className={classes.NavBar}>
        <NavLink to="/" className={classes.NavLink}>
          <Logo />
        </NavLink>
        {this.props.location.pathname === "/dashboard" && (
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
          {this.props.location.pathname === "/dashboard" && (
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
          {this.props.location.pathname === "/dashboard" && (
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

export default withRouter(NavBar);
