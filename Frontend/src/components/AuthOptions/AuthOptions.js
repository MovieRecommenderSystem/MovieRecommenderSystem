import React from "react";
import { Link } from "react-router-dom";

import classes from "./AuthOptions.module.css";
import NavBar from "../Navigation/NavBar";
import Footer from "../UI/Footer/Footer";
import Aux from "../../hoc/Aux/Aux";
import Modal from "../UI/Modal/Modal";

const AuthOptions = (props) => {
  return (
    <Aux>
      <NavBar />
      <Modal>
        <p className={classes.P}>Sign Up</p>
        <div className={classes.AuthOptions}>
          <Link to="/signup/email" className={classes.Link}>
            <button className={classes.Button}>
              <i className="fas fa-at" style={{ marginRight: "10px" }}></i> Sign
              Up with Email
            </button>
          </Link>
          <Link to="/signup/phone" className={classes.Link}>
            <button className={classes.Button}>
              <i className="fas fa-mobile" style={{ marginRight: "10px" }}></i>
              Sign Up with Phone
            </button>
          </Link>
          <p className={classes.P} style={{ margin: "3vh auto 0 auto" }}>
            OR
          </p>

          <Link to="/signup/google" className={classes.Link}>
            <button className={classes.Button} id="google">
              <i className="fab fa-google" style={{ marginRight: "10px" }}></i>
              Sign Up with Google
            </button>
          </Link>
        </div>
      </Modal>
      <Footer />
    </Aux>
  );
};

export default AuthOptions;
