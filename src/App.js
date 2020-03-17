import React, { useState, useMemo } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

import "./App.css";

const GITHUB_ENDPOINT = "https://api.github.com/graphql";
const INITIAL_TOKEN = "8f832287e60ce1df8afa487e4ce236f999c21433";

const App = () => {
    const [state, setState] = useState({
        token: INITIAL_TOKEN,
        user: "facebook",
        repo: "react"
    });
    const [shouldFetch, setShouldFetch] = useState(false);

    const client = useMemo(
        () =>
            new ApolloClient({
                uri: GITHUB_ENDPOINT,
                request: operation => {
                    operation.setContext({
                        headers: {
                            authorization: state.token
                                ? `Bearer ${state.token}`
                                : ""
                        }
                    });
                }
            }),
        [state.token]
    );

    const handleInputChange = e => {
        const { name, value } = e.target;
        setState(state => ({ ...state, [name]: value }));
    };

    const { token, user, repo } = state;

    return (
        <ApolloProvider client={client}>
            <div className="App">
                <header className="header">
                    <h1>Fetching Github data with GraphQL</h1>
                </header>
                <div className="controls">
                    <div>
                        <label>Enter your token:</label>
                        <input
                            name="token"
                            type="text"
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
                    <div>
                        <label></label>
                        <button
                            className="btn btn-success"
                            onClick={() => setShouldFetch(true)}
                        >
                            Search
                        </button>
                    </div>
                </div>
                <div className="content">
                    {shouldFetch ? <h3>to do</h3> : <p>Enter user/repo</p>}
                </div>
            </div>
        </ApolloProvider>
    );
};

export default App;
