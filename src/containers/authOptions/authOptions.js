import React from "react";
import { Link } from "react-router-dom";

import classes from "./authOptions.module.css";
import NavBar from "../../components/Navigation/NavBar";
import Footer from "../../components/UI/Footer/Footer";
import Aux from "../../hoc/Aux/Aux";
import Modal from "../../components/UI/Modal/Modal";

const AuthOptions = (props) => {
    return (
        <Aux>
            <NavBar />
            <Modal>
                <p className={classes.P}>Sign Up</p>
                <div className={classes.AuthOptions}>
                    <Link to="/signup/email" className={classes.Link}>
                        <button className={classes.Button}>Sign Up with Email</button>
                    </Link>
                    <Link to="/signup/phone" className={classes.Link}>
                        <button className={classes.Button}>Sign Up with Phone</button>
                    </Link>
                <p className={classes.P} style={{margin: '3vh auto 0 auto'}}>OR</p>
                    
                    <Link to="/signup/google" className={classes.Link}>
                        <button className={classes.Button}>Sign Up with Google</button>
                    </Link>
                </div>
            </Modal>
            <Footer />
        </Aux>
    );
};

export default AuthOptions;
