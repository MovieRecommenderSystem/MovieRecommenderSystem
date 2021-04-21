import React, { Component } from "react";
import Fade from "react-reveal/Fade";

import Input from "../../components/UI/Input/Input";
import NavBar from "../../components/Navigation/NavBar";
import Modal from "../../components/UI/Modal/Modal";
import classes from "./SignUp.module.css";
import Footer from "../../components/UI/Footer/Footer";
import Aux from "../../hoc/Aux/Aux";

class SignUp extends Component {
  state = {
    auxRendered: {
      id: 0,
      show: true,
    },
    username: {
      value: "",
      isValid: {
        minLength: false,
        required: false,
        pattern: true,
      },
    },
    email: {
      value: "",
      isValid: true,
    },
    password: {
      value: "",
      isValid: true,
    },
    phone: {
      value: "",
      isValid: true,
    },
    gender: "",
    dob: new Date(),
    uniqueUsername: true,
  };
  onContinueHandler = () => {
    this.setState({
      auxRendered: {
        id: this.state.auxRendered.id + 1,
      },
    });
    // axios request to check if username is unique and email is not registered
  };
  onBackHandler = () => {
    this.setState({
      auxRendered: {
        id: this.state.auxRendered.id - 1,
      },
    });
  };
  onChangeHandler = (event, inputType) => {
    switch (inputType) {
      case "username":
        const pattern = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        const minLength = event.target.value.length >= 5;
        const checkPattern = !pattern.test(event.target.value);
        const required = event.target.value.length > 0;
        this.setState({
          username: {
            value: event.target.value,
            isValid: {
              minLength: minLength,
              pattern: checkPattern,
              required: required,
            },
          },
        });
        break;
      case "email":
        this.setState({ email: { value: event.target.value } });
        break;
      case "password":
        this.setState({ password: { value: event.target.value } });
        break;
      case "phone":
        this.setState({ phone: { value: event.target.value } });
        break;
      case "gender":
        this.setState({ gender: event.target.value });
        break;
      case "dob":
        this.setState({ dob: event.target.value });
        break;
      default:
        break;
    }
  };
  onSubmitHandler = (event) => {
    event.preventDefault();
    console.log(this.state);
  };
  render() {
    return (
      <div>
        <NavBar />
        <Modal>
          <p className={classes.P}>Step {this.state.auxRendered.id + 1}</p>
          {this.state.auxRendered.id > 0 && (
            <i className="fas fa-angle-left" onClick={this.onBackHandler}></i>
          )}
          <form className={classes.Form} onSubmit={this.onSubmitHandler}>
            {this.state.auxRendered.id === 0 && (
              <Fade right opposite when={this.state.show} appear distance="5vw">
                <Aux>
                  <Input
                    error={!this.state.uniqueUsername}
                    id="username"
                    type="text"
                    name="username"
                    placeholder="Username"
                    required
                    label="Username"
                    autofocus
                    isValid = {this.state.username.isValid}
                    value={this.state.username.value}
                    onChange={this.onChangeHandler}
                  />
                  {!this.state.uniqueUsername && (
                    <p className={classes.validateP}>*Username already taken</p>
                  )}
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    autoComplete="true"
                    placeholder="Your Email"
                    required
                    value={this.state.email.value}
                    label="Your Email"
                    onChange={this.onChangeHandler}
                  />
                </Aux>
              </Fade>
            )}
            {this.state.auxRendered.id === 1 && (
              <Fade right opposite when={this.state.show} appear distance="5vw">
                <Aux>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Your Password"
                    required
                    value={this.state.password.value}
                    autofocus
                    label="Your Password"
                    onChange={this.onChangeHandler}
                  />
                  <Input
                    onChange={this.onChangeHandler}
                    id="confirm-password"
                    type="password"
                    name="confirm-password"
                    placeholder="Confirm Password"
                    required
                    label="Confirm Password"
                  />
                </Aux>
              </Fade>
            )}
            {this.state.auxRendered.id === 2 && (
              <Fade right opposite when={this.state.show} appear distance="5vw">
                <Aux>
                  <Input
                    id="phone"
                    type="tel"
                    autofocus
                    name="phone"
                    placeholder="Your Phone Number"
                    value={this.state.phone.value}
                    label="Your Phone Number"
                    onChange={this.onChangeHandler}
                  />
                  <Input
                    id="dob"
                    type="date"
                    name="dob"
                    placeholder="Your Birthday"
                    label="Your Birthday"
                    value={this.state.dob}
                    onChange={this.onChangeHandler}
                  />
                  <label className={classes.Label} htmlFor="gender">
                    Gender
                  </label>
                  <select
                    className={classes.Select}
                    id="gender"
                    name="gender"
                    value={this.state.gender}
                    onChange={(event) => this.onChangeHandler(event, "gender")}
                  >
                    <option className={classes.Option} value="male">
                      Male
                    </option>
                    <option className={classes.Option} value="female">
                      Female
                    </option>
                    <option className={classes.Option} value="third">
                      Prefer not to say
                    </option>
                    <option
                      className={classes.Option}
                      value=""
                      style={{ display: "none" }}
                    ></option>
                  </select>
                </Aux>
              </Fade>
            )}
            {this.state.auxRendered.id === 2 ? (
              <button className={classes.Button}>Sign In</button>
            ) : (
              <input
                type="button"
                className={classes.Button}
                onClick={this.onContinueHandler}
                value="Continue"
              />
            )}
          </form>
        </Modal>
        <Footer />
      </div>
    );
  }
}
export default SignUp;
