import React from "react";

import Aux from "../../../hoc/Aux/Aux";
import classes from "./Footer.module.css";

const Footer = (props) => {
    return (
        <Aux>
            <ul className={classes.Footer}>
                <li>
                    <i className="fab fa-instagram-square"></i>
                </li>
                <li>
                    <i className="fab fa-facebook-square"></i>
                </li>
                <li>
                    <i className="fab fa-twitter-square"></i>
                </li>
                <li>
                    <i className="fab fa-youtube-square"></i>
                </li>
            </ul>
            <p className={classes.P}>©popcorn</p>
        </Aux>
    );
};

export default Footer;
