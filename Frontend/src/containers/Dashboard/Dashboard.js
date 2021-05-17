import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import classes from "./Dashboard.module.css";
import Img from "../../components/Card/Img/Img";
import Footer from "../../components/UI/Footer/Footer";
import NavBar from "../../components/Navigation/NavBar";
import axios from "../../axios-auth";
<<<<<<< HEAD

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
    axios.get()
=======
import notFoundImg from "../../assets/flamenco-page-not-found-1.svg";

class Dashboard extends Component {
  state = {
    recommendedMovies: [],
    loading: true,
  };

  componentDidMount() {
    console.log(this.props.username);
    axios
      .post("/api/simpleRecommender", { username: this.props.username })
      .then((response) => {
        console.log(response.data);
        let movies = [];
        if (response.data.result_id) {
          movies = response.data.result_id.map((id, index) => {
            return {
              id: id,
              title: response.data.result_name[index],
              year: response.data.year[index].substring(0, 4),
            };
          });
        }
        this.setState({ recommendedMovies: movies, loading: false });
      });
>>>>>>> bc7ec5e6cd585cb1545d92b748a46d91fb39db50
  }

  render() {
    return this.props.auth ? (
      <div className={classes.Dashboard}>
        <NavBar />
<<<<<<< HEAD
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
=======
        {this.state.loading ? (
          <div className={classes.Loader}>Loading...</div>
        ) : this.state.recommendedMovies.length > 0 ? (
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
                      <Img alt="POSTER" imdbID={movie.id} customWidth="11vw" />
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
        ) : (
          <img
            src={notFoundImg}
            alt="404"
            style={{ width: "40vw", height: "50vh" }}
          />
        )}
>>>>>>> bc7ec5e6cd585cb1545d92b748a46d91fb39db50
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
<<<<<<< HEAD
=======
    username: state.username,
>>>>>>> bc7ec5e6cd585cb1545d92b748a46d91fb39db50
  };
};

export default connect(mapStateToProps)(Dashboard);
