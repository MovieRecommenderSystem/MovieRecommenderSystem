import React from "react";

import NavItem from "./NavItem/NavItem";
import { Route } from "react-router-dom";
import Logo from "../UI/Logo/Logo";
import classes from "./NavBar.module.css";

const NavBar = (props) => {
    return (
        <div className={classes.NavBar}>
            <Logo />
            <ul className={classes.NavItems}>
                <Route
                    path="/"
                    exact
                    render={() => (
                        <NavItem link="/signin">
                            <button className={classes.Button}>Sign In</button>
                        </NavItem>
                    )}
                />
            </ul>
        </div>
    );
};

export default NavBar;
