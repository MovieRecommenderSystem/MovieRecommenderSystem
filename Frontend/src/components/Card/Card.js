import React, { Component } from "react";
import { Link } from "react-router-dom";

import Img from "./Img/Img";
import classes from "./Card.module.css";

class Card extends Component {
  render() {
    return (
      <Link
        to={{
          pathname: "/movie/" + this.props.id,
          search: "?title=" + this.props.title,
        }}
        style={{ textDecoration: "none" }}
      >
        <div className={classes.Card}>
          <div className={classes.Content1}>
            <Img alt="POSTER" imdbID={this.props.id} />
          </div>
          <div className={classes.Content2}>
            <p className={classes.P1}>{this.props.title}</p>
            <p className={classes.P2}>{"(" + this.props.year + ")"}</p>
          </div>
        </div>
      </Link>
    );
  }
}

export default Card;
