import React, { useState } from "react";
import ItemList from "./ItemList";

const AppContent = ({ state: { user, repo, token } }) => {
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
    const [currentTab, setCurrentTab] = useState("0");
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

export default AppContent;
