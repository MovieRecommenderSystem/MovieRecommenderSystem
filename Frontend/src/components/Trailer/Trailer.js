import React from "react";
import classes from "./Trailer.module.css";

const Trailer = (props) => {
  return (
    <iframe
      className={classes.Trailer}
      src="https://www.youtube.com/embed/TcMBFSGVi1c"
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
};

export default Trailer;
