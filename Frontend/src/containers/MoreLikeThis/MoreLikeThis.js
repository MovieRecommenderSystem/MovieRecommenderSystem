import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import classes from "./MoreLikeThis.module.css";
import Img from "../../components/Card/Img/Img";
import axios from "../../axios-auth";
import notFoundImg from "../../assets/flamenco-page-not-found-1.svg";

class MoreLikeThis extends Component {
  state = {
    movies: [],
  };

  componentDidMount() {
    console.log(Number(this.props.id));
    axios
      .post("/api/ContentRecommender", { TMDB: Number(this.props.id) })
      .then((response) => {
        console.log(response.data);
        const names = response.data.name;
        console.log(names);
        let movies = [];
        if (response.data.response) {
          movies = response.data.response.map((response, index) => {
            console.log(response);
            return { id: response, title: names[index] };
          });
        }
        this.setState({ movies: movies });
      });
  }

  render() {
    return (
      <div className={classes.Container}>
        {this.state.movies.length > 0 ? (
          this.state.movies.map((movie) => {
            return (
              <div key={movie.id} style={{margin: "auto 1vw"}}>
                <Link to={"/movie/" + movie.id + "?title=" + movie.title}>
                  <Img imdbID={movie.id} customWidth="10vw" />
                </Link>
                <p>{movie.title}</p>
              </div>
            );
          })
        ) : (
          <img
            src={notFoundImg}
            alt="404"
            style={{ width: "40vw", height: "50vh" }}
          />
        )}
      </div>
    );
  }
}

export default withRouter(MoreLikeThis);
