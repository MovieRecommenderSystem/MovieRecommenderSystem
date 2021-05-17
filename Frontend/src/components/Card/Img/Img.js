import React, { Component } from "react";
import Fade from "react-reveal/Fade";

import classes from "./Img.module.css";
import axios from "../../../axios-auth";
<<<<<<< HEAD
=======
import notFoundImg from "../../../assets/flamenco-page-not-found-1.svg";
>>>>>>> bc7ec5e6cd585cb1545d92b748a46d91fb39db50

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
<<<<<<< HEAD
                className={classes.Img}
                style={{
                  width: this.props.customWidth
                    ? this.props.customWidth
                    : "auto",
                }}
                alt="POSTER"
=======
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
>>>>>>> bc7ec5e6cd585cb1545d92b748a46d91fb39db50
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
