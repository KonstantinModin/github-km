import React from "react";
import "./Controls.css";

const Controls = ({ state, setState, setFetchState }) => {
    //Render inputs from array
    const inputs = [
        { name: "token", type: "password", label: "your token:" },
        { name: "user", type: "text", label: "user name:" },
        { name: "repo", type: "text", label: "repo name:" }
    ];

    // input change handler
    const handleInputChange = e => {
        const { name, value } = e.target;
        setState(state => ({ ...state, [name]: value }));
    };

    // submit button handler
    const handleSearchButton = () => {
        setFetchState(state);
    };

    return (
        <div className="controls">
            <div className="inputs">
                {inputs.map(({ name, type, label }) => (
                    <div key={name}>
                        <label>{`Enter ${label}`}</label>
                        <input
                            name={name}
                            type={type}
                            value={state[name]}
                            onChange={handleInputChange}
                        />
                    </div>
                ))}
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
