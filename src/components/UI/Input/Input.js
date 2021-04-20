import React from "react";

import classes from "./Input.module.css";
import Aux from "../../../hoc/Aux/Aux";

const Input = (props) => {
    return (
        <Aux>
            <label className={classes.Label} htmlFor={props.id}>{props.label}</label>
            <input
                className={classes.Input}
                id={props.id}
                value={props.value}
                onChange={(event)=>props.onChange(event,props.id)}
                type={props.type}
                name={props.name}
                placeholder={props.placeholder}
                required={props.required}
                autoFocus={props.autofocus}
            />
        </Aux>
    );
};

export default Input;
