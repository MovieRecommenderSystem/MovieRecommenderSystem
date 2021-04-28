import React from "react";

import Card from "../Card/Card";
import classes from "./Cards.module.css";

const Cards = (props) => {
  return (
    <div className={classes.Cards}>
      {props.movies.map((movie) => {
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
  );
};

export default Cards;
