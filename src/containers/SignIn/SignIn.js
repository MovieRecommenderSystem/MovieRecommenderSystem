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
    email: {
      value: "",
      isValid: {
        // required: false,
        pattern: true,
      },
    },
    password: {
      value: "",
      isValid: {
        required: false,
        // minLength: true,
      },
    },
    phone: {
      value: "",
      isValid: {
        minLength: true,
        // required: false,
        isNumeric: true,
      },
    },
    oneRequired: true,
  };

  isValid = (validProps) => {
    let valid = true;
    for (let key in validProps) {
      valid = validProps[key] && valid;
    }
    return valid;
  };

  onChangeHandler = (event, inputType) => {
    let pattern, minLength, checkPattern, required;
    switch (inputType) {
      case "email":
        pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        checkPattern = pattern.test(event.target.value);
        required = event.target.value.length > 0;
        this.setState({
          email: {
            value: event.target.value,
            isValid: {
              pattern: checkPattern,
              // required: required,
            },
          },
          oneRequired: !(required || this.state.phone.value.length > 0),
        });
        break;
      case "password":
        required = event.target.value.length > 0;
        this.setState({
          password: {
            value: event.target.value,
            isValid: {
              required: required,
            },
          },
        });
        break;
      case "phone":
        minLength = event.target.value.length === 10;
        required = event.target.value.length > 0;
        let isNumeric = /^[\d ]*$/.test(event.target.value);
        this.setState({
          phone: {
            value: event.target.value,
            isValid: {
              minLength: minLength,
              isNumeric: isNumeric,
            },
          },
          oneRequired: !(required || this.state.email.value.length > 0),
        });
        break;
      default:
        break;
    }
  };

  onSubmitHandler = (event) => {
    event.preventDefault();
    let divValidation =
      (!this.state.oneRequired) && this.isValid(this.state.password);
    if (this.state.email.value.length > 0)
      divValidation = this.isValid(this.state.email.isValid) && divValidation;
    if (this.state.phone.value.length > 0)
      divValidation = this.isValid(this.state.phone.isValid) && divValidation;
    console.log(divValidation)
    if (divValidation) {
      console.log(this.state);
    } else {
      window.scrollTo(0, 105);
    }
  };

  render() {
    return (
      <Aux>
        <NavBar />
        <Modal>
          <p className={classes.P}>Sign In</p>
          <form className={classes.Form} onSubmit={this.onSubmitHandler}>
            <Fade right appear distance="5vw">
              <Aux>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  isValid={this.state.email.isValid}
                  value={this.state.email.value}
                  onChange={this.onChangeHandler}
                  placeholder="Your Email"
                  autofocus
                  label="Email"
                />
                <p className={classes.P} style={{ margin: "3vh auto 0 auto" }}>
                  OR
                </p>
                <Input
                  id="phone"
                  isValid={this.state.phone.isValid}
                  value={this.state.phone.value}
                  onChange={this.onChangeHandler}
                  type="tel"
                  name="phone"
                  placeholder="Your Mobile Number"
                  label="Your Mobile Number"
                />

                {this.state.oneRequired && (
                  <p className={classes.validateP}>
                    *Please fill one of email and password
                  </p>
                )}
                <Input
                  id="password"
                  type="password"
                  name="password"
                  isValid={this.state.password.isValid}
                  value={this.state.password.value}
                  onChange={this.onChangeHandler}
                  placeholder="Your Password"
                  required
                  label="Password"
                />
              </Aux>
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
