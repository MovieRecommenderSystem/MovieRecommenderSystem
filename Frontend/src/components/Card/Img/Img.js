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
    setTimeout(() => {
      this.setState({
        url:
          "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_UX182_CR0,0,182,268_AL__QL50.jpg",
        loading: false,
      });
    }, 1000);
  }
  render() {
    return (
        <div className={classes.Img}>
      <Fade onReveal={this.componentDidReveal}>
        <div>
          {this.state.loading ? (
            <div className={classes.Loader}>Loading...</div>
          ) : (
            <img src={this.state.url} className={classes.Img} alt="POSTER" />
          )}
        </div>
      </Fade>
      </div>
    );
  }
}

export default Img;
