import React, { useState, useMemo } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import ItemList from "./ItemList";

import "./App.css";

const GITHUB_ENDPOINT = "https://api.github.com/graphql";
const INITIAL_TOKEN = "289a60e7f64c36aea0522c8308ce6fe2e35bd75e";

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
                    <h2>Fetching Github data with GraphQL</h2>
                </header>
                <div className="controls">
                    <div className="inputs">
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
                    </div>

                    <div className="buttonContainer">
                        <button
                            className="btn btn-success"
                            onClick={() => setShouldFetch(true)}
                        >
                            Search
                        </button>
                    </div>
                </div>
                <div className="content">
                    {shouldFetch ? (
                        <>
                            <ItemList
                                user={user}
                                repo={repo}
                                list="pullRequests"
                                setup=""
                            />
                            <ItemList
                                user={user}
                                repo={repo}
                                list="issues"
                                setup=", states: CLOSED"
                            />
                            <ItemList
                                user={user}
                                repo={repo}
                                list="issues"
                                setup=""
                            />
                        </>
                    ) : (
                        <h3>Enter user/repo</h3>
                    )}
                </div>
            </div>
        </ApolloProvider>
    );
};

export default App;
