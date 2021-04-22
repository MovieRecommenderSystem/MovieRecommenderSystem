import React from "react";

import classes from "./Input.module.css";
import Aux from "../../../hoc/Aux/Aux";

const Input = (props) => {
    let validProps = [];
    for (let key in props.isValid) {
        validProps = [...validProps, { [key]: props.isValid[key] }];
    }
    let formattedValidProps = validProps.map((validProp) => {
        let key = Object.keys(validProp)[0];
        switch (key) {
            case "minLength":
                if (props.id === "password") {
                    return (
                        !validProp[key] && (
                            <p className={classes.validateP} key={key}>
                                *Password must have atleast 8 characters
                            </p>
                        )
                    );
                } else if (props.id === "phone") {
                    return (
                        !validProp[key] && (
                            <p className={classes.validateP} key={key}>
                                *Mobile number must be 10 characters long
                            </p>
                        )
                    );
                }
                return (
                    !validProp[key] && (
                        <p className={classes.validateP} key={key}>
                            *Username must have atleast 3 characters
                        </p>
                    )
                );
            case "required":
                return (
                    !validProp[key] && (
                        <p className={classes.validateP} key={key}>
                            *Required
                        </p>
                    )
                );
            case "isNumeric":
                return (
                    !validProp[key] && (
                        <p className={classes.validateP} key={key}>
                            *Mobile Number cannot have characters except numbers
                        </p>
                    )
                );
            case "pattern":
                if (props.id === "email")
                    return (
                        !validProp[key] && (
                            <p className={classes.validateP} key={key}>
                                *Invalid email
                            </p>
                        )
                    );
                return (
                    !validProp[key] && (
                        <p className={classes.validateP} key={key}>
                            *Special characters not allowed
                        </p>
                    )
                );
            case "confirmed":
                return (
                    !validProp[key] && (
                        <p className={classes.validateP} key={key}>
                            *Passwords do not match
                        </p>
                    )
                );
            default:
        }
        return null;
    });

    return (
        <Aux>
            <label className={classes.Label} htmlFor={props.id}>
                {props.label}
            </label>
            <input
                className={classes.Input + " " + (props.error && classes.Error)}
                id={props.id}
                onKeyPress={props.onKeyPress}
                value={props.value}
                onChange={(event) => props.onChange(event, props.id)}
                autoComplete={props.autoComplete}
                type={props.type}
                name={props.name}
                placeholder={props.placeholder}
                required={props.required}
                autoFocus={props.autofocus}
            />
            {formattedValidProps}
        </Aux>
    );
};

export default Input;
