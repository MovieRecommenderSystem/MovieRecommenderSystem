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
    username: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
  };
  onContinueHandler = () => {
    this.setState({
      auxRendered: {
        id: this.state.auxRendered.id + 1,
      },
    });
  };
  onChangeHandler = (event, inputType) => {
    switch (inputType) {
      case "username":
        this.setState({ username: event.target.value });
        break;
      case "email":
        this.setState({ email: event.target.value });
        break;
      case "password":
        this.setState({ password: event.target.value });
        break;
      case "phone":
        this.setState({ phone: event.target.value });
        break;
      case "gender":
        this.setState({ gender: event.target.value });
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
          <form className={classes.Form} onSubmit={this.onSubmitHandler}>
            {this.state.auxRendered.id === 0 && (
              <Fade right opposite when={this.state.show} appear distance="5vw">
                <Aux>
                  <Input
                    id="username"
                    type="text"
                    name="username"
                    placeholder="Username"
                    required
                    label="Username"
                    autofocus
                    value={this.state.username}
                    onChange={this.onChangeHandler}
                  />
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    required
                    value={this.state.email}
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
                    value={this.state.password}
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
                    value={this.state.phone}
                    label="Your Phone Number"
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
                value="Continue"/
              >

            )}
          </form>
        </Modal>
        <Footer />
      </div>
    );
  }
}
export default SignUp;
