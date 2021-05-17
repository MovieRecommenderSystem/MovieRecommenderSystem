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
<<<<<<< HEAD
            <p className={classes.P}>©PopKorn</p>
=======
            <p className={classes.P}>©popcorn</p>
>>>>>>> bc7ec5e6cd585cb1545d92b748a46d91fb39db50
        </Aux>
    );
};

export default Footer;
