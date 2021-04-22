import React from "react";
import { NavLink, withRouter } from "react-router-dom";

import NavItem from "./NavItem/NavItem";
import Logo from "../UI/Logo/Logo";
import classes from "./NavBar.module.css";

const NavBar = (props) => {
  return (
    <div className={classes.NavBar}>
      <NavLink to="/" className={classes.NavLink}>
        <Logo />
      </NavLink>
      <ul className={classes.NavItems}>
        <NavItem link="/premium">
          <button className={classes.Button + " " + classes.Plus}>
            Get Plus
          </button>
        </NavItem>
        {props.location.pathname === "/signin" && (
          <NavItem link="/auth-options">
            <button className={classes.Button}>Sign Up</button>
          </NavItem>
        )}
        {(props.location.pathname === "/" ||
          props.location.pathname === "/signup/email" ||
          props.location.pathname === "/auth-options" ||
          props.location.pathname === "/signup/phone") && (
          <NavItem link="/signin">
            <button className={classes.Button}>Sign In</button>
          </NavItem>
        )}
      </ul>
    </div>
  );
};

export default withRouter(NavBar);
