import React, { Component } from "react";
import Flash from "react-reveal/Flash";
import { Link } from "react-router-dom";

import classes from "./Landing.module.css";
import NavBar from "../Navigation/NavBar";
import Footer from "../UI/Footer/Footer";
import Aux from "../../hoc/Aux/Aux";

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
            <Aux>
                <NavBar />
                <div className={classes.Flex}>
                    <div>
                        <Flash
                            appear={true}
                            spy={this.state.animate}
                            count={2}
                            duration={200}
                        >
                            <h1 className={classes.Content}>MOVIE PLEASE!</h1>
                        </Flash>
                        <p className={classes.P}>Bored? Watch a movie now!</p>
                        <Link to="/signup">
                            <button className={classes.Button}>Dive In</button>
                        </Link>
                    </div>
                </div>
                <Footer />
            </Aux>
        );
    }
}

export default Landing;
