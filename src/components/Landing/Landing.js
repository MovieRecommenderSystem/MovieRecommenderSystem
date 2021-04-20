import React, { Component } from "react";
import Flash from "react-reveal/Flash";

import classes from "./Landing.module.css";
import NavBar from "../Navigation/NavBar";
import Footer from "../UI/Footer/Footer";

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
                        <button className={classes.Button}>Dive In</button>
                    </div>
                    <div>
                        <iframe
                            width="560"
                            height="315"
                            src="https://www.youtube.com/embed/rlR4PJn8b8I?autoplay=1&mute=1"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        ></iframe>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Landing;
