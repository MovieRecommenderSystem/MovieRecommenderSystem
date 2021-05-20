import React, { Component } from "react";
import Fade from "react-reveal/Fade";

import classes from "./Img.module.css";
import axios from "../../../axios-auth";
import notFoundImg from "../../../assets/flamenco-page-not-found-1.svg";

class Img extends Component {
  state = {
    loading: true,
    url: "",
  };
  componentDidReveal = () => {
    axios
      .post("/api/getPoster", { tmdbID: Number(this.props.imdbID) })
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
                className={classes.Img + " poster"}
                style={{
                  width:
                    this.props.customWidth && !(window.innerWidth < "")
                      ? this.props.customWidth
                      : "auto",
                }}
                alt="POSTER"
                onError={(event) => {
                  event.target.src = notFoundImg;
                }}
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
