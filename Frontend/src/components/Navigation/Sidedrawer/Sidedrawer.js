import React from "react";

// import Aux from "../../../hoc/Aux/Aux";
import NavItem from "../NavItem/NavItem";
import classes from "./Sidedrawer.module.css";

const logout = () => {
  localStorage.removeItem("userData");
  window.location.reload();
};

const Sidedrawer = (props) => {
  return (
    <div
      className={
        classes.Sidedrawer +
        " " +
        classes.OnMobile +
        " " +
        (props.show && classes.Open) +
        " " +
        (!props.show && classes.Close)
      }
    >
      <NavItem link="/profile">
        <button id="profile" className={classes.Button} disabled={!props.show}>
          <i
            className="fas fa-user-circle"
            onClick={(event) => (!props.show ? event.preventDefault() : null)}
          ></i>
        </button>
      </NavItem>
      <NavItem link="/watchlist">
        <button className={classes.Button} disabled={!props.show}>
          Watchlist
        </button>
      </NavItem>
      <NavItem link="/">
        <button
          disabled={!props.show}
          style={{
            background: "none",
            color: "white",
            outline: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          <p
            onClick={logout}
            style={{ textDecoration: "underline", textAlign: "center" }}
          >
            Logout
          </p>
        </button>
      </NavItem>
    </div>
  );
};

export default Sidedrawer;
