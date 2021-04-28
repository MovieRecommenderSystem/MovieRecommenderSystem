import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import classes from "./Dashboard.module.css";
import Img from "../../components/Card/Img/Img";
import Footer from "../../components/UI/Footer/Footer";
import NavBar from "../../components/Navigation/NavBar";

class Dashboard extends Component {
  state = {
    recommendedMovies: [
      {
        id: "tt0848228",
        posterURL:
          "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL__QL50.jpg",
        title: "Avengers",
        year: "2012",
      },
      {
        id: "tt1300854",
        posterURL:
          "https://m.media-amazon.com/images/M/MV5BMjE5MzcyNjk1M15BMl5BanBnXkFtZTcwMjQ4MjcxOQ@@._V1_UY268_CR3,0,182,268_AL__QL50.jpg",
        title: "Iron Man",
        year: "2011",
      },
      {
        id: "tt0848228",
        posterURL:
          "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL__QL50.jpg",
        title: "Avengers",
        year: "2012",
      },
      {
        id: "tt1300854",
        posterURL:
          "https://m.media-amazon.com/images/M/MV5BMjE5MzcyNjk1M15BMl5BanBnXkFtZTcwMjQ4MjcxOQ@@._V1_UY268_CR3,0,182,268_AL__QL50.jpg",
        title: "Iron Man",
        year: "2011",
      },
      {
        id: "tt0848228",
        posterURL:
          "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL__QL50.jpg",
        title: "Avengers",
        year: "2012",
      },
      {
        id: "tt1300854",
        posterURL:
          "https://m.media-amazon.com/images/M/MV5BMjE5MzcyNjk1M15BMl5BanBnXkFtZTcwMjQ4MjcxOQ@@._V1_UY268_CR3,0,182,268_AL__QL50.jpg",
        title: "Iron Man",
        year: "2011",
      },
      {
        id: "tt0848228",
        posterURL:
          "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL__QL50.jpg",
        title: "Avengers",
        year: "2012",
      },
      {
        id: "tt1300854",
        posterURL:
          "https://m.media-amazon.com/images/M/MV5BMjE5MzcyNjk1M15BMl5BanBnXkFtZTcwMjQ4MjcxOQ@@._V1_UY268_CR3,0,182,268_AL__QL50.jpg",
        title: "Iron Man",
        year: "2011",
      },
      {
        id: "tt0848228",
        posterURL:
          "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL__QL50.jpg",
        title: "Avengers",
        year: "2012",
      },
      {
        id: "tt1300854",
        posterURL:
          "https://m.media-amazon.com/images/M/MV5BMjE5MzcyNjk1M15BMl5BanBnXkFtZTcwMjQ4MjcxOQ@@._V1_UY268_CR3,0,182,268_AL__QL50.jpg",
        title: "Iron Man",
        year: "2011",
      },
    ],
  };

  componentDidMount() {
    //[AXIOS CODE]
  }

  render() {
    return this.props.auth ? (
      <div className={classes.Dashboard}>
        <NavBar />
        <div className={classes.Content}>
          {this.state.recommendedMovies.map((movie) => {
            return (
              <Link
                key={movie.id}
                to={{
                  pathname: "/movie/" + movie.id,
                  search: "?title=" + movie.title,
                }}
                style={{ textDecoration: "none" }}
              >
                <div className={classes.ContentChildren}>
                  <div>
                    <Img alt="POSTER" imdbID={movie.id} />
                  </div>
                  <div>
                    <p className={classes.P1}>{movie.title}</p>
                    <p className={classes.P2}>{"(" + movie.year + ")"}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        <Footer />
      </div>
    ) : (
      <Redirect from="/dashboard" to="/signin" />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(Dashboard);
