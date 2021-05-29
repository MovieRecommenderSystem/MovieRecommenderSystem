import React, { Component } from "react";
import { connect } from "react-redux";

import classes from "./Movie.module.css";
import NavBar from "../../components/Navigation/NavBar";
import Footer from "../../components/UI/Footer/Footer";
import Aux from "../../hoc/Aux/Aux";
import Img from "../../components/Card/Img/Img";
import MoreLikeThis from "../MoreLikeThis/MoreLikeThis";
import Trailer from "../../components/Trailer/Trailer";
import Backdrop from "../../components/UI/Backdrop/Backdrop";
import { Redirect } from "react-router";
import axios from "../../axios-auth";

class Movie extends Component {
  state = {
    // come from URL
    id: "",
    title: "",
    // come from component itself
    loading: true,
    like: null,
    // come from external API
    rating: null,
    year: null,
    genre: [],
    runtime: "",
    language: [],
    description: "",
    directors: [],
    actors: [],
    // come from URL
    show: false,
    error: false,
  };
  componentDidMount() {
    let query = new URLSearchParams(this.props.location.search);
    let queries = [];
    for (let [, value] of query.entries()) {
      queries.push(value);
    }
    let [title] = queries;
    let id = this.props.match.params.id;
    console.log(id);
    // axios request
    axios.post("/api/details", { tmdbID: Number(id) }).then((response) => {
      console.log(response.data);
      this.setState({
        id: id,
        title: title,
        loading: false,
        rating: response.data.rating ? response.data.rating : "",
        year: response.data.year ? response.data.year : "",
        genre: response.data.Genres ? response.data.Genres : [],
        runtime: response.data.duration
          ? response.data.duration.substring(0, 2) +
            " " +
            response.data.duration.substring(2)
          : "",
        language: response.data.Languages ? response.data.Languages : [],
        description: response.data.description
          ? response.data.description
          : "",
        directors: response.data.director ? response.data.director : [],
        actors: response.data.Actors ? response.data.Actors : [],
      });
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({ loading: true });
      let query = new URLSearchParams(this.props.location.search);
      let queries = [];
      for (let [, value] of query.entries()) {
        queries.push(value);
      }
      let [title] = queries;
      let id = this.props.match.params.id;
      console.log(id);
      // axios request
      axios.post("/api/details", { tmdbID: Number(id) }).then((response) => {
        console.log(response.data);
        this.setState({
          id: id,
          title: title,
          loading: false,
          rating: response.data.rating ? response.data.rating : "",
          year: response.data.year ? response.data.year : "",
          genre: response.data.Genres ? response.data.Genres : [],
          runtime: response.data.duration
            ? response.data.duration.substring(0, 2) +
              " " +
              response.data.duration.substring(2)
            : "",
          language: response.data.Languages ? response.data.Languages : [],
          description: response.data.description
            ? response.data.description
            : "",
          directors: response.data.director ? response.data.director : [],
          actors: response.data.Actors ? response.data.Actors : [],
        });
      });
      this.render();
    }
  }

  clickRecommHandler = (movie) => {
    this.setState({ id: movie.id });
  };

  showTrailer = () => {
    this.setState({ show: true });
  };

  hideTrailer = () => {
    this.setState({ show: false });
  };

  render() {
    return this.props.auth ? (
      <Aux>
        <NavBar />
        {this.state.loading ? (
          <div className={classes.Loader}>Loading...</div>
        ) : (
          <Aux>
            <div className={classes.Container}>
              <div className={classes.Content1}>
                <Img imdbID={this.state.id} customWidth="15vw" />
                {this.state.show && <Backdrop hideTrailer={this.hideTrailer} />}
                {this.state.show && (
                  <Trailer
                    name={this.state.title}
                    hideTrailer={this.hideTrailer}
                  />
                )}
                <p className={classes.Trailer} onClick={this.showTrailer}>
                  View Trailer
                </p>
              </div>
              <div className={classes.Content2}>
                <p className={classes.P1}>
                  {this.state.title}
                  <p className={classes.P2} style={{ marginLeft: "2vw" }}>
                    <i className="fas fa-star" style={{ color: "gold" }}></i>
                    {this.state.rating}
                  </p>
                </p>
                <p className={classes.P3}>{"(" + this.state.year + ")"}</p>
                <p className={classes.P4}>
                  {this.state.genre.join(", ") +
                    " | " +
                    this.state.runtime +
                    " | " +
                    this.state.language.join(", ")}
                </p>
                <p className={classes.P4}>{this.state.description}</p>
                <p className={classes.P5}>
                  Directors: {this.state.directors.join(", ")}
                </p>
                <p className={classes.P5}>
                  Cast: {this.state.actors.join(", ")}
                </p>
                <p className={classes.P3}>More like this</p>
                <MoreLikeThis
                  id={this.state.id}
                  // onClick={this.clickRecommHandler}
                />
              </div>
            </div>
          </Aux>
        )}
        <Footer />
      </Aux>
    ) : (
      <Redirect from="/movie" to="/signin" />
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth, currMovie: state.movie };
};

export default connect(mapStateToProps)(Movie);
