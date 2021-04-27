import React, { Component } from "react";
import Fade from "react-reveal/Fade";

import classes from "./Img.module.css";
import axios from "../../../axios-auth";

class Img extends Component {
  state = {
    loading: true,
    url: "",
  };
  componentDidReveal = () => {
    // axios
    //   .post("/api/getPoster", { imdbID: this.props.imdbID })
    //   .then((response) => {
    //     this.setState({ url: response.data, loading: false });
    //   });
  }
  render() {
    return (
      <Fade onReveal={this.componentDidReveal}>
        <div>
          {this.state.loading ? (
            <div className={classes.Loader}>Loading...</div>
          ) : (
            <img src={this.state.url} className={classes.Img} alt="POSTER" />
          )}
        </div>
      </Fade>
    );
  }
}

export default Img;
