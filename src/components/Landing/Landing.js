import React, { Component } from "react";
import Flash from "react-reveal/Flash";

import classes from "./Landing.module.css";
import NavBar from "../Navigation/NavBar";

class Landing extends Component {
    state = {
        animate: true,
    };
    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState({ animate: !this.state.animate });
        }, 5000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    render() {
        return (
            <div className={classes.Landing}>
                <NavBar />
                <Flash appear={true} spy={this.state.animate} count={2} duration={200}>
                    <h1 className={classes.Content}>MOVIE PLEASE</h1>
                </Flash>
                <button className={classes.Button}>DIVE IN</button>
            </div>
        );
    }
}

export default Landing;
