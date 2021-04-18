import React from "react";
import { Link } from "react-router-dom";

import classes from "./NavItem.module.css";

const NavItem = (props) => {
    return (
        <li className={classes.NavItem}>
            <Link to={props.link}>{props.children}</Link>
        </li>
    );
};

export default NavItem;
