import React, { Component } from "react";
import { connect } from "react-redux";

import axios from "../../axios-auth";
import NavBar from "../../components/Navigation/NavBar";
import Footer from "../../components/UI/Footer/Footer";
import Aux from "../../hoc/Aux/Aux";
import classes from "./SearchResults.module.css";
import Cards from "../../components/Cards/Cards";
import { Redirect } from "react-router";

class SearchResults extends Component {
  state = {
    movies: [],
    query: ""
  };
  componentDidMount() {
    let query = new URLSearchParams(this.props.location.search);
    let queryParam = "";
    for (let param of query.entries()) {
      queryParam = param[1];
    }
    this.setState({query: queryParam});
    axios.post("/api/search", { query: queryParam }).then((response) => {
      this.setState({
        movies: response.data.results,
      });
    });
  }
  render() {
    return this.props.auth ? (
      <Aux>
        <NavBar />
        {this.state.movies.length === 0 ? (
          <div className={classes.Loader}>Loading...</div>
        ) : (
          <Cards query={this.state.query} movies={this.state.movies} />
        )}
        <Footer />
      </Aux>
    ) : (
      <Redirect from="/search-results" to="/signin" />
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(SearchResults);
