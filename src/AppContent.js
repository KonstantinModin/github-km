import React from "react";
import { connect } from "react-redux";
import { setCurrentType } from "./redux/actions";
import ItemList from "./ItemList";

const AppContent = ({
    state: { user, repo, token },
    setCurrentType,
    currentTab
}) => {
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

    // Tab Navigation

    const tabClickHandler = ({ target }) => {
        setCurrentType(target.dataset.id);
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
                        <ItemList
                            name={tabs[currentTab].name}
                            user={user}
                            repo={repo}
                            list={tabs[currentTab].list}
                            setup={tabs[currentTab].setup}
                        />
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

export default connect(mapStateToProps, { setCurrentType })(AppContent);
