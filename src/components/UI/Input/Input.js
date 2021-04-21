import React from "react";

import classes from "./Input.module.css";
import Aux from "../../../hoc/Aux/Aux";

const Input = (props) => {
    let validProps = [];
    for (let key in props.isValid) {
        validProps = [...validProps, {[key]: props.isValid[key]}];
    }
    let formattedValidProps = validProps.map((validProp) => {
        let key = Object.keys(validProp)[0]
        switch (key) {
            case "minLength":
                return !validProp[key]&&<p className={classes.validateP}>*Username must have atleast 5 characters</p>;
            case "required":
                return !validProp[key]&&<p className={classes.validateP}>*Required</p>;
            case "pattern":
                return !validProp[key]&&<p className={classes.validateP}>*Special characters not allowed</p>;
            default:
                return <p className={classes.validateP}>*Somethinng weird!</p>;
        }
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
