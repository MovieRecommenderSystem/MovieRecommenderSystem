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
    //   .get("https://imdb8.p.rapidapi.com/title/get-images", {
    //     params: {
    //       tconst: this.props.imdbID,
    //       limit: "1",
    //     },
    //     headers: {
    //       "x-rapidapi-key":
    //         "4179e2d1a4msh3b6c87754d770d3p140658jsn6f2a764f599f",
    //       "x-rapidapi-host": "imdb8.p.rapidapi.com",
    //       useQueryString: true,
    //     },
    //   })
    //   .then((response) => {
    //     // console.log(response.data.images[0].relatedTitles[0].image.url);
    //     if (response.data.images !== null) {
    //       this.setState({
    //         url:typeof(response.data.images) !== undefined && response.data.images[0].relatedTitles[0].image.url,
    //         loading: false,
    //       });
    //     }
    //   });
    axios
      .post("/api/getPoster", { tmdbID: this.props.tmdbID })
      .then((response) => {
        console.log(response.data);
        this.setState({ url: response.data.poster, loading: false });
      });
  };
  render() {
    return (
      <div>
        <Fade onReveal={this.componentDidReveal}>
          <div>
            {this.state.loading ? (
              <div className={classes.Loader}>Loading...</div>
            ) : this.state.url ? (
              <img src={this.state.url} className={classes.Img} alt="POSTER" />
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
