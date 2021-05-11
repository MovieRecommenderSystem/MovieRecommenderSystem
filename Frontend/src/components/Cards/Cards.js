import React from "react";

import Card from "../Card/Card";
import classes from "./Cards.module.css";

const Cards = (props) => {
  return (
    <div className={classes.Cards}>
        <p className={classes.P}>Search results for {props.query}</p>

      {props.movies.map((movie) => {
        return (
          <Card
            key={movie.tmdb_id}
            id={movie.tmdb_id}
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
