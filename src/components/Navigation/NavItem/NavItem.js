import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./NavItem.module.css";

const NavItem = (props) => {
    return (
        <li className={classes.NavItem}>
            <NavLink className={classes.NavLink} to={props.link}>{props.children}</NavLink>
        </li>
    );
};

export default NavItem;
