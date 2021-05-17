import React from "react";
<<<<<<< HEAD
import { InlineIcon } from "@iconify/react";
import popcornIcon from "@iconify-icons/whh/popcorn";
=======
// import { InlineIcon } from "@iconify/react";
// import popcornIcon from "@iconify-icons/whh/popcorn";
import icon from "../../../assets/icons8-movie.gif";
>>>>>>> bc7ec5e6cd585cb1545d92b748a46d91fb39db50

import classes from "./Logo.module.css";

const Logo = (props) => {
  return (
    <div className={classes.Logo}>
<<<<<<< HEAD
      <InlineIcon icon={popcornIcon} style={{color: "#ffdb58"}}/> 
      PopKorn
=======
      {/* <InlineIcon icon={popcornIcon} style={{color: "#ffdb58"}}/>  */}
      {/* <img src="https://img.icons8.com/ios-filled/50/000000/film-reel--v2.png"/> */}
      <img
        src={icon}
        style={{
          display: "inline",
          width: "5vw",
          marginRight: "2vw",
          alignSelf: "flex-end",
        }}
        alt="LOGO"
      />
      popcorn
>>>>>>> bc7ec5e6cd585cb1545d92b748a46d91fb39db50
    </div>
  );
};

export default Logo;
