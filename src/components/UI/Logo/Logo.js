import React from "react";
import { InlineIcon } from "@iconify/react";
import popcornIcon from "@iconify-icons/whh/popcorn";

import classes from "./Logo.module.css";

const Logo = (props) => {
  return (
    <div className={classes.Logo}>
      <InlineIcon icon={popcornIcon} /> Popkorn
    </div>
  );
};

export default Logo;
