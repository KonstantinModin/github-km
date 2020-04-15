import React, { useState, useMemo } from "react";
import { Route, Redirect } from "react-router-dom";

// Apollo
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

// Components
import Header from "./Header";
import Controls from "./Controls";
import ItemPage from "./ItemPage";
import AppContent from "./AppContent";
import ErrorBoundary from "./ErrorBoundary";

//CSS
import "./App.css";

// Constants
const GITHUB_ENDPOINT = "https://api.github.com/graphql";
const INITIAL_TOKEN = "";

const App = () => {
    //state for controlled inputs
    const [state, setState] = useState({
        token: INITIAL_TOKEN,
        user: "",
        repo: ""
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
                            authorization: fetchState.token
                                ? `Bearer ${fetchState.token}`
                                : ""
                        }
                    });
                }
            }),
        [fetchState.token]
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
                    <AppContent state={fetchState} />
                </Route>
                <Route
                    exact
                    path="/item"
                    render={({ history }) => (
                        <ErrorBoundary>
                            <ItemPage history={history} />
                        </ErrorBoundary>
                    )}
                />
                <Redirect to="/" />
            </div>
        </ApolloProvider>
    );
};

export default App;
