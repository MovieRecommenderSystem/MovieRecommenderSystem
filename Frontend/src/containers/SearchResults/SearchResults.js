import React, { Component } from "react";

import axios from "../../axios-auth";
import NavBar from "../../components/Navigation/NavBar";
import Footer from "../../components/UI/Footer/Footer";
import Aux from "../../hoc/Aux/Aux";
import classes from "./SearchResults.module.css";
import Card from "../../components/Card/Card";

class SearchResults extends Component {
  state = {
    movies: [
      {
        imdbID: "tt0848228",
        title: "Avengers Assemble",
        year: 2009
      },
      {
        imdbID: "tt0848228",
        title: "Avengers Assemble",
        year: 2009
      },
      {
        imdbID: "tt0848228",
        title: "Avengers Assemble",
        year: 2009
      },
      {
        imdbID: "tt0848228",
        title: "Avengers Assemble",
        year: 2009
      },
      {
        imdbID: "tt4154796",
        title: "Avengers: Endgame",
        year: 2012
      },
    ],
  };
  componentDidMount() {
    console.log(this.props.location.search);
    let query = new URLSearchParams(this.props.location.search);
    let queryParam = "";
    for (let param of query.entries()) {
      queryParam = param[1];
    }
    // axios
    //   .post("/api/search", { query: queryParam })
    //   .then((response) => {
    //     console.log(response.data);
    //     this.setState({
    //       movies: response.data.results,
    //     });
    //   });
  }
  render() {
    return (
      <Aux>
        <NavBar />
        <div className={classes.Cards}>
          {this.state.movies.map((movie) => {
            return (
              <Card
                key={movie.imdbID}
                id={movie.imdbID}
                alt="POSTER"
                year={movie.year}
                title={movie.title}
              />
            );
          })}
        </div>
        <Footer />
      </Aux>
    );
  }
}

export default SearchResults;
