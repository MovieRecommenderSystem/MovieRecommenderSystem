import React, { Component } from "react";
import classes from "./Trailer.module.css";
import axios from "../../axios-auth";
import Aux from "../../hoc/Aux/Aux";
import Zoom from "react-reveal/Zoom";

class Trailer extends Component {
  state = {
    url: "",
    loading: true,
  };
  componentDidMount() {
    console.log(this.props.name);
    axios.post("/api/trailer", { query: this.props.name }).then((response) => {
      this.setState({
        url: response.data.embeddedLink + "?autoplay=1",
        loading: false,
      });
    });
  }
  render() {
    return this.state.loading ? (
      <div className={classes.Loader}>Loading...</div>
    ) : (
      <Aux>
        <p className={classes.P} onClick={this.props.hideTrailer}>
          <i class="fas fa-times-circle" style={{ fontSize: "xx-large" }}></i>
        </p>
        <Zoom>
          <iframe
            className={classes.Trailer}
            src={this.state.url}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            autoplay
          ></iframe>
        </Zoom>
      </Aux>
    );
  }
}

export default Trailer;
