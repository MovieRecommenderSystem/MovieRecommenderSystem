import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import NavItem from "./NavItem/NavItem";
import Logo from "../UI/Logo/Logo";
import classes from "./NavBar.module.css";
import menuImg from "../../assets/menu.svg";

class NavBar extends Component {
  state = {
    focus: false,
    search: "",
  };

  onFocusHandler = () => {
    this.setState({
      focus: !this.state.focus,
    });
  };

  onSearchChangeHandler = (event) => {
    this.setState({
      search: event.target.value,
    });
  };

  submitQueryHandler = (query) => {
    this.props.setQuery(query);
    this.props.history.push("/search-results/" + this.state.search);
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
          this.props.match.path === "/search-results/:query" ||
          this.props.match.path === "/movie/:id") && (
          <div
            className={
              classes.SearchParent +
              " " +
              (this.state.focus && classes.Active) +
              " " +
              classes.NotOnMobile
            }
            onFocus={this.onFocusHandler}
            onBlur={this.onFocusHandler}
          >
            <i
              onClick={() => this.submitQueryHandler(this.state.search)}
              className="fas fa-search"
            ></i>
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
            this.props.match.path === "/search-results/:query" ||
            this.props.match.path === "/movie/:id") && (
            <NavItem link="/watchlist">
              <button className={classes.Button + " " + classes.NotOnMobile}>
                Watchlist
              </button>
            </NavItem>
          )}
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
            this.props.match.path === "/search-results/:query" ||
            this.props.match.path === "/movie/:id") && (
            <NavItem link="/profile">
              <button
                id="profile"
                className={classes.Button + " " + classes.NotOnMobile}
              >
                <i className="fas fa-user-circle"></i>
              </button>
            </NavItem>
          )}
        </ul>
        {/* {(this.props.location.pathname === "/dashboard" ||
          this.props.match.path === "/search-results/:query" ||
          this.props.match.path === "/movie/:id") && (
          <div
            className={
              classes.SearchParent +
              " " +
              (this.state.focus && classes.Active) +
              " " +
              classes.OnMobile
            }
            onFocus={this.onFocusHandler}
            onBlur={this.onFocusHandler}
          >
            <i
              onClick={() => this.submitQueryHandler(this.state.search)}
              className="fas fa-search"
            ></i>
            <input
              className={classes.Search}
              id="Search"
              placeholder="Search for a movie"
              name="Search"
              value={this.state.Search}
              onChange={this.onSearchChangeHandler}
            />
          </div>
        )} */}
        {(this.props.location.pathname === "/dashboard" ||
          this.props.match.path === "/search-results/:query" ||
          this.props.match.path === "/movie/:id") && (
          <img src={menuImg} alt="Hamburger" className={classes.OnMobile} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth, query: state.query };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setQuery: (query) => dispatch({ type: "Set_Query", query: query }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavBar));
