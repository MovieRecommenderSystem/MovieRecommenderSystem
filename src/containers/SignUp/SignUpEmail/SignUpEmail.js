import React, { Component } from "react";
import Fade from "react-reveal/Fade";
import { connect } from "react-redux";
import axios from "../../../axios-auth";

import Input from "../../../components/UI/Input/Input";
import NavBar from "../../../components/Navigation/NavBar";
import Modal from "../../../components/UI/Modal/Modal";
import classes from "./SignUpEmail.module.css";
import Footer from "../../../components/UI/Footer/Footer";
import Aux from "../../../hoc/Aux/Aux";

class SignUp extends Component {
  state = {
    auxRendered: {
      id: 0,
      show: true,
    },
    username: {
      value: "",
      isValid: {
        minLength: true,
        required: false,
        pattern: true,
      },
    },
    email: {
      value: "",
      isValid: {
        required: false,
        pattern: true,
      },
    },
    password: {
      value: "",
      isValid: {
        required: false,
        minLength: true,
      },
    },
    confirmPassword: {
      value: "",
      isValid: {
        confirmed: true,
        required: false,
      },
    },
    phone: {
      value: "",
      isValid: {
        minLength: true,
        isNumeric: true,
      },
    },
    gender: "male",
    dob: this.formatDate(),
    uniqueUsername: true,
  };

  formatDate() {
    var d = new Date(),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  changePaginationHandler = (item) => {
    this.setState({ auxRendered: { id: item - 1 } });
  };

  isValid = (validProps) => {
    let valid = true;
    for (let key in validProps) {
      valid = validProps[key] && valid;
    }
    return valid;
  };

  onBackHandler = () => {
    this.setState({
      auxRendered: {
        id: this.state.auxRendered.id - 1,
      },
    });
  };
  onChangeHandler = (event, inputType) => {
    let pattern, minLength, checkPattern, required;
    switch (inputType) {
      case "username":
        pattern = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
        minLength = event.target.value.length >= 3;
        checkPattern = !pattern.test(event.target.value);
        required = event.target.value.length > 0;
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
        pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        checkPattern = pattern.test(event.target.value);
        required = event.target.value.length > 0;
        this.setState({
          email: {
            value: event.target.value,
            isValid: {
              pattern: checkPattern,
              required: required,
            },
          },
        });
        break;
      case "password":
        minLength = event.target.value.length >= 1;
        required = event.target.value.length > 0;
        this.setState({
          password: {
            value: event.target.value,
            isValid: {
              minLength: minLength,
              required: required,
            },
          },
        });
        break;
      case "confirm-password":
        let confirmed = event.target.value === this.state.password.value;
        required = event.target.value.length > 0;
        this.setState({
          confirmPassword: {
            value: event.target.value,
            isValid: { confirmed: confirmed, required: required },
          },
        });
        break;
      case "phone":
        let shouldValidate = event.target.value.length === 0;
        minLength = event.target.value.length === 10;
        let isNumeric = /^[\d ]*$/.test(event.target.value);
        this.setState({
          phone: {
            value: event.target.value,
            isValid: {
              minLength: shouldValidate || minLength,
              isNumeric: shouldValidate || isNumeric,
            },
          },
        });
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

  onContinueHandler = () => {
    switch (this.state.auxRendered.id) {
      case 0:
        // check for existing username and registered email
        // if username exists window.scrollTo and set state.uniqueUsername to false and else{}
        let firstDivValidation =
          this.isValid(this.state.username.isValid) &&
          this.isValid(this.state.email.isValid);
        if (firstDivValidation && this.state.uniqueUsername) {
          this.setState({
            auxRendered: {
              id: this.state.auxRendered.id + 1,
            },
          });
        } else {
          window.scrollTo(0, 105);
        }
        break;
      case 1:
        let secondDivValidation =
          this.isValid(this.state.password.isValid) &&
          this.isValid(this.state.confirmPassword.isValid);
        if (secondDivValidation) {
          this.setState({
            auxRendered: {
              id: this.state.auxRendered.id + 1,
            },
          });
        } else {
          window.scrollTo(0, 105);
        }
        break;
      default:
    }
  };

  onSubmitHandler = (event) => {
    event.preventDefault();
    let thirdDivValidation = this.isValid(this.state.phone.isValid);
    if (thirdDivValidation) {
      console.log(this.state);
      const userData = {
        username: this.state.username.value,
        email: this.state.email.value,
        password: this.state.password.value,
        phone:
          this.state.phone.value.length === 0 ? "-1" : this.state.phone.value,
        gender: this.state.gender,
        dob: this.state.dob,
      };

      axios.post("/api/signup", userData).then((response) => {
        if (response.data) {
          this.props.onAuthTrue();
          this.props.history.replace("/dashboard");
        } else {
          this.props.onAuthFalse();
          this.props.history.push("/authFailed");
        }
      });
    } else {
      window.scrollTo(0, 105);
    }
  };

  render() {
    let paginationItems = [1, 2, 3];
    console.log(this.props);
    return (
      <div>
        <NavBar />
        <Modal>
          <ul className={classes.Pagination}>
            {paginationItems.map((item) => {
              return (
                <li key={item}>
                  <p
                    onClick={() => this.changePaginationHandler(item)}
                    className={
                      classes.P +
                      " " +
                      (this.state.auxRendered.id === item - 1 && classes.active)
                    }
                  >
                    {item}
                  </p>
                </li>
              );
            })}
          </ul>
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
                    isValid={this.state.username.isValid}
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
                    isValid={this.state.email.isValid}
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
                    isValid={this.state.password.isValid}
                    value={this.state.password.value}
                    autofocus
                    label="Your Password"
                    onChange={this.onChangeHandler}
                  />
                  <Input
                    onChange={this.onChangeHandler}
                    isValid={this.state.confirmPassword.isValid}
                    value={this.state.confirmPassword.value}
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
                    isValid={this.state.phone.isValid}
                    type="text"
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
              <button className={classes.Button + " " + classes.SignUpButton}>
                Sign Up
              </button>
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

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthFalse: () => dispatch({ type: "False_Auth" }),
    onAuthTrue: () => dispatch({ type: "True_Auth" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
