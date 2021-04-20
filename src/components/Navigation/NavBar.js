import React from "react";
import { withRouter } from "react-router-dom";

import NavItem from "./NavItem/NavItem";
import Logo from "../UI/Logo/Logo";
import classes from "./NavBar.module.css";

const NavBar = (props) => {
    // console.log(props);
    return (
        <div className={classes.NavBar}>
            <Logo />
            <ul className={classes.NavItems}>
                <NavItem link="/premium">
                    <button className={classes.Button + ' ' + classes.Plus}>Get Plus</button>
                </NavItem>
                {props.location.pathname === "/" && (
                    <NavItem link="/signin">
                        <button className={classes.Button}>Sign In</button>
                    </NavItem>
                )}
            </ul>
        </div>
    );
};

export default withRouter(NavBar);
