import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import NavBar from "../../components/Navigation/NavBar";
import Footer from "../../components/UI/Footer/Footer";
import Aux from "../../hoc/Aux/Aux";
import classes from "./Choose.module.css";
import Modal from "../../components/UI/Modal/Modal";
import axios from "../../axios-auth";

class Choose extends Component {
    availableGenres = [
        "Drama",
        "Comedy",
        "Thriller",
        "Romance",
        "Action",
        "Horror",
        "Crime",
        "Documentary",
        "Adventure",
        "Science",
        "Fiction",
        "Family",
        "Mystery",
        "Fantasy",
        "Animation",
        "Foreign",
        "Music",
        "History",
        "War",
        "Western",
        "TV Movie",
    ];

    availableLanguages = [
        { en: "English" },
        { fr: "French" },
        { it: "Italian" },
        { ja: "Japanese" },
        { de: "German" },
        { es: "Spanish" },
        { ru: "Russian" },
        { hi: "Hindi" },
        { ko: "Korean" },
        { zh: "Chinese" },
        { sv: "Swedish" },
        { pt: "Portugese" },
        { fi: "Finnish" },
        { nl: "Dutch" },
        { da: "Danish" },
        { pl: "Polish" },
        { tr: "Turkish" },
        { cs: "Czech" },
        { el: "Greek" },
        { fa: "Farsi" },
        { no: "Norwegian" },
        { hu: "Hungarian" },
    ];

    state = {
        selectedGenres: [],
        selectedLanguages: [],
    };

    genreBoxHandler = (event) => {
        if (event.target.checked) {
            this.setState((prevState) => {
                return {
                    selectedGenres: [...prevState.selectedGenres, event.target.value],
                };
            });
        } else {
            this.setState((prevState) => {
                let index = prevState.selectedGenres.indexOf(event.target.value);
                let newSelectedGenres = [...prevState.selectedGenres];
                newSelectedGenres.splice(index, 1);
                return {
                    selectedGenres: newSelectedGenres,
                };
            });
        }
    };

    langBoxHandler = (event) => {
        if (event.target.checked) {
            this.setState((prevState) => {
                return {
                    selectedLanguages: [
                        ...prevState.selectedLanguages,
                        event.target.value,
                    ],
                };
            });
        } else {
            this.setState((prevState) => {
                let index = prevState.selectedLanguages.indexOf(event.target.value);
                let newSelectedLanguages = [...prevState.selectedLanguages];
                newSelectedLanguages.splice(index, 1);
                return {
                    selectedLanguages: newSelectedLanguages,
                };
            });
        }
    };

    onSubmitHandler = () => {
        const preferences = {
            selectedGenres:
                this.state.selectedGenres.length > 0
                    ? this.state.selectedGenres
                    : ["Drama"],
            selectedLanguages:
                this.state.selectedLanguages.length > 0
                    ? this.state.selectedLanguages
                    : ["en"],
            username: this.props.username
        };
        console.log(preferences);
        axios
            .post("/api/preferences", preferences)
            .then((response) => {
                this.props.history.replace("/dashboard");
            })
            .catch((error) => {
                this.props.history.replace("/dashboard");
            });
    };

    render() {
        // return this.props.auth ? (
        return true ? (
            <Aux>
                <NavBar />
                <Modal>
                    <p className={classes.P}>Tell us what you like to watch:</p>
                    <p className={classes.P} style={{ marginTop: "8vh" }}>
                        Genres:
          </p>
                    <div className={classes.CheckBoxes}>
                        {this.availableGenres.map((genre) => (
                            <div key={genre} className={classes.CheckBox}>
                                <input
                                    type="checkbox"
                                    name={genre}
                                    value={genre}
                                    id={genre}
                                    onClick={this.genreBoxHandler}
                                    className={classes.CheckBoxInput}
                                />
                                <label htmlFor={genre} className={classes.Label}>
                                    {genre}
                                </label>
                            </div>
                        ))}
                    </div>
                    <p className={classes.P} style={{ marginTop: "8vh" }}>
                        Languages:
          </p>
                    <div className={classes.CheckBoxes}>
                        {this.availableLanguages.map((lang) => (
                            <div key={Object.keys(lang)[0]} className={classes.CheckBox}>
                                <input
                                    type="checkbox"
                                    name={Object.keys(lang)[0]}
                                    value={Object.keys(lang)[0]}
                                    id={Object.keys(lang)[0]}
                                    className={classes.CheckBoxInput}
                                    onClick={this.langBoxHandler}
                                />
                                <label htmlFor={Object.keys(lang)[0]} className={classes.Label}>
                                    {Object.values(lang)[0]}
                                </label>
                            </div>
                        ))}
                    </div>
                    <button className={classes.Button} onClick={this.onSubmitHandler}>
                        Continue
          </button>
                    <Link to="/dashboard" className={classes.Link}>
                        Skip for now
          </Link>
                </Modal>
                <Footer />
            </Aux>
        ) : (
            <Redirect from="/choose" to="/" />
        );
    }
}

const mapStateToProps = (state) => {
    return { auth: state.auth,
    username: state.username};
};

export default connect(mapStateToProps)(Choose);
