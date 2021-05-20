import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Zoom from "react-reveal/Zoom";

import NavItem from "./NavItem/NavItem";
import Logo from "../UI/Logo/Logo";
import classes from "./NavBar.module.css";
import menuImg from "../../assets/menu.svg";
import Backdrop from "../UI/Backdrop/Backdrop";
import Aux from "../../hoc/Aux/Aux";
import Sidedrawer from "./Sidedrawer/Sidedrawer";

class NavBar extends Component {
  state = {
    focus: false,
    search: "",
    showMobileSearch: false,
    showSideDrawer: false,
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

  submitQueryMobileHandler = (query) => {
    if (!this.state.showMobileSearch) {
      this.setState({ showMobileSearch: true });
      return;
    }
    this.props.setQuery(query);
    this.setState({ showMobileSearch: false });
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
            onKeyPress={(event) =>
              event.key === "Enter"
                ? this.submitQueryHandler(this.state.search)
                : null
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
            <NavItem link="/logout">
              <button
                className={classes.Button + " " + classes.NotOnMobile}
                onClick={() => window.location.reload()}
              >
                Logout
              </button>
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
        {(this.props.location.pathname === "/dashboard" ||
          this.props.match.path === "/search-results/:query" ||
          this.props.match.path === "/movie/:id") && (
          <div>
            <i
              onClick={() => this.submitQueryMobileHandler(this.state.search)}
              className={"fas fa-search " + classes.OnMobile}
              style={{ color: "white", fontSize: "6vw" }}
            ></i>
            {this.state.showMobileSearch && (
              <Aux>
                <Backdrop
                  hideTrailer={() => this.setState({ showMobileSearch: false })}
                />
                <Zoom>
                  <div
                    className={
                      classes.SearchParent +
                      " " +
                      classes.OnMobile +
                      " " +
                      (this.state.focus && classes.Active)
                    }
                    onKeyPress={(event) =>
                      event.key === "Enter"
                        ? this.submitQueryMobileHandler(this.state.search)
                        : null
                    }
                    onFocus={this.onFocusHandler}
                    onBlur={this.onFocusHandler}
                  >
                    <i
                      onClick={() =>
                        this.submitQueryMobileHandler(this.state.search)
                      }
                      className="fas fa-search"
                    ></i>
                    <input
                      className={classes.Search}
                      id="Search"
                      placeholder="Search for a movie"
                      name="Search"
                      autoFocus
                      value={this.state.Search}
                      onChange={this.onSearchChangeHandler}
                    />
                  </div>
                </Zoom>
              </Aux>
            )}
          </div>
        )}

        {(this.props.location.pathname === "/dashboard" ||
          this.props.match.path === "/search-results/:query" ||
          this.props.match.path === "/movie/:id") && (
          <img
            src={menuImg}
            alt="Hamburger"
            className={classes.OnMobile}
            onClick={() =>
              this.setState({ showSideDrawer: !this.state.showSideDrawer })
            }
          />
        )}
        {/* // <Zoom> */}
        <Sidedrawer show={this.state.showSideDrawer} />
        {/* // </Zoom> */}
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
