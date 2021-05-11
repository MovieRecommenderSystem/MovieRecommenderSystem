import React, { Component } from "react";
import classes from "./Trailer.module.css";
import axios from "../../axios-auth";

class Trailer extends Component {
  state = {
    url: "",
  };
  componentDidMount() {
    axios.post("/api/trailer", { query: this.props.name }).then((response) => {
      this.setState({ url: response.data.embeddedLink });
      console.log(response.data);
    });
  }
  render() {
    return (
      <iframe
        className={classes.Trailer}
        src={this.state.url}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    );
  }
}

export default Trailer;
