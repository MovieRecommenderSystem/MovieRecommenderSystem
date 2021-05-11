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
    console.log(this.props.imdbID)
    axios
      .post("/api/getPoster", { tmdbID: this.props.imdbID })
      .then((response) => {
        console.log(response.data);
        this.setState({ url: response.data.poster, loading: false });
      });
  };
  render() {
    return (
      <div>
        <Fade onReveal={this.componentDidReveal}>
          <div className={classes.Wrapper}>
            {this.state.loading ? (
              <div className={classes.Loader}>Loading...</div>
            ) : this.state.url ? (
              <img
                src={this.state.url}
                className={classes.Img}
                style={{
                  width: this.props.customWidth
                    ? this.props.customWidth
                    : "auto",
                }}
                alt="POSTER"
              />
            ) : (
              <div className={classes.Loader}>We are working on it...</div>
            )}
          </div>
        </Fade>
      </div>
    );
  }
}

export default Img;
