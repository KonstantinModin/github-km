import React from "react";
import "./Controls.css";

const Controls = ({ state, setState, setFetchState }) => {
    // input change handler
    const handleInputChange = e => {
        const { name, value } = e.target;
        setState(state => ({ ...state, [name]: value }));
    };

    // submit button handler
    const handleSearchButton = () => {
        setFetchState(state);
    };

    const { token, user, repo } = state;

    return (
        <div className="controls">
            <div className="inputs">
                <div>
                    <label>Enter your token:</label>
                    <input
                        name="token"
                        type="password"
                        value={token}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Enter user name:</label>
                    <input
                        name="user"
                        type="text"
                        value={user}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Enter repo name:</label>
                    <input
                        name="repo"
                        type="text"
                        value={repo}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
            <div className="buttonContainer">
                <button
                    className="btn btn-success"
                    onClick={handleSearchButton}
                >
                    Search
                </button>
            </div>
        </div>
    );
};

export default Controls;
