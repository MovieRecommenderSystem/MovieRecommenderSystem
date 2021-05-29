import React, { Component } from "react";
import { connect } from "react-redux";

import axios from "../../axios-auth";
import NavBar from "../../components/Navigation/NavBar";
import Footer from "../../components/UI/Footer/Footer";
import Aux from "../../hoc/Aux/Aux";
import classes from "./SearchResults.module.css";
import Cards from "../../components/Cards/Cards";
import { Redirect } from "react-router";
import notFoundImg from "../../assets/flamenco-page-not-found-1.svg";

class SearchResults extends Component {
  state = {
    movies: [],
  };
  componentDidMount() {
    console.log(this.props);
    axios
      .post("/api/search", {
        query: this.props.query
          ? this.props.query
          : this.props.match.params.query,
      })
      .then((response) => {
        this.setState({
          movies: response.data.results,
        });
      });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.query !== this.props.query) {
      this.setState({ movies: [] });
      axios
        .post("/api/search", { query: this.props.query })
        .then((response) => {
          if (response.data) {
            this.setState({
              movies: response.data.results,
            });
          }
        });
    }
  }
  render() {
    return this.props.auth ? (
      <Aux>
        <NavBar />

        {this.state.movies ? (
          this.state.movies.length === 0 ? (
            <div className={classes.Loader}>Loading...</div>
          ) : (
            <Cards query={this.props.query} movies={this.state.movies} />
          )
        ) : (
          <img
            src={notFoundImg}
            alt="404"
            style={{ width: "25vw", height: "30vh" }}
          />
        )}
        <Footer />
      </Aux>
    ) : (
      <Redirect from="/search-results" to="/signin" />
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth, query: state.query };
};

export default connect(mapStateToProps)(SearchResults);
