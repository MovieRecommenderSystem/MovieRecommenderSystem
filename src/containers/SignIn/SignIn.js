import React, { Component } from "react";
import classes from "../SignUp/SignUpEmail/SignUpEmail.module.css";
import Fade from "react-reveal/Fade";

import NavBar from "../../components/Navigation/NavBar";
import Footer from "../../components/UI/Footer/Footer";
import Aux from "../../hoc/Aux/Aux";
import Modal from "../../components/UI/Modal/Modal";
import Input from "../../components/UI/Input/Input";

class SignIn extends Component {

    state = {
        
    }

  render() {
    return (
      <Aux>
        <NavBar />
        <Modal>
          <p className={classes.P}>Sign In</p>
          <form className={classes.Form} onSubmit={this.onSubmitHandler}>
            <Fade right opposite when={true} appear distance="5vw">
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="Your Email"
                required
                autofocus
                label="Email"
              />
                <p className={classes.P} style={{margin: '3vh auto 0 auto'}}>OR</p>
              <Input
              id="phone"
              type="tel"
              name="phone"
              placeholder="Your Mobile Number"
              required
              label="Your Mobile Number"
            />
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Your Password"
                required
                label="Password"
              />
            </Fade>
            <button className={classes.Button + " " + classes.SignInButton}>
              Sign In
            </button>
          </form>
        </Modal>
        <Footer />
      </Aux>
    );
  }
}

export default SignIn;
