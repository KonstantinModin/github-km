import React, { useState, useMemo } from "react";
import { Route, Redirect } from "react-router-dom";

//Apollo
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

//components
import Header from "./Header";
import Controls from "./Controls";
import ItemList from "./ItemList";
import ItemPage from "./ItemPage";

//CSS
import "./App.css";

// Constants
const GITHUB_ENDPOINT = "https://api.github.com/graphql";
const INITIAL_TOKEN = "";

const App = () => {
    //state for controlled inputs
    const [state, setState] = useState({
        token: INITIAL_TOKEN,
        user: "facebook",
        repo: "react"
    });

    //State for fetching to prevent fetching on every key pressed
    const [fetchState, setFetchState] = useState(state);

    // Apollo client with auth token
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

    return (
        <ApolloProvider client={client}>
            <div className="App">
                <Header />
                <Route exact path="/">
                    <Controls
                        state={state}
                        setState={setState}
                        setFetchState={setFetchState}
                    />
                    <div className="content">
                        {fetchState.user &&
                        fetchState.repo &&
                        fetchState.token ? (
                            <>
                                <ItemList
                                    name="pullRequests"
                                    user={fetchState.user}
                                    repo={fetchState.repo}
                                    list="pullRequests"
                                    setup=""
                                />
                                <ItemList
                                    name="openIssues"
                                    user={fetchState.user}
                                    repo={fetchState.repo}
                                    list="issues"
                                    setup=", states: OPEN"
                                />
                                <ItemList
                                    name="closedIssues"
                                    user={fetchState.user}
                                    repo={fetchState.repo}
                                    list="issues"
                                    setup=", states: CLOSED"
                                />
                            </>
                        ) : (
                            <h3>Enter token, user name and repository </h3>
                        )}
                    </div>
                </Route>
                <Route
                    exact
                    path="/item"
                    render={({ history, match }) => (
                        <ItemPage history={history} match={match} />
                    )}
                />
                <Redirect to="/" />
            </div>
        </ApolloProvider>
    );
};

export default App;
