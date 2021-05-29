import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import classes from "./Dashboard.module.css";
import Img from "../../components/Card/Img/Img";
import Footer from "../../components/UI/Footer/Footer";
import NavBar from "../../components/Navigation/NavBar";
import axios from "../../axios-auth";
import notFoundImg from "../../assets/flamenco-page-not-found-1.svg";

class Dashboard extends Component {
  state = {
    recommendedMovies: [],
    loading: true,
  };

  componentDidMount() {
    console.log(this.props);
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
  }

  render() {
    return this.props.auth ? (
      <div className={classes.Dashboard}>
        <NavBar />
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
    username: state.username,
  };
};

export default connect(mapStateToProps)(Dashboard);
