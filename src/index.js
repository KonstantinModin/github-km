import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";

// Redux
import { createStore } from "redux";
import reducer from "./redux/reducer";
import { Provider } from "react-redux";

import App from "./App";

const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <ErrorBoundary>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ErrorBoundary>
    </Provider>,
    document.getElementById("root")
);
