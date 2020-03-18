import React from "react";
import "./ItemPage.css";

const ItemPage = ({ history, match }) => {
    const { number, user, repo, list } = history.location.state[0];

    return (
        <div className="itemPage">
            <button className="btn btn-info" onClick={() => history.goBack()}>
                Go back
            </button>
            <h3>to do </h3>
        </div>
    );
};

export default ItemPage;
