import React from "react";

// Redux
import { connect } from "react-redux";
import { setCurrentTab } from "./redux/actions";

// Components
import ItemList from "./ItemList";
import ErrorBoundary from "./ErrorBoundary";

const AppContent = ({
    state: { user, repo, token },
    setCurrentTab,
    currentTab
}) => {
    // Array for itemLists render
    const tabs = [
        {
            name: "pullRequests",
            list: "pullRequests",
            setup: "",
            button: "PullRequests"
        },
        {
            name: "openIssues",
            list: "issues",
            setup: ", states: OPEN",
            button: "Open Issues"
        },
        {
            name: "closedIssues",
            list: "issues",
            setup: ", states: CLOSED",
            button: "Closed Issues"
        }
    ];

    // Tab Navigation - Redux
    const tabClickHandler = ({ target }) => {
        setCurrentTab(target.dataset.id);
    };

    return (
        <div className="content">
            {user && repo && token ? (
                <>
                    <div className="top">
                        {tabs.map(({ name, button }, i) => {
                            return (
                                <button
                                    key={name}
                                    data-id={i}
                                    className={`btn btn-${
                                        i === +currentTab
                                            ? "primary"
                                            : "secondary"
                                    }`}
                                    onClick={tabClickHandler}
                                >
                                    {button}
                                </button>
                            );
                        })}
                    </div>
                    <div className="bottom">
                        <ErrorBoundary>
                            <ItemList
                                name={tabs[currentTab].name}
                                user={user}
                                repo={repo}
                                list={tabs[currentTab].list}
                                setup={tabs[currentTab].setup}
                            />
                        </ErrorBoundary>
                    </div>
                </>
            ) : (
                <h3>Enter token, user name and repository </h3>
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        currentTab: state.currentTab
    };
};

export default connect(mapStateToProps, { setCurrentTab })(AppContent);
