import React from "react";
import errorImage from "./img/error.jpg";
import "./ErrorIndicator.css";

const ErrorIndicator = ({ error }) => {
    return (
        <div className="errorIndicator">
            <h3>Something went wrong </h3>
            <h5>{error.message}</h5>
            <img src={errorImage} alt="error" />
        </div>
    );
};

export default ErrorIndicator;
