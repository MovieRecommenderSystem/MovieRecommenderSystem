import React, { Component } from "react";

import axios from "../../axios-auth";
import NavBar from "../../components/Navigation/NavBar";
import Footer from "../../components/UI/Footer/Footer";
import Aux from "../../hoc/Aux/Aux";
import classes from "./SearchResults.module.css";
import Cards from "../../components/Cards/Cards";

class SearchResults extends Component {
  state = {
    movies: [],
  };
  componentDidMount() {
    console.log(this.props.location.search);
    let query = new URLSearchParams(this.props.location.search);
    let queryParam = "";
    for (let param of query.entries()) {
      queryParam = param[1];
    }
    axios.post("/api/search", { query: queryParam }).then((response) => {
      console.log(response.data);
      this.setState({
        movies: response.data.results,
      });
    });
  }
  render() {
    return (
      <Aux>
        <NavBar />
        {this.state.movies.length === 0 ? (
          <div className={classes.Loader}>Loading...</div>
        ) : (
          <Cards movies={this.state.movies} />
        )}
        <Footer />
      </Aux>
    );
  }
}

export default SearchResults;
