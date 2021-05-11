import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import classes from "./MoreLikeThis.module.css";
import Img from "../../components/Card/Img/Img";

class MoreLikeThis extends Component {
  state = {
    movies: [
      { id: "tt0848228", title: "Avengers" },
      { id: "tt0848228", title: "Avengers" },
    ],
  };

  render() {
    return (
      <div className={classes.Container}>
        {this.state.movies.map((movie) => {
          return (
            <div key={movie.id} onClick={()=>this.props.onClick(movie.id)}>
              <Link to={"/movie/" + movie.id + "?title=" + movie.title}>
                <Img imdbID={movie.id} />
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
}

export default withRouter(MoreLikeThis);
