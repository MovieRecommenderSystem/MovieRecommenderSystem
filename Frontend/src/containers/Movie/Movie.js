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
    //   // come from URL
    // id: null,
    // title: "",
    // // come from component itself
    // loading: true,
    // like: null,
    // // come from external API
    // rating: null,
    // year: null,
    // genre: [],
    // runtime: "",
    // language: [],
    // description: "",
    // directors: [],
    // actors: [],
    // come from URL
    id: "",
    title: "",
    // come from component itself
    loading: true,
    like: null,
    // come from external API
    rating: 8,
    year: 2012,
    genre: ["Action", "Adventure", "Sci-Fi"],
    runtime: "2h 23min",
    language: ["English", "Russian", "Hindi"],
    description:
      "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
    directors: ["Joss Whedon"],
    actors: ["Robert Downey Jr.", "Chris Evans", "Scarlett Johansson"],
    show: false, 
  };
  componentDidMount() {
    let query = new URLSearchParams(this.props.location.search);
    let queries = [];
    for (let [, value] of query.entries()) {
      queries.push(value);
    }
    let [title] = queries;
    console.log(this.props)
    let id = this.props.match.params.id;
    // axios request
    console.log(id)
    axios.post("/api/details", { tmdbID: Number(id) }).then((response) => {
      console.log(response.data);
    });
    this.setState({ id: id, title: title, loading: false});
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      let query = new URLSearchParams(this.props.location.search);
      let queries = [];
      for (let [, value] of query.entries()) {
        queries.push(value);
      }
      let [title] = queries;
      let id = this.props.match.params.id;
      // axios request
      this.setState({ id: id, title: title, loading: false });
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
    console.log(this.props);
    return this.props.auth ? (
      <Aux>
        <NavBar />
        {this.state.loading ? (
          <div className={classes.Loader}>Loading...</div>
        ) : (
          <Aux>
            <div className={classes.Container}>
              <div className={classes.Content1}>
                <Img imdbID={this.props.id} customWidth="15vw" />
                {!this.state.loading && this.state.show && (
                  <Backdrop hideTrailer={this.hideTrailer} />
                )}
                {!this.state.loading && this.state.show && (
                  <Trailer name={this.state.title} />
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
                  onClick={this.clickRecommHandler}
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
  return { auth: state.auth };
};

export default connect(mapStateToProps)(Movie);
